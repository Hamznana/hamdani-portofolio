import axios from "axios";

// ============================================================
// GitHub Service — Real-time data dari GitHub API
// Username: Hamznana (Hamdani Hamka)
// Tidak ada data fiktif/hardcoded di sini.
// ============================================================

const GITHUB_USERNAME =
  import.meta.env.VITE_GITHUB_USERNAME || "Hamznana";
const GITHUB_TOKEN = (import.meta.env.VITE_GITHUB_TOKEN || "").trim();

// Axios instance dengan optional GitHub token untuk rate limit lebih tinggi
const githubAxios = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  },
});

// ─── Kategorisasi Repo ────────────────────────────────────────
const categorizeRepo = (repo) => {
  const name = repo.name.toLowerCase();
  const lang = (repo.language || "").toLowerCase();
  const desc = (repo.description || "").toLowerCase();
  const topics = (repo.topics || []).map((t) => t.toLowerCase());
  const combined = `${name} ${desc} ${topics.join(" ")}`;

  if (
    combined.includes("bot") ||
    combined.includes("telegram") ||
    combined.includes("automat") ||
    combined.includes("script")
  )
    return "Automation";

  if (
    combined.includes("ai") ||
    combined.includes("ml") ||
    combined.includes("machine") ||
    combined.includes("neural") ||
    combined.includes("openai") ||
    combined.includes("gpt")
  )
    return "AI";

  if (
    lang === "swift" ||
    lang === "kotlin" ||
    lang === "dart" ||
    combined.includes("mobile") ||
    combined.includes("react native") ||
    combined.includes("flutter") ||
    combined.includes("android") ||
    combined.includes("ios")
  )
    return "Mobile";

  if (
    lang === "javascript" ||
    lang === "typescript" ||
    lang === "html" ||
    lang === "css" ||
    combined.includes("web") ||
    combined.includes("react") ||
    combined.includes("next") ||
    combined.includes("vue") ||
    combined.includes("app")
  )
    return "Web Development";

  if (
    lang === "python" ||
    lang === "go" ||
    lang === "rust" ||
    lang === "shell" ||
    combined.includes("tool") ||
    combined.includes("cli") ||
    combined.includes("util")
  )
    return "Tools";

  return "Other";
};

// ─── Fetch Profile GitHub ─────────────────────────────────────
export const fetchGithubProfile = async (username = GITHUB_USERNAME) => {
  try {
    const { data } = await githubAxios.get(`/users/${username}`);
    return {
      login: data.login,
      name: data.name || "Hamdani Hamka",
      avatarUrl: data.avatar_url,
      bio: data.bio || null,
      location: data.location || "Duri, Riau, Indonesia",
      company: data.company || null,
      blog: data.blog || null,
      twitterUsername: data.twitter_username || null,
      publicRepos: data.public_repos || 0,
      followers: data.followers || 0,
      following: data.following || 0,
      createdAt: data.created_at,
      htmlUrl: data.html_url,
    };
  } catch (error) {
    console.error("GitHub profile fetch failed:", error.message);
    return null;
  }
};

