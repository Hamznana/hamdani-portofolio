import { useState, useContext } from "react";
import { Download, FileText, CheckCircle2, ExternalLink, Sparkles, FileCheck, Briefcase, Award } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const CVSection = () => {
  const { config } = useContext(PortfolioContext);
  const { profile } = config;

  const [selectedCV, setSelectedCV] = useState("modern");
  const [downloading, setDownloading] = useState(false);

  const cvOptions = {
    modern: {
      id: "modern",
      name: "Modern Tech CV",
      subtitle: "Format Visual Developer",
      desc: "Cocok untuk startup, digital agency, dan software house. Menyoroti repositori GitHub, demo live, keahlian teknis interaktif, serta pengalaman IT Support PT. BDSI.",
      pdfUrl: "/assets/cv-hamdani-modern.pdf",
      htmlUrl: "/assets/cv-modern.html",
      filename: "CV_Hamdani_Hamka_Modern.pdf",
      badge: "Rekomendasi Startup",
      badgeColor: "text-violet-400 border-violet-500/30 bg-violet-500/10",
      icon: <Sparkles size={16} className="text-violet-400" />,
    },
    ats: {
      id: "ats",
      name: "ATS-Friendly CV",
      subtitle: "Standar Screening HR",
      desc: "Format teks standar industri tanpa elemen grafis rumit, memuat pengalaman PT. BDSI dan sertifikasi Junior Web Developer, 100% optimal dipindai oleh mesin ATS korporat.",
      pdfUrl: "/assets/cv-hamdani-ats.pdf",
      htmlUrl: "/assets/cv-ats.html",
      filename: "CV_Hamdani_Hamka_ATS.pdf",
      badge: "Standar HR & Korporat",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      icon: <FileCheck size={16} className="text-cyan-400" />,
    },
  };

  const active = cvOptions[selectedCV];

  // Handler download langsung via Blob agar dijamin terunduh di semua browser
  const handleDownload = async (e, url, filename) => {
    e.preventDefault();
    setDownloading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Gagal mengambil file PDF");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const tempLink = document.createElement("a");
      tempLink.style.display = "none";
      tempLink.href = blobUrl;
      tempLink.setAttribute("download", filename);
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1500);
    } catch (error) {
      console.warn("Direct blob download failed, falling back to direct navigation", error);
      const tempLink = document.createElement("a");
      tempLink.href = url;
      tempLink.download = filename;
      tempLink.target = "_blank";
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section id="cv" className="relative py-24 border-t border-white/5 bg-black/10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-extrabold mb-3">Resume &amp; CV</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Curriculum Vitae
          </h3>
          <p className="text-sm text-gray-400 mt-2">
            Tersedia dalam 2 format resmi: Modern Tech &amp; ATS-Friendly
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: CV Preview Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              className={`w-full max-w-md p-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                selectedCV === "modern"
                  ? "bg-white text-slate-800 border-slate-200/60"
                  : "bg-slate-50 text-slate-900 border-slate-300"
              }`}
              style={{ minHeight: "510px" }}
            >
              {/* Top color bar */}
              <div
                className={`absolute top-0 left-0 w-full h-2 ${
                  selectedCV === "modern"
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
                    : "bg-slate-900"
                }`}
              />

              {/* Card Body */}
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 leading-none">Hamdani Hamka</h4>
                    <span className="text-xs text-violet-600 font-semibold tracking-wider uppercase block mt-1">
                      {profile.title}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      Duri, Riau, Indonesia · hamdaniamka@gmail.com
                    </span>
                  </div>
                  <div className="text-right">
                    <img
                      src={`https://avatars.githubusercontent.com/u/187177665?v=4`}
                      alt="Hamdani Hamka"
                      className="w-12 h-12 rounded-xl object-cover border-2 border-violet-200"
                    />
                  </div>
                </div>

                {/* Badge Version */}
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-violet-100 text-violet-700">
                    {active.name}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">A4 Ready</span>
                </div>

                {/* Experience Highlight: PT. BDSI */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Briefcase size={12} className="text-violet-600" />
                    <span>Work Experience</span>
                  </span>
                  <div className="pl-2.5 border-l-2 border-slate-200 text-xs text-slate-700">
                    <p className="font-semibold text-slate-800">IT Support Intern · PT. BDSI</p>
                    <p className="text-slate-500 text-[11px]">Hardware/Software PC Support, Printer &amp; Jaringan LAN/WLAN</p>
                  </div>
                </div>

                {/* Certification: Junior Web Developer */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Award size={12} className="text-fuchsia-600" />
                    <span>Certification</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-semibold">
                      Junior Web Developer
                    </span>
                    <span className="text-[11px] text-slate-500">Kompetensi Pemrograman Web</span>
                  </div>
                </div>

                {/* GitHub & Projects */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Github size={12} className="text-violet-600" />
                    <span>Projects &amp; Open Source</span>
                  </span>
                  <div className="pl-2.5 border-l-2 border-slate-200 text-xs text-slate-700">
                    <p className="font-semibold text-slate-800">Hamnime · VORTEX-FUTSAL · Noir-Coffee</p>
                    <p className="text-slate-500 text-[11px]">GitHub Pages Live Demos &amp; Telegram Bot Suite</p>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Stack</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["JavaScript", "React.js", "Python", "IT Support", "LAN/WLAN", "Node.js", "Telegram API"].map((skill) => (
                      <span key={skill} className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Quick Actions inside preview */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Format: PDF &amp; Web</span>
                <div className="flex items-center gap-2">
                  <a
                    href={active.htmlUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 transition"
                    title="Buka tampilan cetak di browser"
                  >
                    <ExternalLink size={14} />
                    <span>Lihat</span>
                  </a>
                  <button
                    onClick={(e) => handleDownload(e, active.pdfUrl, active.filename)}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold flex items-center gap-1 transition shadow cursor-pointer"
                    title="Download PDF langsung"
                  >
                    <Download size={14} />
                    <span>Download</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Format Selector & Description */}
          <div className="lg:col-span-6 flex flex-col text-center lg:text-left gap-6">
            <div>
              <h4 className="text-2xl font-bold text-white tracking-tight mb-2">
                Pilih Format Curriculum Vitae
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Pilih format CV yang paling sesuai dengan kebutuhan lowongan atau proposal proyek Anda. Keduanya memuat rekam jejak nyata: pengalaman IT Support di PT. BDSI, sertifikasi Junior Web Developer, dan proyek coding Hamdani Hamka.
              </p>
            </div>

            {/* Version Switcher Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => setSelectedCV("modern")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedCV === "modern"
                    ? "bg-violet-600/20 border-violet-500 text-white shadow-lg shadow-violet-600/20"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-400 flex items-center gap-1.5">
                    <Sparkles size={14} />
                    Opsi 1
                  </span>
                  {selectedCV === "modern" && <CheckCircle2 size={16} className="text-violet-400" />}
                </div>
                <p className="font-bold text-sm text-white">Modern Tech CV</p>
                <p className="text-xs text-gray-400 mt-1">
                  Visual modern, menonjolkan link live demo dan project GitHub.
                </p>
              </button>

              <button
                onClick={() => setSelectedCV("ats")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedCV === "ats"
                    ? "bg-cyan-600/20 border-cyan-500 text-white shadow-lg shadow-cyan-600/20"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <FileCheck size={14} />
                    Opsi 2
                  </span>
                  {selectedCV === "ats" && <CheckCircle2 size={16} className="text-cyan-400" />}
                </div>
                <p className="font-bold text-sm text-white">ATS-Friendly Resume</p>
                <p className="text-xs text-gray-400 mt-1">
                  Format teks standar korporat, mudah dipindai oleh sistem HR.
                </p>
              </button>
            </div>

            {/* Description of current active selection */}
            <div className="p-4 rounded-xl glass border border-white/10 text-xs text-gray-300 leading-relaxed flex items-start gap-3">
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 mt-0.5">
                {active.icon}
              </div>
              <div>
                <p className="font-semibold text-white mb-1">{active.name} ({active.subtitle})</p>
                <p className="text-gray-400">{active.desc}</p>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <button
                onClick={(e) => handleDownload(e, active.pdfUrl, active.filename)}
                disabled={downloading}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition cursor-pointer disabled:opacity-75"
              >
                <Download size={18} className={downloading ? "animate-bounce" : ""} />
                <span>{downloading ? "Menyiapkan File..." : `Download ${active.name} (PDF)`}</span>
              </button>

              <a
                href={active.htmlUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-4 glass border border-white/10 hover:bg-white/5 text-white font-semibold rounded-xl transition"
              >
                <FileText size={18} className="text-violet-400" />
                <span>Buka / Cetak di Browser</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default CVSection;
