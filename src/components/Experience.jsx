import { useContext } from "react";
import { Briefcase, GraduationCap, Award, Info } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";

const Experience = () => {
  const { config } = useContext(PortfolioContext);
  const { experiences } = config;

  return (
    <section id="experience" className="relative py-24 border-t border-white/5 bg-black/20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-violet-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-extrabold mb-3">Timeline</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Pengalaman & Milestone
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* State: Tidak ada data */}
        {(!experiences || experiences.length === 0) && (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
            {/* Icon */}
            <div className="p-6 rounded-3xl glass border border-white/10 relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10" />
              <Briefcase size={48} className="text-violet-400/50 relative z-10" />
            </div>

            <div className="text-center max-w-md">
              <h4 className="text-white font-bold text-xl mb-2">Data belum tersedia</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                Informasi pengalaman kerja, pendidikan, dan sertifikasi belum diisi. Update data ini melalui Admin Dashboard atau langsung di file konfigurasi.
              </p>
            </div>

            {/* Placeholder cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
              {[
                { icon: <Briefcase size={20} className="text-violet-400" />, label: "Pengalaman Kerja", color: "violet" },
                { icon: <GraduationCap size={20} className="text-cyan-400" />, label: "Pendidikan", color: "cyan" },
                { icon: <Award size={20} className="text-fuchsia-400" />, label: "Sertifikasi", color: "fuchsia" },
              ].map(({ icon, label, color }) => (
                <div
                  key={label}
                  className={`p-5 rounded-2xl glass border border-${color}-500/10 flex flex-col items-center gap-3 text-center opacity-40`}
                >
                  <div className={`p-3 rounded-xl bg-${color}-600/10 border border-${color}-500/20`}>
                    {icon}
                  </div>
                  <p className="text-gray-400 text-sm font-semibold">{label}</p>
                  <p className="text-gray-600 text-xs">Belum diisi</p>
                </div>
              ))}
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl glass border border-blue-500/20 text-blue-300/70 text-xs leading-relaxed max-w-lg">
              <Info size={16} className="flex-shrink-0 mt-0.5 text-blue-400" />
              <div>
                <strong className="text-blue-300">Cara menambahkan:</strong> Buka file{" "}
                <code className="text-blue-200">src/config/portfolioConfig.js</code> dan isi array{" "}
                <code className="text-blue-200">experiences</code> dengan data asli Anda.
              </div>
            </div>
          </div>
        )}

        {/* State: Ada data: tampilkan timeline */}
        {experiences && experiences.length > 0 && (
          <div className="relative border-l border-white/10 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:top-0 md:before:bottom-0 md:before:w-px md:before:bg-white/10 flex flex-col gap-12">
            {experiences.map((exp, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={`relative flex flex-col md:flex-row w-full ${isLeft ? "md:justify-start" : "md:justify-end"}`}
                >
                  <div className="absolute left-[-21px] top-1 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full glass border border-white/15 flex items-center justify-center z-10" style={{ backgroundColor: "#030014" }}>
                    {exp.type === "Work" && <Briefcase size={18} className="text-violet-400" />}
                    {exp.type === "Education" && <GraduationCap size={18} className="text-cyan-400" />}
                    {exp.type === "Certification" && <Award size={18} className="text-fuchsia-400" />}
                  </div>

                  <div className={`w-full md:w-[calc(50%-2rem)] pl-6 md:pl-0 ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <div className={`p-6 rounded-2xl glass-card flex flex-col gap-3 relative text-left ${isLeft ? "md:text-right" : ""}`}>
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border w-fit ${isLeft ? "md:self-end" : "self-start"} border-violet-500/30 text-violet-400 bg-violet-600/5`}>
                        <span>{exp.year}</span>
                      </div>

                      <div>
                        <h4 className="text-lg font-bold text-white tracking-tight">{exp.title}</h4>
                        <p className="text-sm text-violet-400 font-semibold mt-0.5">{exp.subtitle}</p>
                      </div>

                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{exp.description}</p>

                      <span className="absolute bottom-4 right-4 text-[9px] uppercase font-extrabold tracking-widest text-gray-600 font-mono">
                        {exp.type}
                      </span>
                    </div>
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

export default Experience;
