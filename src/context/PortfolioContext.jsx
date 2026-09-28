import { createContext, useState, useEffect, useCallback } from "react";
import initialConfig from "../config/portfolioConfig";
import {
  fetchGithubProfile,
  fetchGithubStats,
} from "../services/github";
import {
  trackVisitor,
  fetchTestimonials,
  subscribeToOnlineUsers,
  isSupabaseConfigured,
} from "../services/supabase";

// eslint-disable-next-line react-refresh/only-export-components
export const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const [config, setConfig] = useState(initialConfig);

  // Data dari GitHub API (real-time)
  const [githubProfile, setGithubProfile] = useState(null);
  const [githubLoading, setGithubLoading] = useState(true);

  // Visitor stats dari Supabase
  const [visitorData, setVisitorData] = useState(null); // null = belum tersedia

  // Online users dari Supabase Realtime
  const [onlineCount, setOnlineCount] = useState(null); // null = belum tersedia

  // Testimonials dari Supabase
  const [testimonials, setTestimonials] = useState(null); // null = belum tersedia

  // ─── Fetch GitHub Profile & Stats ──────────────────────────
  const loadGithubData = useCallback(async () => {
    setGithubLoading(true);
    try {
      const [profile, stats] = await Promise.all([
        fetchGithubProfile(config.githubUsername),
        fetchGithubStats(config.githubUsername),
      ]);

      if (profile) {
        setGithubProfile(profile);
        // Update config stats dengan data asli dari API
        setConfig((prev) => ({
          ...prev,
          stats: {
            totalProjects: stats?.publicRepos || 0,
            githubRepos: stats?.publicRepos || 0,
            totalStars: stats?.totalStars || 0,
            totalForks: stats?.totalForks || 0,
            followers: profile.followers || 0,
            following: profile.following || 0,
          },
          profile: {
            ...prev.profile,
            avatarUrl: profile.avatarUrl || prev.profile.avatarUrl,
            bio: profile.bio || prev.profile.bio,
          },
        }));
      }
    } catch (err) {
      console.warn("GitHub data load failed:", err.message);
    } finally {
      setGithubLoading(false);
    }
  }, [config.githubUsername]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [profile, stats] = await Promise.all([
          fetchGithubProfile(config.githubUsername),
          fetchGithubStats(config.githubUsername),
        ]);
        if (active && profile) {
          setGithubProfile(profile);
          setConfig((prev) => ({
            ...prev,
            stats: {
              totalProjects: stats?.publicRepos || 0,
              githubRepos: stats?.publicRepos || 0,
              totalStars: stats?.totalStars || 0,
              totalForks: stats?.totalForks || 0,
              followers: profile.followers || 0,
              following: profile.following || 0,
            },
            profile: {
              ...prev.profile,
              avatarUrl: profile.avatarUrl || prev.profile.avatarUrl,
              bio: profile.bio || prev.profile.bio,
            },
          }));
        }
      } catch (err) {
        console.warn("GitHub data load failed:", err.message);
      } finally {
        if (active) {
          setGithubLoading(false);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, [config.githubUsername]);

  // ─── Visitor Tracking ──────────────────────────────────────
  useEffect(() => {
    const run = async () => {
      const stats = await trackVisitor();
      setVisitorData(stats); // null jika Supabase belum dikonfigurasi
    };
    run();
  }, []);

  // ─── Online Presence (Supabase Realtime) ──────────────────
  useEffect(() => {
    const cleanup = subscribeToOnlineUsers((count) => {
      setOnlineCount(count);
    });
    return cleanup;
  }, []);

  // ─── Testimonials dari Supabase ───────────────────────────
  const reloadTestimonials = useCallback(async () => {
    const data = await fetchTestimonials();
    setTestimonials(data);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const data = await fetchTestimonials();
      if (active) {
        setTestimonials(data);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // ─── Config Updaters ───────────────────────────────────────
  const updateProfile = (profileData) => {
    setConfig((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...profileData },
    }));
  };

  const updateSocials = (socialsData) => {
    setConfig((prev) => ({
      ...prev,
      socials: { ...prev.socials, ...socialsData },
    }));
  };

  const updateGithubUsername = (username) => {
    setConfig((prev) => ({ ...prev, githubUsername: username }));
  };

  const updateSkills = (skillsArray) => {
    setConfig((prev) => ({ ...prev, skills: skillsArray }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        config,
        githubProfile,
        githubLoading,
        visitorData,
        onlineCount,
        testimonials,
        isSupabaseConfigured,
        updateProfile,
        updateSocials,
        updateGithubUsername,
        updateSkills,
        reloadTestimonials,
        reloadGithubData: loadGithubData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
