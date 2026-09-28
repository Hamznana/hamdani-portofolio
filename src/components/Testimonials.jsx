import { useState, useContext } from "react";
import { Star, Send, MessageSquare, CheckCircle, Loader2, AlertCircle, Quote } from "lucide-react";
import { PortfolioContext } from "../context/PortfolioContext";
import { submitTestimonial } from "../services/supabase";

const StarRating = ({ value, onChange, disabled }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={disabled}
          onClick={() => onChange(star)}
          onMouseEnter={() => !disabled && setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className={`transition-all duration-150 ${disabled ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
        >
          <Star
            size={22}
            className={`transition-colors ${
              star <= (hovered || value)
                ? "fill-amber-400 text-amber-400"
                : "fill-none text-gray-600"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const { testimonials, isSupabaseConfigured: supabaseReady, reloadTestimonials } = useContext(PortfolioContext);

  const [form, setForm] = useState({ name: "", message: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setSubmitting(true);
    setError(null);
    try {
      await submitTestimonial(form);
      setSubmitted(true);
      setForm({ name: "", message: "", rating: 5 });
      // Reload testimonials setelah submit
      setTimeout(() => reloadTestimonials(), 1000);
    } catch (err) {
      setError(err.message || "Gagal mengirim testimonial. Coba lagi nanti.");
    } finally {
      setSubmitting(false);
    }
  };

  // Hitung rating rata-rata
  const avgRating = testimonials && testimonials.length > 0
    ? (testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)
    : null;

  return (
    <section id="testimonials" className="relative py-24 border-t border-white/5 bg-black/20 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-violet-600/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-fuchsia-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-widest text-violet-400 font-extrabold mb-3">Testimonials</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Yang Orang Katakan
          </h3>
          {avgRating && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className={`${s <= Math.round(avgRating) ? "fill-amber-400 text-amber-400" : "text-gray-600"}`} />
                ))}
              </div>
              <span className="text-amber-400 font-bold text-sm font-mono">{avgRating}</span>
              <span className="text-gray-500 text-xs">({testimonials.length} ulasan)</span>
            </div>
          )}
          <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left: Submit Form */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-violet-400" />
              Tinggalkan Testimoni
            </h4>

            {!supabaseReady ? (
              <div className="p-6 rounded-2xl glass border border-orange-500/20 text-orange-300 text-sm">
                <div className="flex items-start gap-3">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Fitur testimonial belum aktif</p>
                    <p className="text-orange-400/70 text-xs leading-relaxed">
                      Supabase belum dikonfigurasi. Setup Supabase dan tambahkan environment variables untuk mengaktifkan fitur ini.
                    </p>
                  </div>
                </div>
              </div>
            ) : submitted ? (
              <div className="p-6 rounded-2xl glass border border-emerald-500/20 text-emerald-300">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Terima kasih!</p>
                    <p className="text-xs text-emerald-400/70">Testimonial Anda telah berhasil dipublikasikan.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs text-emerald-300 hover:text-emerald-200 underline underline-offset-4 transition"
                >
                  Tulis ulasan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5 block">
                    Nama Anda *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Contoh: Ahmad Rizki"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5 block">
                    Rating *
                  </label>
                  <StarRating
                    value={form.rating}
                    onChange={(v) => setForm((prev) => ({ ...prev, rating: v }))}
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1.5 block">
                    Pesan *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Ceritakan pengalaman Anda..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition text-sm resize-none"
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-violet-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <><Loader2 size={16} className="animate-spin" /><span>Mengirim...</span></>
                  ) : (
                    <><Send size={16} /><span>Kirim Testimonial</span></>
                  )}
                </button>

                <p className="text-[11px] text-gray-600">
                  * Testimonial akan ditampilkan setelah disetujui admin.
                </p>
              </form>
            )}
          </div>

          {/* Right: Testimonials List */}
          <div>
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
              <Quote size={20} className="text-fuchsia-400" />
              Ulasan Terbaru
            </h4>

            {/* Supabase belum dikonfigurasi */}
            {!supabaseReady && (
              <div className="p-6 rounded-2xl glass border border-white/5 text-center">
                <MessageSquare size={32} className="mx-auto mb-3 text-gray-600" />
                <p className="text-gray-500 text-sm">Data belum tersedia</p>
                <p className="text-gray-600 text-xs mt-1">Aktifkan Supabase untuk melihat testimonial.</p>
              </div>
            )}

            {/* Supabase aktif tapi belum ada testimonial */}
            {supabaseReady && testimonials !== null && testimonials.length === 0 && (
              <div className="p-8 rounded-2xl glass border border-white/5 text-center">
                <MessageSquare size={32} className="mx-auto mb-3 text-gray-600" />
                <p className="text-gray-400 text-sm font-semibold">Belum ada testimonial</p>
                <p className="text-gray-600 text-xs mt-1">Jadilah yang pertama meninggalkan ulasan!</p>
              </div>
            )}

            {/* Loading dari Supabase */}
            {supabaseReady && testimonials === null && (
              <div className="flex items-center gap-3 py-8">
                <div className="w-5 h-5 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-500 text-sm">Memuat testimonial...</span>
              </div>
            )}

            {/* List testimonial */}
            {supabaseReady && testimonials && testimonials.length > 0 && (
              <div className="flex flex-col gap-4 max-h-[480px] overflow-y-auto pr-1">
                {testimonials.map((t) => (
                  <div key={t.id} className="p-5 rounded-2xl glass border border-white/5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {t.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{t.name}</p>
                          <p className="text-gray-600 text-[10px] font-mono">
                            {new Date(t.created_at).toLocaleDateString("id-ID")}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-shrink-0">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={12}
                            className={s <= t.rating ? "fill-amber-400 text-amber-400" : "text-gray-700"}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{t.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
