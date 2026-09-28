import { useState, useEffect, useRef, useContext } from "react";
import { FolderCode, GitBranch, Star, Users, GitFork, ExternalLink } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";

function AnimatedNumber({ end, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || end === 0) return;
    const duration = 2200;
    const startTime = performance.now();
    const step = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(end * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [started, end]);

  return (
    <span ref={ref}>
      {val.toLocaleString()}{suffix}
    </span>
  );
}

const About = () => {
  const { config, githubProfile, githubLoading, visitorData, isSupabaseConfigured } = useContext(PortfolioContext);
  const { profile } = config;

  // Stats dari GitHub API (data asli)
  const repos = githubProfile?.publicRepos ?? config.stats.githubRepos;
  const stars = config.stats.totalStars;
  const forks = config.stats.totalForks;
  const followers = githubProfile?.followers ?? config.stats.followers;

  const stats = [
    {
      id: 1,
      name: "Public Repositories",
      value: repos,
      icon: <FolderCode className="text-violet-400" size={24} />,
      suffix: "",
      loading: githubLoading,
    },
    {
      id: 2,
      name: "GitHub Stars",
      value: stars,
      icon: <Star className="text-amber-400" size={24} />,
      suffix: "",
      loading: githubLoading,
    },
    {
      id: 3,
      name: "GitHub Followers",
      value: followers,
      icon: <Users className="text-fuchsia-400" size={24} />,
      suffix: "",
      loading: githubLoading,
    },
    {
      id: 4,
      name: "Total Forks",
      value: forks,
      icon: <GitFork className="text-cyan-400" size={24} />,
      suffix: "",
      loading: githubLoading,
    },
  ];

  return (
    <section id="about" className="relative py-24 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-extrabold mb-3">About Me</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Mengenal Hamdani Hamka
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

          {/* Biography */}
          <div className="flex flex-col gap-6">
            <h4 className="text-2xl font-bold text-white tracking-tight">
              Developer dari Duri, Riau, Indonesia
            </h4>
            <p className="text-gray-400 leading-relaxed text-lg">
              {profile.bio}
            </p>

            {/* GitHub Profile Link */}
            <a
              href={`https://github.com/${config.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/10 text-violet-400 hover:text-white hover:border-violet-500 transition-all duration-300 self-start text-sm font-semibold"
            >
              <GitBranch size={16} />
              <span>@{config.githubUsername} di GitHub</span>
              <ExternalLink size={14} />
            </a>

            <div className="p-6 rounded-2xl glass border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-violet-500 to-fuchsia-500" />
              <h5 className="font-semibold text-white mb-2">Background & Skills</h5>
              <p className="text-gray-400 text-sm leading-relaxed">{profile.learningPath}</p>
            </div>
          </div>

          {/* Focus Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                num: "1",
                color: "violet",
                title: "Web Development",
                desc: "Membangun web applications modern menggunakan JavaScript, React, dan teknologi terkini untuk menciptakan pengalaman digital yang menarik.",
              },
              {
                num: "2",
                color: "fuchsia",
                title: "Bot Development",
                desc: "Mengembangkan automation bots menggunakan Python dan JavaScript/Node.js, termasuk Telegram bots untuk berbagai kebutuhan.",
              },
              {
                num: "3",
                color: "cyan",
                title: "Open Source",
                desc: "Aktif di GitHub dengan berbagi project publik. Selalu terbuka untuk kolaborasi dan kontribusi dari komunitas developer.",
              },
              {
                num: "4",
                color: "emerald",
                title: "Deployment & DevOps",
                desc: "Pengalaman dalam deployment ke Vercel, manajemen Git, dan pengembangan aplikasi siap produksi.",
              },
            ].map(({ num, color, title, desc }) => (
              <div key={num} className={`p-6 rounded-2xl glass-card flex flex-col gap-3`}>
                <div className={`w-10 h-10 rounded-xl bg-${color}-600/10 flex items-center justify-center border border-${color}-500/20`}>
                  <span className={`text-${color}-400 text-lg font-bold`}>{num}</span>
                </div>
                <h5 className="font-semibold text-white">{title}</h5>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid — Data asli dari GitHub */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-6 rounded-2xl glass-card flex flex-col items-center text-center justify-center relative overflow-hidden"
            >
              <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/5">
                {stat.icon}
              </div>
              <h4 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 font-mono">
                {stat.loading ? (
                  <span className="w-12 h-8 bg-white/10 rounded animate-pulse inline-block" />
                ) : (
                  <AnimatedNumber end={stat.value} suffix={stat.suffix} />
                )}
              </h4>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                {stat.name}
              </p>
              <p className="text-[10px] text-gray-600 mt-1 font-mono">from GitHub API</p>
            </div>
          ))}
        </div>

        {/* Visitor Stats — Hanya tampil jika Supabase dikonfigurasi */}
        {isSupabaseConfigured && visitorData && (
          <div className="mt-6 p-4 rounded-xl glass border border-white/5 flex flex-wrap gap-4 justify-center text-xs font-mono text-gray-500">
            <span className="text-violet-400 font-bold">Visitor Stats:</span>
            <span>Total: <strong className="text-white">{visitorData.total}</strong></span>
            <span>Hari ini: <strong className="text-white">{visitorData.today}</strong></span>
            <span>Minggu ini: <strong className="text-white">{visitorData.week}</strong></span>
            <span>Bulan ini: <strong className="text-white">{visitorData.month}</strong></span>
          </div>
        )}

      </div>
    </section>
  );
};

export default About;
