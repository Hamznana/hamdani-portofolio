import { useContext } from "react";
import { Mail, ExternalLink, AlertCircle, MapPin } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Komponen untuk kontak item — menampilkan placeholder jika belum ada data
const ContactItem = ({ icon, label, value, href, color, available = true, placeholder = "Data belum tersedia" }) => {
  const colorMap = {
    violet: { bg: "bg-violet-600/10", border: "border-violet-500/20", text: "text-violet-400", hover: "hover:text-violet-400" },
    emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400", hover: "hover:text-emerald-400" },
    cyan: { bg: "bg-cyan-600/10", border: "border-cyan-500/20", text: "text-cyan-400", hover: "hover:text-cyan-400" },
    gray: { bg: "bg-gray-600/10", border: "border-gray-500/20", text: "text-gray-400", hover: "hover:text-white" },
    blue: { bg: "bg-blue-600/10", border: "border-blue-500/20", text: "text-blue-400", hover: "hover:text-blue-400" },
  };
  const c = colorMap[color] || colorMap.gray;

  if (!available || !value) {
    return (
      <div className="flex items-center gap-4 p-5 rounded-2xl glass border border-white/5 opacity-50">
        <div className={`p-3 rounded-xl ${c.bg} ${c.border} border ${c.text}`}>
          {icon}
        </div>
        <div>
          <span className="text-[10px] text-gray-600 font-mono block uppercase tracking-wider">{label}</span>
          <span className="text-gray-600 font-medium text-sm italic flex items-center gap-1.5">
            <AlertCircle size={12} />
            {placeholder}
          </span>
        </div>
      </div>
    );
  }

  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href, target: "_blank", rel: "noreferrer", className: `flex items-center gap-4 p-5 rounded-2xl glass-card group hover:border-${color}-500/20 transition-all duration-300` } : { className: "flex items-center gap-4 p-5 rounded-2xl glass-card" };

  return (
    <Wrapper {...wrapperProps}>
      <div className={`p-3 rounded-xl ${c.bg} border ${c.border} ${c.text} group-hover:scale-105 transition-transform duration-300 flex-shrink-0`}>
        {icon}
      </div>
      <div className="min-w-0">
        <span className="text-[10px] text-gray-500 font-mono block uppercase tracking-wider">{label}</span>
        <span className={`text-white font-bold text-sm group-hover:${c.text.replace("text-", "text-")} transition-colors truncate block ${c.hover}`}>
          {value}
        </span>
      </div>
      {href && <ExternalLink size={14} className="text-gray-600 ml-auto flex-shrink-0" />}
    </Wrapper>
  );
};

const Contact = () => {
  const { config, githubProfile } = useContext(PortfolioContext);
  const { socials } = config;

  const location = githubProfile?.location || "Duri, Riau, Indonesia";

  return (
    <section id="contact" className="relative py-24 border-t border-white/5 bg-black/10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-extrabold mb-3">Contact</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Hubungi Hamdani Hamka
          </h3>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            Tertarik untuk berkolaborasi atau berdiskusi tentang project? Jangan ragu untuk menghubungi saya melalui salah satu platform berikut.
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left: Contact Links */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-bold text-lg">Cara Menghubungi Saya</h4>

            {/* Location info */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <MapPin size={14} className="text-violet-400" />
              <span>{location}</span>
            </div>

            <div className="flex flex-col gap-3">
              {/* GitHub — selalu tersedia */}
              <ContactItem
                icon={<GithubIcon />}
                label="GitHub"
                value={`@${config.githubUsername}`}
                href={socials.github}
                color="gray"
                available={true}
              />

              {/* WhatsApp — placeholder jika belum ada */}
              <ContactItem
                icon={<WhatsAppIcon />}
                label="WhatsApp"
                value={socials.whatsapp ? `Chat via WhatsApp` : null}
                href={socials.whatsapp ? `https://wa.me/${socials.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(socials.whatsappMessage)}` : null}
                color="emerald"
              />

              {/* Email — placeholder jika belum ada */}
              <ContactItem
                icon={<Mail size={22} />}
                label="Email"
                value={socials.email}
                href={socials.email ? `mailto:${socials.email}` : null}
                color="violet"
              />

              {/* LinkedIn — placeholder jika belum ada */}
              <ContactItem
                icon={<LinkedinIcon />}
                label="LinkedIn"
                value={socials.linkedin ? "Lihat Profil LinkedIn" : null}
                href={socials.linkedin}
                color="blue"
              />
            </div>

            <div className="p-4 rounded-xl glass border border-white/5 mt-2">
              <p className="text-xs text-gray-400 leading-relaxed">
                💬 <strong className="text-white">Mari Terhubung:</strong> Terbuka untuk peluang kerja sama, proyek freelance, maupun diskusi seputar web development dan automasi bot.
              </p>
            </div>
          </div>

          {/* Right: Info card */}
          <div className="p-8 rounded-2xl glass border border-white/5">
            <h4 className="text-white font-bold text-lg mb-6">Tentang Hamdani Hamka</h4>

            <div className="flex items-start gap-4 mb-6">
              <img
                src={`https://avatars.githubusercontent.com/u/187177665?v=4`}
                alt="Hamdani Hamka"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-violet-500/30"
              />
              <div>
                <h5 className="text-white font-bold">Hamdani Hamka</h5>
                <p className="text-violet-400 text-sm">Web & Bot Developer</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-400 text-xs font-semibold">Available for projects</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-gray-500">Lokasi</span>
                <span className="text-white font-medium">{location}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-gray-500">GitHub</span>
                <a href={socials.github} target="_blank" rel="noreferrer" className="text-violet-400 font-medium hover:underline">
                  @{config.githubUsername}
                </a>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-gray-500">WhatsApp</span>
                <span className={socials.whatsapp ? "text-white" : "text-gray-600 italic"}>
                  {socials.whatsapp || "Belum tersedia"}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-gray-500">Email</span>
                <span className={socials.email ? "text-white" : "text-gray-600 italic"}>
                  {socials.email || "Belum tersedia"}
                </span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-gray-500">LinkedIn</span>
                <span className={socials.linkedin ? "text-white" : "text-gray-600 italic"}>
                  {socials.linkedin ? "Tersedia" : "Belum tersedia"}
                </span>
              </div>
            </div>

            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition text-sm"
            >
              <GithubIcon />
              Lihat GitHub Profile
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
