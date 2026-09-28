# Portfolio Hamdani Hamka (@Hamznana)

Interactive personal portfolio website untuk **Hamdani Hamka**, seorang Web Developer, Bot Developer, dan IT Support Specialist dari Duri, Riau, Indonesia.

Project ini dibangun dengan **React 19**, **Vite**, **Tailwind CSS v4**, serta terintegrasi langsung dengan **GitHub REST API** dan **Supabase** untuk data analitik, pelacakan kehadiran realtime, dan sistem testimoni interaktif.

---

## 🌟 Fitur Utama

- **Integrasi Real-Time GitHub API**:
  - Sinkronisasi otomatis data profil, statistik repositori, bintang (stars), forks, dan followers.
  - Kategorisasi otomatis repositori (Web Development, Automation, Tools, dll).
  - Tautan langsung ke live demo GitHub Pages / deployment aktif untuk setiap project.
- **Visitor Analytics & Pelacakan Pengunjung (Supabase)**:
  - Pelacakan kunjungan unik berbasis sesi harian (`sessionStorage` + PostgreSQL Function).
  - Metrik statistik: total pengunjung, kunjungan hari ini, minggu ini, dan bulan ini.
- **Real-Time Online Presence**:
  - Menampilkan jumlah pengunjung yang sedang aktif membuka website secara live menggunakan Supabase Realtime Channel.
- **Sistem Testimoni Interaktif**:
  - Pengunjung dapat mengirim nama, pesan, dan rating bintang (1 - 5).
  - Mode **Auto-Approve**: ulasan langsung terbit secara instan setelah dikirim.
  - Dilengkapi proteksi RLS (Row Level Security) PostgreSQL.
- **Dual CV Preview & Download**:
  - Mendukung dua format curriculum vitae: **Modern Tech CV** dan **ATS-Friendly CV**.
  - Dilengkapi fitur preview langsung di halaman dan tombol unduh PDF resmi.
- **Desain Modern & Responsif**:
  - Tema dark mode elegan dengan gradien violet dan fuchsia.
  - Sepenuhnya responsif untuk smartphone, tablet, dan desktop.
  - Animasi transisi halus menggunakan Framer Motion.

---

## 🛠️ Tech Stack

### Core & Framework
- **React 19**: Library antarmuka komponen berbasis declarative UI.
- **Vite 8**: Build tool dan local development server berkecepatan tinggi.
- **React Router DOM 7**: Manajemen navigasi halaman dan rute aplikasi.

### Styling & UI
- **Tailwind CSS v4**: Utility-first CSS framework dengan performa engine terbaru.
- **Framer Motion**: Library animasi deklaratif untuk micro-interactions.
- **Lucide React**: Koleksi ikon antarmuka modern yang konsisten.
- **SweetAlert2**: Notifikasi modal interaktif yang responsif.
- **Chart.js & React-Chartjs-2**: Visualisasi data statistik repositori dalam grafik interaktif.

### Backend & Database (Serverless)
- **Supabase**: PostgreSQL database dengan Row Level Security (RLS) dan Realtime WebSocket.
- **GitHub REST API**: Penyedia data live profile, repositori, dan kontribusi kode.

---

## 📁 Struktur Direktori

```text
porto_ham/
├── public/                     # Asset statis publik
│   ├── assets/                 # Dokumen CV (PDF & HTML ATS/Modern)
│   ├── favicon.svg             # Favicon resmi portfolio
│   ├── robots.txt              # Konfigurasi perayap SEO
│   └── sitemap.xml             # Sitemap halaman
├── src/
│   ├── assets/                 # Asset gambar lokal
│   ├── components/             # Komponen antarmuka modular
│   │   ├── About.jsx           # Profil, bio, dan metrik visitor
│   │   ├── Analytics.jsx       # Grafik & statistik repositori GitHub
│   │   ├── Contact.jsx         # Formulir dan tautan media sosial / kontak
│   │   ├── CVSection.jsx       # Preview dan pengunduh CV
│   │   ├── Experience.jsx      # Riwayat pengalaman kerja & sertifikasi
│   │   ├── Footer.jsx          # Informasi hak cipta & navigasi bawah
│   │   ├── Hero.jsx            # Bagian pembuka utama dengan animasi teks
│   │   ├── LoadingScreen.jsx   # Layar pembuka interaktif (splash loader)
│   │   ├── Navbar.jsx          # Navigasi sticky dengan secret shortcut
│   │   ├── Projects.jsx        # Katalog repositori dan filter kategori
│   │   ├── Skills.jsx          # Pemetaan keahlian teknis
│   │   └── Testimonials.jsx    # Formulir submit & daftar ulasan pengunjung
│   ├── config/
│   │   └── portfolioConfig.js  # Konfigurasi data statis profil & pengalaman
│   ├── context/
│   │   └── PortfolioContext.jsx # State management global aplikasi
│   ├── pages/
│   │   ├── Admin.jsx           # Halaman Admin Dashboard (/hh-admin)
│   │   └── Home.jsx            # Halaman utama portfolio
│   ├── routes/
│   │   └── AppRoutes.jsx       # Konfigurasi rute React Router
│   ├── services/
│   │   ├── github.js           # Layanan integrasi GitHub REST API
│   │   └── supabase.js         # Klien dan operasi Supabase (Analytics & Testimoni)
│   ├── App.jsx                 # Root komponen aplikasi
│   ├── index.css               # Styling global & utilitas Tailwind
│   └── main.jsx                # Entry point render DOM
├── .env.example                # Panduan template environment variables
├── SUPABASE_SCHEMA.sql         # Skema database & aturan keamanan RLS Supabase
├── tailwind.config.js          # Konfigurasi tema Tailwind CSS
└── vite.config.js              # Konfigurasi build Vite
```

