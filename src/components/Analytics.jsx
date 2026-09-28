import { useState, useEffect, useContext } from "react";
import { Star, GitFork, Eye, AlertCircle, Users, GitCommit, ChevronDown, ChevronUp } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";
import { fetchGithubRepos, fetchRepoDetails } from "../services/github";

const Analytics = () => {
  const { config } = useContext(PortfolioContext);
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchGithubRepos(config.githubUsername);
      setRepos(data.slice(0, 6)); // Tampilkan top 6 untuk analytics
      setLoading(false);
    };
    load();
  }, [config.githubUsername]);

  const loadDetail = async (repoName) => {
    if (details[repoName] !== undefined) return;
    setDetails((prev) => ({ ...prev, [repoName]: "loading" }));
    const detail = await fetchRepoDetails(repoName, config.githubUsername);
    setDetails((prev) => ({ ...prev, [repoName]: detail }));
  };

  const handleToggle = (repoName) => {
    if (expanded === repoName) {
      setExpanded(null);
    } else {
      setExpanded(repoName);
      loadDetail(repoName);
    }
  };

  const formatDate = (iso) => {
    if (!iso) return "—";
    try {
      return new Date(iso).toLocaleDateString("id-ID", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit"
      });
    } catch { return "—"; }
  };

  return (
    <section id="analytics" className="relative py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-extrabold mb-3">
            Project Analytics
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Repository Statistics
          </h3>
          <p className="text-sm text-gray-500 mt-2 font-mono">
            Real-time data dari GitHub API — tidak ada angka yang dikarang
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-4 rounded-full" />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 gap-4">
            <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm font-mono">Mengambil statistik dari GitHub...</p>
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <AlertCircle size={40} className="mx-auto mb-4 opacity-30" />
            <p>Tidak ada repository yang ditemukan.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {repos.map((repo) => {
              const isExpanded = expanded === repo.name;
              const detail = details[repo.name];
              const isLoadingDetail = detail === "loading";

              return (
                <div
                  key={repo.id}
                  className="glass-card rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  {/* Header Row */}
                  <div
                    className="flex items-center justify-between p-5 cursor-pointer"
                    onClick={() => handleToggle(repo.name)}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Language dot */}
                      <div className="flex-shrink-0 w-3 h-3 rounded-full bg-violet-500" />

                      <div className="min-w-0">
                        <h4 className="text-white font-bold text-sm truncate">
                          {repo.name}
                        </h4>
                        <p className="text-gray-500 text-xs truncate">
                          {repo.language || "—"} · Updated {formatDate(repo.updatedAt)}
                        </p>
                      </div>
                    </div>

                    {/* Quick stats inline */}
                    <div className="flex items-center gap-4 text-xs font-mono text-gray-400 flex-shrink-0 ml-4">
                      <div className="hidden sm:flex items-center gap-1">
                        <Star size={12} className="text-amber-400" />
                        <span>{repo.stargazersCount}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1">
                        <GitFork size={12} className="text-fuchsia-400" />
                        <span>{repo.forksCount}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1">
                        <Eye size={12} className="text-cyan-400" />
                        <span>{repo.watchersCount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <AlertCircle size={12} className="text-orange-400" />
                        <span>{repo.openIssuesCount}</span>
                      </div>
                      <button className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition ml-2">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  {isExpanded && (
                    <div className="px-5 pb-5 border-t border-white/5 pt-4">
                      {isLoadingDetail ? (
                        <div className="flex items-center gap-3 py-4">
                          <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                          <span className="text-gray-500 text-sm font-mono">Mengambil detail repo...</span>
                        </div>
                      ) : detail ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                          {[
                            { label: "Stars", value: detail.stars, icon: <Star size={14} className="text-amber-400" /> },
                            { label: "Forks", value: detail.forks, icon: <GitFork size={14} className="text-fuchsia-400" /> },
                            { label: "Watchers", value: detail.watchers, icon: <Eye size={14} className="text-cyan-400" /> },
                            { label: "Open Issues", value: detail.openIssues, icon: <AlertCircle size={14} className="text-orange-400" /> },
                            { label: "Contributors", value: detail.contributors, icon: <Users size={14} className="text-violet-400" /> },
                            {
                              label: "Last Commit",
                              value: detail.lastCommit ? formatDate(detail.lastCommit) : "—",
                              icon: <GitCommit size={14} className="text-emerald-400" />,
                              isText: true
                            },
                          ].map((item) => (
                            <div key={item.label} className="p-3 rounded-xl bg-white/3 border border-white/5 flex flex-col gap-2">
                              <div className="flex items-center gap-1.5 text-[10px] text-gray-500 uppercase tracking-wider">
                                {item.icon}
                                <span>{item.label}</span>
                              </div>
                              <p className={`font-bold ${item.isText ? "text-xs text-gray-300" : "text-lg text-white font-mono"}`}>
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">Data belum tersedia untuk repo ini.</p>
                      )}

                      {/* License info */}
                      {detail && detail !== "loading" && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 font-mono">
                          <span>License:</span>
                          <span className="text-gray-400">{detail.license || "Tidak ada"}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {repos.length > 0 && (
          <p className="text-center text-xs text-gray-600 mt-6 font-mono">
            Menampilkan {repos.length} dari {repos.length} repository · Klik baris untuk detail statistik
          </p>
        )}

      </div>
    </section>
  );
};

export default Analytics;
