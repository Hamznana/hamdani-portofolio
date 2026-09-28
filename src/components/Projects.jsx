import { useState, useEffect, useContext } from "react";
import { Search, ExternalLink, Star, GitFork, Calendar, Eye, AlertCircle, Code2 } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";
import { fetchGithubRepos } from "../services/github";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Warna badge berdasarkan kategori
const CATEGORY_COLORS = {
  "Web Development": "violet",
  "AI": "fuchsia",
  "Automation": "amber",
  "Mobile": "cyan",
  "Tools": "emerald",
  "Other": "slate",
};

const LANGUAGE_DOTS = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  Python: "#3776ab",
  HTML: "#e34f26",
  CSS: "#1572b6",
  Vue: "#42b883",
  Go: "#00add8",
  Rust: "#dea584",
};

const CATEGORIES = ["All", "Web Development", "AI", "Automation", "Mobile", "Tools", "Other"];

const Projects = () => {
  const { config } = useContext(PortfolioContext);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showOnlyLive, setShowOnlyLive] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchGithubRepos(config.githubUsername);
        setRepos(data);
      } catch {
        setError("Gagal memuat project dari GitHub.");
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [config.githubUsername]);

  const liveReposCount = repos.filter((r) => r.demoUrl).length;

  const filteredRepos = repos
    .filter((repo) => {
      const matchSearch =
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        (repo.description || "").toLowerCase().includes(search.toLowerCase()) ||
        (repo.language || "").toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "All" || repo.category === selectedCategory;

      const matchLive = !showOnlyLive || Boolean(repo.demoUrl);

      return matchSearch && matchCategory && matchLive;
    })
    .sort((a, b) => {
      if (sortBy === "stars") return b.stargazersCount - a.stargazersCount;
      if (sortBy === "forks") return b.forksCount - a.forksCount;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleDateString("id-ID", {
        year: "numeric", month: "short", day: "numeric"
      });
    } catch {
      return "-";
    }
  };

  const getCategoryColor = (cat) => CATEGORY_COLORS[cat] || "slate";

  return (
    <section id="projects" className="relative py-24 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-extrabold mb-3">Portfolio</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Projects & Repositories
          </h3>
          <p className="text-sm text-gray-500 mt-2 font-mono">
            Synced from GitHub @{config.githubUsername} · {repos.length} public repos · {liveReposCount} live demos
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Controls */}
        <div className="glass p-5 rounded-2xl border border-white/5 mb-10 flex flex-col gap-5">

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-600/20"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-[10px] opacity-70">
                    ({repos.filter((r) => r.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search, Live Demo Filter & Sort */}
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                type="text"
                placeholder="Cari project atau teknologi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition text-sm"
              />
            </div>

            {/* Tombol filter Live Demo */}
            <button
              onClick={() => setShowOnlyLive(!showOnlyLive)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                showOnlyLive
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/10"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
              title="Tampilkan hanya project dengan live demo aktif"
            >
              <span className={`w-2 h-2 rounded-full ${showOnlyLive ? "bg-emerald-400 animate-pulse" : "bg-emerald-500/60"}`} />
              <span>Ada Live Demo ({liveReposCount})</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-violet-500 cursor-pointer"
            >
              <option value="newest" className="bg-gray-900">Terbaru Update</option>
              <option value="stars" className="bg-gray-900">Most Stars</option>
              <option value="forks" className="bg-gray-900">Most Forks</option>
            </select>
          </div>
        </div>

        {/* States */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-24 gap-4">
            <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm font-mono">Mengambil data dari GitHub API...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col justify-center items-center py-24 gap-4 text-red-400">
            <AlertCircle size={40} />
            <p className="text-sm">{error}</p>
          </div>
        ) : filteredRepos.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <Code2 size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-semibold text-white mb-2">Tidak ada project ditemukan</p>
            <p className="text-sm">
              {search || selectedCategory !== "All" || showOnlyLive
                ? "Coba ubah filter atau kata kunci pencarian."
                : "Belum ada repository publik di akun @" + config.githubUsername}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => {
              const catColor = getCategoryColor(repo.category);
              return (
                <div
                  key={repo.id}
                  className="rounded-2xl glass-card overflow-hidden flex flex-col justify-between group hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-600/5"
                >
                  {/* Thumbnail */}
                  <div className="h-44 w-full relative overflow-hidden bg-slate-950">
                    <img
                      src={repo.thumbnail}
                      alt={repo.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-90"
                    />
                    {/* Category Badge */}
                    <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-${catColor}-600/80 text-[10px] font-bold uppercase text-white backdrop-blur-sm`}>
                      {repo.category}
                    </span>

                    {/* Status Badges */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      {repo.demoUrl && !repo.isArchived && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 border border-emerald-500/40 text-[10px] font-semibold text-emerald-300 backdrop-blur-sm flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{repo.isPages ? "GitHub Pages" : "Live"}</span>
                        </span>
                      )}
                      {repo.isArchived && (
                        <span className="px-2 py-0.5 rounded-full bg-gray-700/80 text-[10px] font-bold uppercase text-gray-300 backdrop-blur-sm">
                          Archived
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2 font-mono">
                        <Calendar size={11} />
                        <span>Update: {formatDate(repo.updatedAt)}</span>
                      </div>

                      {/* Name */}
                      <h4 className="text-base font-bold text-white mb-2 line-clamp-1 hover:text-violet-400 transition-colors">
                        {repo.name.replace(/-/g, " ").replace(/_/g, " ")}
                      </h4>

                      {/* Description */}
                      <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3 min-h-[3rem]">
                        {repo.description || (
                          <span className="italic text-gray-600">Deskripsi belum tersedia</span>
                        )}
                      </p>
                    </div>

                    {/* Language & Stats */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-4 border-t border-white/5">
                        {/* Language */}
                        <div className="flex items-center gap-1.5">
                          {repo.language ? (
                            <>
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: LANGUAGE_DOTS[repo.language] || "#8b5cf6" }}
                              />
                              <span className="text-gray-300 font-semibold">{repo.language}</span>
                            </>
                          ) : (
                            <span className="text-gray-600 italic">-</span>
                          )}
                        </div>

                        {/* Stars & Forks */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-amber-400" />
                            <span>{repo.stargazersCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork size={12} className="text-fuchsia-400" />
                            <span>{repo.forksCount}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye size={12} className="text-cyan-400" />
                            <span>{repo.watchersCount}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="px-6 pb-6 flex gap-3">
                    {repo.demoUrl && (
                      <a
                        href={repo.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400 text-xs font-bold hover:bg-violet-600 hover:text-white hover:border-violet-500 hover:shadow-lg hover:shadow-violet-600/20 transition-all duration-300"
                        title={repo.isPages ? `GitHub Pages: ${repo.demoUrl}` : `Live Demo: ${repo.demoUrl}`}
                      >
                        <ExternalLink size={13} />
                        <span>{repo.isPages ? "Demo (Pages)" : "Live Demo"}</span>
                      </a>
                    )}
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs font-bold hover:bg-white/10 hover:text-white transition-all duration-300"
                    >
                      <GithubIcon />
                      <span>Source Code</span>
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default Projects;
