// ============================================================
// Portfolio Configuration: Hamdani Hamka (@Hamznana)
// Data diambil dari GitHub API secara otomatis.
// Hanya data yang tidak tersedia di GitHub yang di-hardcode di sini.
// ============================================================

const initialConfig = {
  githubUsername: "Hamznana",

  // Password untuk Admin Dashboard (/hh-admin)
  // Bisa di-override melalui environment variable VITE_ADMIN_PASSWORD
  adminPassword: import.meta.env.VITE_ADMIN_PASSWORD || "hamdani2024",

  profile: {
    fullName: "Hamdani Hamka",
    firstName: "Hamdani",
    title: "Web Developer & Bot Developer",

    // Roles untuk typing animation, berdasarkan keahlian nyata
    roles: [
      "Web Developer",
      "Bot Developer",
      "IT Support Specialist",
      "JavaScript Enthusiast",
      "Python Programmer",
    ],

    bio: "Developer dan IT Support Specialist dari Duri, Riau, Indonesia. Berpengalaman dalam pemeliharaan perangkat keras/lunak komputer dan jaringan lokal di lingkungan korporat PT. BDSI, serta berfokus membangun web applications modern dengan JavaScript/React dan automasi bot Python.",

    learningPath:
      "Memiliki pengalaman kerja lapangan sebagai IT Support Intern di PT. BDSI (Bohai Drilling Service Indonesia) dan memegang sertifikasi kompetensi Junior Web Developer. Aktif merancang dan merilis 17+ repositori open source di GitHub dengan live deployment.",

    // Akan di-override oleh data GitHub API saat runtime
    avatarUrl: "https://avatars.githubusercontent.com/u/187177665?v=4",

    // CV tersedia dalam 2 versi: Modern Tech & ATS Friendly
    cvUrl: "/assets/cv-hamdani-modern.pdf",
    cvFilename: "CV_Hamdani_Hamka_Modern.pdf",
    cvAvailable: true,
  },

  socials: {
    // Data kontak
    whatsapp: "+6282172085318",
    whatsappMessage:
      "Halo Hamdani, saya melihat portfolio Anda dan tertarik untuk berdiskusi.",
    email: "hamdaniamka@gmail.com",
    linkedin: null,
    github: "https://github.com/Hamznana",
  },

  // Stats default: akan di-override oleh GitHub API saat runtime
  stats: {
    totalProjects: 0,
    githubRepos: 0,
    totalStars: 0,
    totalForks: 0,
    followers: 0,
    following: 0,
  },

  // Skills teknis
  skills: [
    { name: "JavaScript (ES6+)", level: 88, category: "Frontend" },
    { name: "React.js", level: 82, category: "Frontend" },
    { name: "HTML & CSS", level: 85, category: "Frontend" },
    { name: "Tailwind CSS", level: 80, category: "Frontend" },
    { name: "Python", level: 80, category: "Backend" },
    { name: "Node.js", level: 78, category: "Backend" },
    { name: "Telegram Bot API", level: 85, category: "Automation" },
    { name: "IT Support & Troubleshooting", level: 88, category: "Tools" },
    { name: "LAN / WLAN & Printer Setup", level: 85, category: "Tools" },
    { name: "Git & GitHub", level: 85, category: "Tools" },
    { name: "Vercel & GitHub Pages", level: 82, category: "Tools" },
  ],

  // Pengalaman & Milestone Riwayat Nyata
  experiences: [
    {
      id: "exp-1",
      year: "Internship",
      title: "IT Support Intern",
      subtitle: "PT. BDSI (Bohai Drilling Service Indonesia)",
      description:
        "Melakukan dukungan teknis komprehensif bagi rekan kerja dan operasional kantor: diagnosa dan perbaikan hardware/software laptop dan desktop PC, instalasi dan pemecahan kendala printer jaringan lokal, serta monitoring kestabilan konektivitas LAN/WLAN agar seluruh komunikasi kerja terhubung lancar tanpa hambatan.",
      type: "Work",
    },
    {
      id: "exp-2",
      year: "Certified",
      title: "Junior Web Developer",
      subtitle: "Sertifikasi Kompetensi Pemrograman Web",
      description:
        "Memperoleh sertifikasi kompetensi Junior Web Developer, membuktikan penguasaan dalam pembuatan struktur web semantik (HTML/CSS), manipulasi DOM interaktif (JavaScript ES6+), integrasi REST API, dan penerapan kaidah web modern yang responsif dan teruji.",
      type: "Certification",
    },
    {
      id: "exp-3",
      year: "2023 - Sekarang",
      title: "Independent Web & Bot Developer",
      subtitle: "Open Source Creator & Developer",
      description:
        "Merancang, membangun, dan memelihara 17+ repositori publik di GitHub. Berhasil meluncurkan berbagai aplikasi web live di GitHub Pages (seperti Hamnime, VORTEX-FUTSAL, Noir-Coffee) serta bot otomasi Telegram menggunakan Python dan Node.js.",
      type: "Work",
    },
  ],

  // Testimonials: diambil dari Supabase saat runtime
  testimonials: [],
};

export default initialConfig;
