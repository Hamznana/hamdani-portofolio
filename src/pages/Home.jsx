import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Analytics from "../components/Analytics";
import Experience from "../components/Experience";
import CVSection from "../components/CVSection";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 50);
  };

  return (
    <>
      {/* Loading Screen Overlay */}
      {isLoading && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}

      {/* Main Portfolio Content */}
      <div
        style={{
          visibility: showContent ? "visible" : "hidden",
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease"
        }}
      >
        {/* Background */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "#030014", zIndex: -2 }} />
        <div
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 60%)
            `,
            zIndex: -1, pointerEvents: "none"
          }}
        />

        <div style={{ minHeight: "100vh", color: "#d1d5db" }}>
          <Navbar />

          <main style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: "600px",
                background: "linear-gradient(to bottom, rgba(109, 40, 217, 0.08), transparent)",
                pointerEvents: "none", zIndex: 0
              }}
            />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Analytics />
            <Experience />
            <CVSection />
            <Testimonials />
            <Contact />
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
