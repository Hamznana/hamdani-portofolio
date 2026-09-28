import { useState, useEffect, useRef } from "react";

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const completedRef = useRef(false);

  const statusMessages = [
    "Establishing secure connection...",
    "Fetching developer profile info...",
    "Syncing GitHub repositories...",
    "Compiling interactive analytics...",
    "Formatting responsive containers...",
    "System check complete. Welcome!"
  ];

  const statusIndex =
    progress < 20 ? 0 :
    progress < 40 ? 1 :
    progress < 60 ? 2 :
    progress < 80 ? 3 :
    progress < 95 ? 4 : 5;

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);

          // Prevent calling onComplete twice
          if (!completedRef.current) {
            completedRef.current = true;
            setTimeout(() => {
              setFadeOut(true);
              setTimeout(() => {
                if (onComplete) onComplete();
              }, 600);
            }, 400);
          }
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#030014",
        color: "white",
        transition: fadeOut ? "opacity 0.7s ease, transform 0.7s ease" : "none",
        opacity: fadeOut ? 0 : 1,
        transform: fadeOut ? "translateY(-20px)" : "translateY(0)",
        pointerEvents: fadeOut ? "none" : "all"
      }}
    >
      {/* Background ambient glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none"
        }}
      />

      <div style={{ width: "100%", maxWidth: "420px", padding: "0 24px", textAlign: "center", position: "relative", zIndex: 10 }}>

        {/* Logo Icon */}
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: "linear-gradient(135deg, #7c3aed, #c026d3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 32px",
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.35)",
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          }}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="4 17 10 11 4 5" />
            <line x1="12" y1="19" x2="20" y2="19" />
          </svg>
        </div>

        {/* Brand Name */}
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            background: "linear-gradient(to right, #fff, #c4b5fd, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px"
          }}
        >
          Hamdani Portfolio
        </h1>

        {/* Status terminal text */}
        <div
          style={{
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "24px"
          }}
        >
          <span style={{ color: "#8b5cf6", fontFamily: "monospace", fontSize: "13px" }}>&gt;</span>
          <p
            style={{
              color: "#9ca3af",
              fontFamily: "monospace",
              fontSize: "12px",
              letterSpacing: "0.05em",
              transition: "all 0.3s ease"
            }}
          >
            {statusMessages[statusIndex]}
          </p>
        </div>

        {/* Progress Bar Container */}
        <div
          style={{
            width: "100%",
            height: "6px",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: "999px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            marginBottom: "16px"
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(to right, #7c3aed, #c026d3, #06b6d4)",
              borderRadius: "999px",
              transition: "width 0.3s ease-out"
            }}
          />
        </div>

        {/* Percentage Counter */}
        <div
          style={{
            fontSize: "42px",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            fontFamily: "monospace",
            background: "linear-gradient(to right, #a78bfa, #e879f9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}
        >
          {progress}%
        </div>

      </div>
    </div>
  );
};

export default LoadingScreen;
