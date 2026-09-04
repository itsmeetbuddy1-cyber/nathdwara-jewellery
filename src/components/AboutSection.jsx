import React from 'react';
import { Sparkles, Heart, Crown, Shield } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-obsidian-950 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Imagery Montage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-gold-400/30 p-2 glass-panel shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80"
                alt="Jeweller crafting gold jewellery"
                className="w-full h-[460px] object-cover rounded-2xl brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />

              {/* Floating Floating Heritage Stamp */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-obsidian-900/90 border border-gold-400/30 backdrop-blur-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-400 flex items-center justify-center text-champagne shrink-0">
                  <Crown className="w-6 h-6 text-gold-300" />
                </div>
                <div>
                  <p className="font-serif text-base font-bold text-white">
                    Royal Indian Devotion to Purity
                  </p>
                  <p className="text-xs text-neutral-400 font-sans">
                    Hand-forged with timeless pride in every intricate curve.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative Copy */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-gold-400 bg-gold-500/10 border border-gold-400/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span>Our Heritage & Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight mb-6">
              The Art of Jewellery, Made Personal
            </h2>

            <div className="space-y-4 text-neutral-300 font-sans text-sm sm:text-base leading-relaxed mb-8">
              <p>
                Nathdwara Jwellery is focused on creating beautiful jewellery that combines timeless elegance with personal style.
              </p>
              <p>
                Whether customers are looking for a special gift, everyday elegance, bridal jewellery, or a completely customized design, the brand aims to make every piece meaningful.
              </p>
              <p className="text-neutral-400 text-sm">
                Each ornament begins with a spark of individuality — shaped by patient hands, authentic metals, and an innate respect for sacred artistry. When you wear Nathdwara Jwellery, you carry forward an intimate story crafted to endure.
              </p>
            </div>

            {/* Feature points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              <div className="p-4 rounded-xl glass-panel border border-white/5">
                <Heart className="w-5 h-5 text-gold-400 mb-2" />
                <h4 className="font-serif text-base font-bold text-white">Deeply Personal</h4>
                <p className="text-xs text-neutral-400">Tailored to your milestones, emotions, and aspirations.</p>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-white/5">
                <Shield className="w-5 h-5 text-gold-400 mb-2" />
                <h4 className="font-serif text-base font-bold text-white">Uncompromised Quality</h4>
                <p className="text-xs text-neutral-400">Exquisite gold alloys and certified gemstones.</p>
              </div>
            </div>

            <a
              href="#custom-jewellery"
              className="px-8 py-4 rounded-full bg-gold-gradient text-obsidian-950 font-semibold text-xs sm:text-sm uppercase tracking-[0.16em] hover:brightness-110 transition-all shadow-gold-sm"
            >
              Start Your Custom Story
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