// ─── Fetch All Repos ──────────────────────────────────────────
export const fetchGithubRepos = async (username = GITHUB_USERNAME, customThumbnails = {}) => {
  try {
    const { data } = await githubAxios.get(
      `/users/${username}/repos?per_page=100&sort=updated&type=owner`
    );

    if (!data || data.length === 0) return [];

    // Filter hanya repo milik sendiri (bukan fork)
    const ownRepos = data.filter((repo) => !repo.fork);

    return ownRepos.map((repo) => {
      const ownerLogin = (repo.owner?.login || username).toLowerCase();
      let demoUrl = null;
      let isPages = false;

      // 1. Cek homepage custom (misal Vercel, Netlify, atau domain sendiri)
      if (repo.homepage && typeof repo.homepage === "string" && repo.homepage.trim() !== "") {
        let cleanUrl = repo.homepage.trim();
        if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
          cleanUrl = `https://${cleanUrl}`;
        }
        demoUrl = cleanUrl;
        isPages = cleanUrl.includes("github.io");
      }
      // 2. Deteksi otomatis GitHub Pages jika has_pages bernilai true
      else if (repo.has_pages) {
        isPages = true;
        if (repo.name.toLowerCase() === `${ownerLogin}.github.io`) {
          demoUrl = `https://${ownerLogin}.github.io/`;
        } else {
          demoUrl = `https://${ownerLogin}.github.io/${repo.name}/`;
        }
      }

      return {
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || null,
        htmlUrl: repo.html_url,
        homepage: demoUrl,
        demoUrl: demoUrl,
        hasPages: Boolean(repo.has_pages),
        isPages: isPages,
        language: repo.language || null,
        stargazersCount: repo.stargazers_count,
        forksCount: repo.forks_count,
        watchersCount: repo.watchers_count,
        openIssuesCount: repo.open_issues_count,
        size: repo.size,
        topics: repo.topics || [],
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        defaultBranch: repo.default_branch,
        isArchived: repo.archived,
        category: categorizeRepo(repo),
        thumbnail:
          (customThumbnails && (customThumbnails[repo.name] || customThumbnails[repo.name.toLowerCase()])) ||
          (demoUrl
            ? `https://api.microlink.io?url=${encodeURIComponent(demoUrl)}&screenshot=true&meta=false&embed=screenshot.url`
            : `https://opengraph.githubassets.com/1/${ownerLogin}/${repo.name}`),
      };
    });
  } catch (error) {
    console.error("GitHub repos fetch failed:", error.message);
    return []; // Return kosong, bukan data fiktif
  }
};

// ─── Fetch Detail Satu Repo ───────────────────────────────────
export const fetchRepoDetails = async (repoName, username = GITHUB_USERNAME) => {
  try {
    const [repoRes, contributorsRes, commitsRes] = await Promise.allSettled([
      githubAxios.get(`/repos/${username}/${repoName}`),
      githubAxios.get(`/repos/${username}/${repoName}/contributors?per_page=10`),
      githubAxios.get(`/repos/${username}/${repoName}/commits?per_page=1`),
    ]);

    const repo = repoRes.status === "fulfilled" ? repoRes.value.data : null;
    const contributors =
      contributorsRes.status === "fulfilled"
        ? contributorsRes.value.data
        : [];
    const lastCommit =
      commitsRes.status === "fulfilled" && commitsRes.value.data.length > 0
        ? commitsRes.value.data[0]?.commit?.author?.date || null
        : null;

    if (!repo) return null;

    return {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      openIssues: repo.open_issues_count,
      contributors: contributors.length,
      lastCommit,
      size: repo.size,
      license: repo.license?.name || null,
    };
  } catch (error) {
    console.error(`Repo detail fetch failed for ${repoName}:`, error.message);
    return null;
  }
};

// ─── Fetch Stats Agregat (untuk Hero / About) ─────────────────
export const fetchGithubStats = async (username = GITHUB_USERNAME) => {
  try {
    const { data } = await githubAxios.get(
      `/users/${username}/repos?per_page=100`
    );
    if (!data || data.length === 0)
      return { totalStars: 0, totalForks: 0, publicRepos: 0, popularProject: null };

    const ownRepos = data.filter((r) => !r.fork);
    const totalStars = ownRepos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const totalForks = ownRepos.reduce((acc, r) => acc + r.forks_count, 0);

    let popularRepo = null;
    ownRepos.forEach((r) => {
      if (!popularRepo || r.stargazers_count > popularRepo.stargazers_count) {
        popularRepo = r;
      }
    });

    return {
      totalStars,
      totalForks,
      publicRepos: ownRepos.length,
      popularProject: popularRepo ? popularRepo.name : null,
    };
  } catch (error) {
    console.error("GitHub stats fetch failed:", error.message);
    return { totalStars: 0, totalForks: 0, publicRepos: 0, popularProject: null };
  }
};

// ─── Thumbnail berdasarkan Kategori ──────────────────────────
export const getCategoryThumbnail = (category, language) => {
  const thumbnails = {
    "Web Development": "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&q=80&w=600&h=400",
    "AI": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=600&h=400",
    "Automation": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=600&h=400",
    "Mobile": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600&h=400",
    "Tools": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400",
    "Other": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=600&h=400",
  };

  // Spesifik berdasarkan bahasa
  if (language === "Python")
    return "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=600&h=400";
  if (language === "JavaScript" || language === "TypeScript")
    return "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&q=80&w=600&h=400";

  return thumbnails[category] || thumbnails["Other"];
};
