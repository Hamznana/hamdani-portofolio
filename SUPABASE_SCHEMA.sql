-- ============================================================
-- Supabase Database Schema
-- Portfolio Hamdani Hamka — @Hamznana
-- ============================================================
-- Jalankan SQL ini di Supabase SQL Editor:
-- Supabase Dashboard > SQL Editor > New Query > Paste > Run
-- ============================================================

-- ─── Tabel 1: Visitor Analytics ───────────────────────────
CREATE TABLE IF NOT EXISTS analytics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date DEFAULT CURRENT_DATE NOT NULL,
  value bigint DEFAULT 0 NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Unique constraint: satu baris per hari
CREATE UNIQUE INDEX IF NOT EXISTS analytics_date_idx ON analytics (date);

-- Function untuk increment visitor per hari (upsert)
CREATE OR REPLACE FUNCTION increment_visitor(visit_date date DEFAULT CURRENT_DATE)
RETURNS void AS $$
BEGIN
  INSERT INTO analytics (date, value)
  VALUES (visit_date, 1)
  ON CONFLICT (date)
  DO UPDATE SET value = analytics.value + 1;
END;
$$ LANGUAGE plpgsql;

-- ─── Tabel 2: Testimonials ────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  message text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_approved boolean DEFAULT true NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ─── Row Level Security (RLS) ────────────────────────────

-- Analytics: hanya bisa dibaca oleh semua, insert/update via fungsi
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "analytics_public_read" ON analytics FOR SELECT USING (true);

-- Testimonials: publik bisa baca & submit testimonial (langsung auto-approved)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Siapapun bisa baca testimonial yang approved
CREATE POLICY "testimonials_public_read" ON testimonials
  FOR SELECT USING (is_approved = true);

-- Siapapun bisa submit testimonial baru (auto-approved)
CREATE POLICY "testimonials_public_insert" ON testimonials
  FOR INSERT WITH CHECK (true);

-- Catatan: Jika sebelumnya tabel sudah dibuat dengan is_approved default false,
-- jalankan 3 baris berikut di SQL Editor untuk migrasi ke auto-approve:
-- ALTER TABLE testimonials ALTER COLUMN is_approved SET DEFAULT true;
-- DROP POLICY IF EXISTS "testimonials_public_insert" ON testimonials;
-- CREATE POLICY "testimonials_public_insert" ON testimonials FOR INSERT WITH CHECK (true);

-- Semua aksi admin (select all, update, delete) menggunakan service role key
-- yang digunakan dari Admin Dashboard

-- ─── Enable Realtime untuk Online Presence ────────────────
-- Aktifkan realtime untuk tabel (opsional, presence pakai channel)
-- Pergi ke: Supabase > Database > Replication > lalu enable tabel jika diperlukan

-- ─── Test Data (HAPUS setelah testing) ───────────────────
-- INSERT INTO analytics (date, value) VALUES (CURRENT_DATE, 1);
-- INSERT INTO testimonials (name, message, rating, is_approved)
--   VALUES ('Test User', 'Ini testimonial test', 5, true);

-- ============================================================
-- SELESAI!
-- Setelah menjalankan ini, update .env dengan:
-- VITE_SUPABASE_URL = URL project Anda
-- VITE_SUPABASE_ANON_KEY = anon key Anda
-- ============================================================