---

## 🚀 Memulai (Local Setup)

### 1. Prasyarat
Pastikan komputer Anda sudah terpasang:
- **Node.js** (versi 18.x atau yang lebih baru)
- **npm** (atau pnpm / yarn)

### 2. Clone Repositori
```bash
git clone https://github.com/Hamznana/porto_ham.git
cd porto_ham
```

### 3. Instal Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment Variables
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

Buka file `.env` dan lengkapi nilainya:
```env
# Username GitHub yang ingin ditampilkan datanya
VITE_GITHUB_USERNAME=Hamznana

# (Opsional) Token GitHub Personal Access Token untuk batas limit API 5000 req/jam
VITE_GITHUB_TOKEN=your_github_token_here

# Supabase URL & Anon Key (dari dashboard Supabase > Project Settings > API)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Password untuk akses ke portal admin (/hh-admin)
VITE_ADMIN_PASSWORD=your_secure_password
```

### 5. Jalankan Development Server
```bash
npm run dev
```
Buka browser pada alamat [http://localhost:5173/](http://localhost:5173/).

---

## 🗄️ Setup Database Supabase

Jika Anda ingin mengaktifkan pelacak pengunjung, online presence, dan sistem ulasan testimoni:

1. Buat project gratis di [supabase.com](https://supabase.com).
2. Masuk ke menu **SQL Editor** pada project Supabase Anda.
3. Salin seluruh kode dari file [`SUPABASE_SCHEMA.sql`](./SUPABASE_SCHEMA.sql) ke editor SQL.
4. Klik tombol **Run**.
5. Buka menu **Project Settings > API**, lalu salin:
   - **Project URL** ke `VITE_SUPABASE_URL`
   - **anon public key** ke `VITE_SUPABASE_ANON_KEY`
6. Restart development server (`npm run dev`).

---

## 📦 Build untuk Production

Untuk memeriksa kepatuhan linter dan memverifikasi kualitas kode:
```bash
npm run lint
```

Untuk mengompilasi bundel produksi:
```bash
npm run build
```

Hasil build yang siap di-hosting akan berada di folder `dist/`. Anda dapat mengujinya secara lokal dengan perintah:
```bash
npm run preview
```

---

## 🌐 Panduan Deployment

### Deploy ke Vercel (Direkomendasikan)
1. Hubungkan akun GitHub Anda ke [Vercel](https://vercel.com).
2. Pilih repositori ini untuk diimpor.
3. Pada bagian **Environment Variables**, tambahkan:
   - `VITE_GITHUB_USERNAME`
   - `VITE_GITHUB_TOKEN` (opsional)
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`
4. Klik tombol **Deploy**.

> **Catatan SPA Routing**: File konfigurasi rewrite otomatis memastikan rute `/hh-admin` dan reload halaman di SPA berjalan tanpa galat 404.

---

## 🔐 Akses Admin Portal

Portfolio ini dilengkapi halaman khusus untuk pemilik situs:
- **URL**: `/hh-admin`
- **Keyboard Shortcut**: `Ctrl + Shift + H` (ditekan bersamaan dari halaman mana saja)
- **Autentikasi**: Memerlukan password admin yang ditentukan pada variabel `VITE_ADMIN_PASSWORD`.

---

## 👤 Pembuat

**Hamdani Hamka**
- GitHub: [@Hamznana](https://github.com/Hamznana)
- Email: [hamdaniamka@gmail.com](mailto:hamdaniamka@gmail.com)
- WhatsApp: [+62 821-7208-5318](https://wa.me/6282172085318)

---

## 📄 Lisensi

Project ini dirilis di bawah lisensi [MIT](./LICENSE). Bebas digunakan dan disesuaikan untuk keperluan personal maupun profesional.
