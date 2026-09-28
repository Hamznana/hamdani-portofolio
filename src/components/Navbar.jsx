import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Code } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Analytics", href: "#analytics" },
  { name: "Experience", href: "#experience" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();

  const secretClicks = useRef(0);
  const secretTimer = useRef(null);

  // Secret shortcut: Ctrl + Shift + H untuk akses cepat portal admin
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "H" || e.key === "h")) {
        e.preventDefault();
        navigate("/hh-admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Tentukan active section berdasarkan posisi scroll
      if (location.pathname === "/") {
        const scrollPosition = window.scrollY + 100;
        for (const link of navLinks) {
          const el = document.querySelector(link.href);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(link.href.substring(1));
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Akses tersembunyi via triple-click titik ungu logo (membantu di layar sentuh/mobile)
  const handleSecretDotClick = (e) => {
    e.stopPropagation();
    secretClicks.current += 1;
    if (secretTimer.current) clearTimeout(secretTimer.current);

    if (secretClicks.current >= 3) {
      secretClicks.current = 0;
      navigate("/hh-admin");
    } else {
      secretTimer.current = setTimeout(() => {
        secretClicks.current = 0;
      }, 1000);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav py-3 shadow-lg"
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white hover:opacity-95"
        >
          <div className="p-1.5 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-600 flex items-center justify-center">
            <Code size={18} className="text-white" />
          </div>
          <span>
            Hamdani
            <span
              onClick={handleSecretDotClick}
              className="text-violet-500 font-extrabold select-none cursor-default"
              title=""
            >
              .
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-fuchsia-400 ml-1.5 hidden sm:inline">
              Dev
            </span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === "/" && activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg hover:text-white ${
                  isActive ? "text-white bg-white/5" : "text-gray-400"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full glass shadow-xl border-t border-white/5 py-4 px-6 flex flex-col gap-3 animate-fade-in">
          {navLinks.map((link) => {
            const isActive = location.pathname === "/" && activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 text-white border-l-2 border-violet-500"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
