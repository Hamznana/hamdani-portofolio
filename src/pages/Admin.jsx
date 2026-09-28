import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Lock, User, Phone, ArrowLeft, LogOut, CheckCircle,
  Trash2, GitBranch, Star, Users, MessageSquare,
  BarChart3, AlertCircle, RefreshCw
} from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";
import {
  fetchAllTestimonialsAdmin,
  approveTestimonial,
  deleteTestimonial,
  fetchAnalyticsAdmin,
  isSupabaseConfigured
} from "../services/supabase";
import { fetchGithubRepos } from "../services/github";

const Admin = () => {
  const {
    config,
    githubProfile,
    updateProfile,
    updateSocials,
    updateGithubUsername,
  } = useContext(PortfolioContext);

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("hh_admin_auth") === "true";
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // State for data
  const [testimonials, setTestimonials] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);

  // Forms
  const [profileForm, setProfileForm] = useState({
    fullName: config.profile.fullName,
    title: config.profile.title,
    bio: config.profile.bio,
    learningPath: config.profile.learningPath,
    githubUsername: config.githubUsername,
  });

  const [socialsForm, setSocialsForm] = useState({
    whatsapp: config.socials.whatsapp || "",
    whatsappMessage: config.socials.whatsappMessage || "",
    email: config.socials.email || "",
    linkedin: config.socials.linkedin || "",
    github: config.socials.github || "",
  });

  const loadTestimonials = useCallback(async () => {
    setLoadingTestimonials(true);
    const data = await fetchAllTestimonialsAdmin();
    setTestimonials(data || []);
    setLoadingTestimonials(false);
  }, []);

  const loadAnalytics = useCallback(async () => {
    setLoadingAnalytics(true);
    const data = await fetchAnalyticsAdmin();
    setAnalytics(data || []);
    setLoadingAnalytics(false);
  }, []);

  const loadRepos = useCallback(async () => {
    setLoadingRepos(true);
    const data = await fetchGithubRepos(config.githubUsername);
    setRepos(data || []);
    setLoadingRepos(false);
  }, [config.githubUsername]);

  // Load data on auth
  useEffect(() => {
    if (!isAuthenticated) return;
    let active = true;

    (async () => {
      if (isSupabaseConfigured) {
        setLoadingTestimonials(true);
        const testData = await fetchAllTestimonialsAdmin();
        if (active) {
          setTestimonials(testData || []);
          setLoadingTestimonials(false);
        }

        setLoadingAnalytics(true);
        const analData = await fetchAnalyticsAdmin();
        if (active) {
          setAnalytics(analData || []);
          setLoadingAnalytics(false);
        }
      }

      setLoadingRepos(true);
      const repoData = await fetchGithubRepos(config.githubUsername);
      if (active) {
        setRepos(repoData || []);
        setLoadingRepos(false);
      }
    })();

    return () => {
      active = false;
    };
  }, [isAuthenticated, config.githubUsername]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === config.adminPassword) {
      sessionStorage.setItem("hh_admin_auth", "true");
      setIsAuthenticated(true);
      Swal.fire({
        title: "Access Granted",
        text: `Welcome, ${config.profile.firstName}!`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        background: "#0c0a24",
        color: "#fff"
      });
    } else {
      Swal.fire({
        title: "Access Denied",
        text: "Password salah. Coba lagi!",
        icon: "error",
        background: "#0c0a24",
        color: "#fff",
        confirmButtonColor: "#8b5cf6"
      });
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("hh_admin_auth");
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      fullName: profileForm.fullName,
      title: profileForm.title,
      bio: profileForm.bio,
      learningPath: profileForm.learningPath,
    });
    updateGithubUsername(profileForm.githubUsername);
    Swal.fire({ title: "Tersimpan!", icon: "success", timer: 1200, showConfirmButton: false, background: "#0c0a24", color: "#fff" });
  };

  const handleSaveSocials = (e) => {
    e.preventDefault();
    updateSocials({
      whatsapp: socialsForm.whatsapp || null,
      whatsappMessage: socialsForm.whatsappMessage,
      email: socialsForm.email || null,
      linkedin: socialsForm.linkedin || null,
      github: socialsForm.github,
    });
    Swal.fire({ title: "Tersimpan!", icon: "success", timer: 1200, showConfirmButton: false, background: "#0c0a24", color: "#fff" });
  };

  const handleApproveTestimonial = async (id) => {
    await approveTestimonial(id);
    loadTestimonials();
    Swal.fire({ title: "Approved!", icon: "success", timer: 1000, showConfirmButton: false, background: "#0c0a24", color: "#fff" });
  };

  const handleDeleteTestimonial = (id) => {
    Swal.fire({
      title: "Hapus testimonial?",
      text: "Tindakan ini tidak bisa diurungkan.",
      icon: "warning",
      showCancelButton: true,
      background: "#0c0a24",
      color: "#fff",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#4b5563",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTestimonial(id);
        loadTestimonials();
        Swal.fire({ title: "Dihapus!", icon: "success", timer: 1000, showConfirmButton: false, background: "#0c0a24", color: "#fff" });
      }
    });
  };

  // ─── Auth Screen ───────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-violet-600/10 blur-[80px] pointer-events-none" />
        <div className="w-full max-w-md glass p-8 rounded-2xl border border-white/5 shadow-2xl relative z-10">
          <div className="flex justify-between items-center mb-8">
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition">
              <ArrowLeft size={14} />
              <span>Kembali ke Site</span>
            </button>
            <div className="p-2 rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400">
              <Lock size={18} />
            </div>
          </div>

          <img src={`https://avatars.githubusercontent.com/u/187177665?v=4`} alt="Admin" className="w-14 h-14 rounded-2xl border-2 border-violet-500/30 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-1 tracking-tight">Portal Admin</h2>
          <p className="text-xs text-gray-500 mb-6 font-mono">Portfolio Management (@Hamznana)</p>

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="Masukkan password admin"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition"
              />
            </div>
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Dashboard ─────────────────────────────────────────────
  const tabs = [
    { id: "overview", label: "Overview", icon: <BarChart3 size={16} /> },
    { id: "testimonials", label: "Testimonials", icon: <MessageSquare size={16} /> },
    { id: "profile", label: "Profile & Kontak", icon: <User size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-darkBg text-white pt-8 pb-16 px-6 relative">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-violet-600/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-fuchsia-600/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/5 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-3">
            <img src={`https://avatars.githubusercontent.com/u/187177665?v=4`} alt="Admin" className="w-10 h-10 rounded-xl border border-violet-500/30" />
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">Admin Dashboard</h2>
              <p className="text-xs text-gray-500 font-mono">@{config.githubUsername}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition">
              <ArrowLeft size={15} /> Ke Site
            </button>
            <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 text-sm hover:bg-red-600 hover:text-white transition">
              <LogOut size={15} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-violet-600 text-white"
                  : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Tab: Overview ── */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-8">

            {/* GitHub Stats Cards */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <GitBranch size={16} className="text-violet-400" />
                GitHub Stats (@{config.githubUsername})
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Public Repos", value: githubProfile?.publicRepos ?? config.stats.githubRepos, icon: <GitBranch size={20} className="text-violet-400" /> },
                  { label: "Followers", value: githubProfile?.followers ?? 0, icon: <Users size={20} className="text-fuchsia-400" /> },
                  { label: "Stars (Total)", value: config.stats.totalStars, icon: <Star size={20} className="text-amber-400" /> },
                  { label: "Following", value: githubProfile?.following ?? 0, icon: <Users size={20} className="text-cyan-400" /> },
                ].map((stat) => (
                  <div key={stat.label} className="p-5 rounded-2xl glass border border-white/5 flex items-center gap-4">
                    <div className="p-2.5 rounded-xl bg-white/5">{stat.icon}</div>
                    <div>
                      <p className="text-2xl font-extrabold text-white font-mono">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visitor Analytics: hanya jika Supabase aktif */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 size={16} className="text-emerald-400" />
                  Visitor Analytics
                </h3>
                <button onClick={loadAnalytics} className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition">
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>

              {!isSupabaseConfigured ? (
                <div className="p-5 rounded-2xl glass border border-orange-500/20 text-orange-300 text-sm flex items-center gap-3">
                  <AlertCircle size={18} />
                  <span>Supabase belum dikonfigurasi. Analytics tidak tersedia.</span>
                </div>
              ) : loadingAnalytics ? (
                <div className="flex items-center gap-3 py-6">
                  <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-500 text-sm">Memuat analytics...</span>
                </div>
              ) : analytics.length === 0 ? (
                <div className="p-5 rounded-2xl glass border border-white/5 text-gray-500 text-sm text-center py-8">
                  Belum ada data visitor.
                </div>
              ) : (
                <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Tanggal</th>
                        <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Visitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.slice(0, 10).map((row) => (
                        <tr key={row.id} className="border-b border-white/5 hover:bg-white/3 transition">
                          <td className="px-4 py-3 text-gray-300 font-mono">{row.date}</td>
                          <td className="px-4 py-3 text-white font-bold text-right font-mono">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* GitHub Repos Table */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <GitBranch size={16} className="text-violet-400" />
                  Repository Stats
                </h3>
                <button onClick={loadRepos} className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition">
                  <RefreshCw size={12} /> Refresh
                </button>
              </div>

              {loadingRepos ? (
                <div className="flex items-center gap-3 py-6">
                  <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-gray-500 text-sm">Memuat repos...</span>
                </div>
              ) : (
                <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Repository</th>
                        <th className="text-center px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Bahasa</th>
                        <th className="text-center px-4 py-3 text-xs text-gray-500 font-semibold uppercase">⭐</th>
                        <th className="text-center px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Forks</th>
                        <th className="text-right px-4 py-3 text-xs text-gray-500 font-semibold uppercase">Kategori</th>
                      </tr>
                    </thead>
                    <tbody>
                      {repos.map((repo) => (
                        <tr key={repo.id} className="border-b border-white/5 hover:bg-white/3 transition">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2 flex-wrap">
                              <a href={repo.htmlUrl} target="_blank" rel="noreferrer" className="text-violet-400 hover:text-violet-300 font-medium">
                                {repo.name}
                              </a>
                              {repo.demoUrl && (
                                <a
                                  href={repo.demoUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition flex items-center gap-1 font-semibold"
                                  title={`Buka Demo: ${repo.demoUrl}`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>{repo.isPages ? "Pages" : "Demo"}</span>
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-center font-mono">{repo.language || "-"}</td>
                          <td className="px-4 py-3 text-amber-400 text-center font-mono">{repo.stargazersCount}</td>
                          <td className="px-4 py-3 text-fuchsia-400 text-center font-mono">{repo.forksCount}</td>
                          <td className="px-4 py-3 text-right">
                            <span className="px-2 py-0.5 rounded-full bg-violet-600/10 text-violet-400 text-[10px] font-bold uppercase">
                              {repo.category}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Tab: Testimonials ── */}
        {activeTab === "testimonials" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare size={20} className="text-fuchsia-400" />
                Manajemen Testimonial
              </h3>
              <button onClick={loadTestimonials} className="text-xs text-gray-500 hover:text-white flex items-center gap-1.5 transition">
                <RefreshCw size={13} /> Refresh
              </button>
            </div>

            {!isSupabaseConfigured ? (
              <div className="p-6 rounded-2xl glass border border-orange-500/20 text-orange-300 flex items-center gap-3">
                <AlertCircle size={18} />
                <div>
                  <p className="font-semibold">Supabase belum dikonfigurasi</p>
                  <p className="text-xs text-orange-400/70 mt-1">Setup Supabase untuk mengaktifkan manajemen testimonial.</p>
                </div>
              </div>
            ) : loadingTestimonials ? (
              <div className="flex items-center gap-3 py-10">
                <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-500">Memuat testimonial...</span>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <MessageSquare size={40} className="mx-auto mb-3 opacity-30" />
                <p>Belum ada testimonial yang masuk.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className={`p-5 rounded-2xl glass border flex flex-col sm:flex-row gap-4 items-start sm:items-center ${
                      t.is_approved ? "border-emerald-500/20" : "border-amber-500/20"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{t.name}</p>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map((s) => (
                              <Star key={s} size={10} className={s <= t.rating ? "fill-amber-400 text-amber-400" : "text-gray-700"} />
                            ))}
                          </div>
                        </div>
                        <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          t.is_approved ? "bg-emerald-600/10 text-emerald-400" : "bg-amber-600/10 text-amber-400"
                        }`}>
                          {t.is_approved ? "Approved" : "Pending"}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{t.message}</p>
                      <p className="text-gray-600 text-xs mt-2 font-mono">
                        {new Date(t.created_at).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      {!t.is_approved && (
                        <button
                          onClick={() => handleApproveTestimonial(t.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-600 hover:text-white transition"
                        >
                          <CheckCircle size={14} /> Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-600 hover:text-white transition"
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Tab: Profile & Kontak ── */}
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Profile Form */}
            <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <User size={18} className="text-violet-400" />
                <h3 className="text-base font-bold">Edit Profile</h3>
              </div>
              <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
                {[
                  { label: "Nama Lengkap", key: "fullName", type: "text" },
                  { label: "Title/Role", key: "title", type: "text" },
                  { label: "GitHub Username", key: "githubUsername", type: "text" },
                ].map(({ label, key, type }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 font-bold uppercase">{label}</label>
                    <input
                      type={type}
                      value={profileForm[key]}
                      onChange={(e) => setProfileForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500 transition text-sm"
                    />
                  </div>
                ))}
                {[
                  { label: "Bio", key: "bio", rows: 3 },
                  { label: "Learning Path", key: "learningPath", rows: 2 },
                ].map(({ label, key, rows }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 font-bold uppercase">{label}</label>
                    <textarea
                      value={profileForm[key]}
                      onChange={(e) => setProfileForm((p) => ({ ...p, [key]: e.target.value }))}
                      rows={rows}
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500 transition text-sm resize-none"
                    />
                  </div>
                ))}
                <button type="submit" className="py-2.5 px-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition self-end text-sm">
                  Simpan Profile
                </button>
              </form>
            </div>

            {/* Socials Form */}
            <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col gap-5">
              <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                <Phone size={18} className="text-fuchsia-400" />
                <h3 className="text-base font-bold">Edit Kontak & Sosial</h3>
              </div>
              <form onSubmit={handleSaveSocials} className="flex flex-col gap-4">
                {[
                  { label: "WhatsApp (format: +628xxx)", key: "whatsapp", type: "text", placeholder: "+6281234567890" },
                  { label: "Email", key: "email", type: "email", placeholder: "hamdani@email.com" },
                  { label: "LinkedIn URL", key: "linkedin", type: "url", placeholder: "https://linkedin.com/in/..." },
                  { label: "GitHub URL", key: "github", type: "url", placeholder: "https://github.com/Hamznana" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-[10px] text-gray-500 font-bold uppercase">{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={socialsForm[key]}
                      onChange={(e) => setSocialsForm((p) => ({ ...p, [key]: e.target.value }))}
                      className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500 transition text-sm"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] text-gray-500 font-bold uppercase">Pesan WhatsApp Default</label>
                  <textarea
                    value={socialsForm.whatsappMessage}
                    onChange={(e) => setSocialsForm((p) => ({ ...p, whatsappMessage: e.target.value }))}
                    rows={2}
                    className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-violet-500 transition text-sm resize-none"
                  />
                </div>
                <button type="submit" className="py-2.5 px-4 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-500 transition self-end text-sm">
                  Simpan Kontak
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
