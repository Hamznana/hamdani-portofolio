import { useState, useEffect, useContext } from "react";
import { Download, ArrowRight, Mail, MapPin, Users, GitBranch, Star, GitFork } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Hero = () => {
  const { config, githubProfile, githubLoading } = useContext(PortfolioContext);
  const { profile, socials } = config;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation
  useEffect(() => {
    let timer;
    const roles = profile.roles;
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 100;
    const nextRoleDelay = 2000;

    if (!isDeleting && displayText === currentRole) {
      timer = setTimeout(() => setIsDeleting(true), nextRoleDelay);
    } else if (isDeleting && displayText === "") {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, 100);
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentRole.substring(0, prev.length - 1)
            : currentRole.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, profile.roles]);

  const handleContactScroll = (e) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Data real dari GitHub API atau fallback
  const avatarUrl = githubProfile?.avatarUrl || profile.avatarUrl;
  const displayBio = githubProfile?.bio || profile.bio;
  const location = githubProfile?.location || "Duri, Riau, Indonesia";
  const publicRepos = githubProfile?.publicRepos ?? config.stats.githubRepos;
  const followers = githubProfile?.followers ?? config.stats.followers;
  const following = githubProfile?.following ?? config.stats.following;
  const totalStars = config.stats.totalStars;
  const totalForks = config.stats.totalForks;

  const quickStats = [
    { label: "Repos", value: publicRepos, icon: <GitBranch size={14} /> },
    { label: "Followers", value: followers, icon: <Users size={14} /> },
    { label: "Following", value: following, icon: <Users size={14} /> },
    { label: "Stars", value: totalStars, icon: <Star size={14} /> },
    { label: "Forks", value: totalForks, icon: <GitFork size={14} /> },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Neon Blobs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-violet-600/10 blur-[80px] animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-fuchsia-600/10 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">

        {/* Text Side */}
        <div className="lg:col-span-7 flex flex-col text-center lg:text-left order-2 lg:order-1">

          {/* Available Badge */}
          <div className="inline-flex items-center self-center lg:self-start gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold uppercase tracking-widest text-violet-400 mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Available for Hire & Projects</span>
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-none">
            Hi, I am{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              {profile.fullName}
            </span>
          </h1>

          {/* Typing Role */}
          <div className="text-xl sm:text-2xl font-mono font-medium text-gray-300 mb-3 h-8">
            <span>I'm a </span>
            <span className="text-violet-400 font-bold typing-cursor">{displayText}</span>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sm text-gray-500 mb-5">
            <MapPin size={14} className="text-violet-400" />
            <span>{location}</span>
          </div>

          {/* Bio */}
          <p className="text-base sm:text-lg text-gray-400 max-w-xl mb-6 leading-relaxed mx-auto lg:mx-0">
            {displayBio}
          </p>

          {/* GitHub Quick Stats */}
          {!githubLoading && (
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-white/10 text-xs font-mono text-gray-300"
                >
                  <span className="text-violet-400">{stat.icon}</span>
                  <span className="font-bold text-white">{stat.value}</span>
                  <span className="text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 items-center mb-8">
            {profile.cvAvailable ? (
              <a
                href={profile.cvUrl}
                download={profile.cvFilename}
                className="group flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-violet-600/40 to-fuchsia-600/40 text-white/50 font-medium rounded-xl cursor-not-allowed border border-white/10"
                title="CV belum tersedia"
              >
                <Download size={18} />
                <span>CV Segera Tersedia</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={handleContactScroll}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 glass hover:bg-white/5 border border-white/10 text-white font-medium rounded-xl transition-all duration-300"
            >
              <span>Hubungi Saya</span>
              <ArrowRight size={18} className="text-violet-400" />
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center lg:justify-start items-center gap-4 text-gray-500">
            <span className="text-xs uppercase tracking-widest text-gray-600 font-bold">Find Me On</span>
            <div className="w-8 h-px bg-white/10" />
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
              title="GitHub"
            >
              <GithubIcon />
            </a>
            {socials.whatsapp && (
              <a
                href={`https://wa.me/${socials.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors text-gray-500"
                title="WhatsApp"
              >
                <WhatsAppIcon />
              </a>
            )}
            {socials.email && (
              <a
                href={`mailto:${socials.email}`}
                className="hover:text-white transition-colors"
                title="Email"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>

        {/* Profile Photo */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <div className="relative">
            {/* Decorative ring */}
            <div className="absolute -inset-4 rounded-[40%_60%_60%_40%_/_40%_40%_60%_60%] bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 blur-lg animate-pulse" />

            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] overflow-hidden border-2 border-violet-500/30 bg-slate-900/50">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 mix-blend-overlay z-10" />

              {githubLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-900">
                  <div className="w-10 h-10 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <img
                  src={avatarUrl}
                  alt={profile.fullName}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=Hamdani+Hamka&background=7c3aed&color=fff&size=400`;
                  }}
                />
              )}

              <div className="absolute inset-0 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] border border-white/10 pointer-events-none z-20" />
            </div>

            {/* GitHub badge */}
            <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-mono text-violet-400 flex items-center gap-1.5">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>@{config.githubUsername}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
