import React from 'react';
import HeroViewer from './ThreeD/HeroViewer';
import { ArrowUpRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-obsidian-950 bg-jaali-pattern"
    >
      {/* Ambient Lighting Gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gold-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-600/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Typography & Hero Copy */}
        <div className="lg:col-span-7 flex flex-col items-start z-10 text-left">
          {/* Royal Heritage Insignia Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-400/30 text-champagne text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-md mb-6 shadow-gold-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span>Royal Heritage • Modern Atelier</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-4">
            NATHDWARA <br />
            <span className="text-gold-gradient font-serif italic font-normal">
              JWELLERY
            </span>
          </h1>

          {/* Subheading */}
          <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-champagne/90 tracking-wide mb-4">
            Timeless Jewellery. Crafted Especially for You.
          </h2>

          {/* Supporting text */}
          <p className="font-sans text-sm sm:text-base text-neutral-300/90 leading-relaxed max-w-xl mb-8">
            Discover beautifully crafted jewellery or create a custom piece designed just for you.
            Infusing sacred Indian artistry with modern silhouette precision and museum-grade diamonds.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a
              href="#collections"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-obsidian-950 font-semibold text-xs sm:text-sm uppercase tracking-[0.16em] hover:brightness-110 transition-all duration-300 shadow-gold-md flex items-center justify-center gap-2 group"
            >
              <span>Explore Collection</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#custom-jewellery"
              className="w-full sm:w-auto px-7 py-4 rounded-full glass-panel text-champagne hover:text-white border border-gold-400/40 hover:border-gold-300 text-xs sm:text-sm uppercase tracking-[0.16em] font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
              <span>Customize Your Jewellery</span>
            </a>
          </div>

          {/* Trust Pillars Micro Bar */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 w-full max-w-lg">
            <div>
              <p className="font-serif text-lg sm:text-xl font-bold text-champagne">100%</p>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-sans">
                Authentic Craft
              </p>
            </div>
            <div>
              <p className="font-serif text-lg sm:text-xl font-bold text-champagne">Bespoke</p>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-sans">
                Made to Order
              </p>
            </div>
            <div>
              <p className="font-serif text-lg sm:text-xl font-bold text-champagne">Insured</p>
              <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-sans">
                Doorstep Delivery
              </p>
            </div>
          </div>
        </div>

        {/* Right 3D Interactive Jewellery Experience */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center">
          <div className="w-full relative">
            {/* Framed Glowing Aura */}
            <div className="relative rounded-3xl p-1 bg-gradient-to-b from-gold-400/25 via-white/5 to-transparent shadow-2xl">
              <div className="rounded-[22px] bg-obsidian-900/90 backdrop-blur-xl overflow-hidden border border-white/5">
                <HeroViewer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
