import { createClient } from "@supabase/supabase-js";

// ============================================================
// Supabase Service — Real-time data
// Testimonials, Visitor Analytics, Online Presence
// ============================================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Supabase client — null jika belum dikonfigurasi
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ─── Visitor Tracking ─────────────────────────────────────────

/**
 * Tracks page view dan mengembalikan stats.
 * Jika Supabase belum dikonfigurasi → return null (tampilkan "belum tersedia")
 */
export const trackVisitor = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const sessionKey = "hh_visited_session";
    const today = new Date().toISOString().split("T")[0];

    // Hanya increment jika sesi baru
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "true");

      // Upsert visitor untuk hari ini
      await supabase.rpc("increment_visitor", { visit_date: today });
    }

    // Ambil total & stats
    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .order("date", { ascending: false })
      .limit(30);

    if (error) throw error;

    const total = data?.reduce((acc, r) => acc + (r.value || 0), 0) || 0;
    const todayRow = data?.find((r) => r.date === today);
    const todayCount = todayRow?.value || 0;

    // Hitung minggu ini
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekCount = data
      ?.filter((r) => new Date(r.date) >= weekAgo)
      .reduce((acc, r) => acc + (r.value || 0), 0) || 0;

    // Hitung bulan ini
    const thisMonth = new Date().toISOString().substring(0, 7);
    const monthCount = data
      ?.filter((r) => r.date?.startsWith(thisMonth))
      .reduce((acc, r) => acc + (r.value || 0), 0) || 0;

    return { total, today: todayCount, week: weekCount, month: monthCount };
  } catch (error) {
    console.warn("Visitor tracking failed:", error.message);
    return null;
  }
};

// ─── Real-time Online Presence ────────────────────────────────

/**
 * Bergabung ke Supabase Realtime channel untuk online presence.
 * @param {Function} onCountChange - callback(count: number)
 * @returns cleanup function
 */
export const subscribeToOnlineUsers = (onCountChange) => {
  if (!isSupabaseConfigured || !supabase) {
    onCountChange(null); // null = belum tersedia
    return () => {};
  }

  const channel = supabase.channel("online-users", {
    config: { presence: { key: crypto.randomUUID() } },
  });

  channel
    .on("presence", { event: "sync" }, () => {
      const state = channel.presenceState();
      const count = Object.keys(state).length;
      onCountChange(count);
    })
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({ online_at: new Date().toISOString() });
      }
    });

  return () => {
    supabase.removeChannel(channel);
  };
};

// ─── Testimonials ─────────────────────────────────────────────

/**
 * Ambil testimonials yang sudah diapprove admin.
 */
export const fetchTestimonials = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn("Fetch testimonials failed:", error.message);
    return null;
  }
};

/**
 * Submit testimonial baru (langsung auto-approved).
 */
export const submitTestimonial = async ({ name, message, rating }) => {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error("Supabase belum dikonfigurasi");
  }

  const { data, error } = await supabase
    .from("testimonials")
    .insert([
      {
        name: name.trim(),
        message: message.trim(),
        rating: parseInt(rating),
        is_approved: true, // Otomatis disetujui
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Ambil SEMUA testimonials (termasuk yang belum approved) - untuk Admin.
 */
export const fetchAllTestimonialsAdmin = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn("Admin fetch testimonials failed:", error.message);
    return null;
  }
};

/**
 * Approve testimonial — untuk Admin.
 */
export const approveTestimonial = async (id) => {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from("testimonials")
    .update({ is_approved: true })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

/**
 * Hapus testimonial — untuk Admin.
 */
export const deleteTestimonial = async (id) => {
  if (!isSupabaseConfigured || !supabase) return null;

  const { error } = await supabase
    .from("testimonials")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
};

/**
 * Ambil visitor analytics untuk Admin.
 */
export const fetchAnalyticsAdmin = async () => {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from("analytics")
      .select("*")
      .order("date", { ascending: false })
      .limit(30);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.warn("Admin analytics fetch failed:", error.message);
    return null;
  }
};
