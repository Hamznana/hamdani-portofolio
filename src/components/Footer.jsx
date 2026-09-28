import { useState, useEffect, useContext } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";

const Github = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const { config } = useContext(PortfolioContext);
  const { socials } = config;
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#02000d] border-t border-white/5 py-12 px-6">
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        
        {/* Brand Copyright */}
        <div>
          <span className="text-sm font-bold text-white tracking-tight block">
            Hamdani Hamka<span className="text-violet-500 font-extrabold">.</span>
          </span>
          <p className="text-xs text-gray-600 mt-1">
            &copy; {new Date().getFullYear()} Hamdani Hamka. All rights reserved. Crafted with React + Vite.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4 text-gray-500">
          <a
            href={socials.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-300"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${socials.email}`}
            className="hover:text-white transition-colors duration-300"
            aria-label="Email Address"
          >
            <Mail size={18} />
          </a>
        </div>

      </div>

      {/* Back to Top Button */}
      {showScroll && (
        <button
          onClick={scrollTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-violet-600 hover:bg-violet-500 text-white shadow-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] z-40 transition-all duration-300 animate-fade-in hover:scale-105"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

    </footer>
  );
};

export default Footer;
