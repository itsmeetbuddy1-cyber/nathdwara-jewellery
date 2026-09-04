import React, { useState } from 'react';
import { COLLECTIONS } from '../data/collections';
import { ArrowRight, Sparkles } from 'lucide-react';

function TiltCard({ item, onSelectCategory }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = -((y - centerY) / centerY) * 10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative rounded-2xl overflow-hidden glass-panel border border-gold-400/20 hover:border-gold-400/60 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-[400px] cursor-pointer"
      onClick={() => onSelectCategory(item)}
    >
      {/* Background Jewellery Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-[0.75] group-hover:brightness-[0.85]"
          loading="lazy"
        />
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/50 to-transparent" />
      </div>

      {/* Top Badges */}
      <div className="relative p-5 flex items-center justify-between z-10">
        <span className="text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-obsidian-950/80 text-gold-300 border border-gold-400/30 backdrop-blur-md">
          {item.count}
        </span>
        {item.isCustomAtelier && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-500/30 text-champagne border border-gold-400/50 backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-gold-300" />
            Bespoke
          </span>
        )}
      </div>

      {/* Bottom Content Card Info */}
      <div className="relative mt-auto p-6 z-10 flex flex-col justify-end">
        <p className="text-xs uppercase tracking-[0.2em] text-gold-300/90 font-medium mb-1">
          {item.category}
        </p>
        <h3 className="font-serif text-2xl font-bold text-white group-hover:text-champagne transition-colors leading-snug mb-2">
          {item.title}
        </h3>
        <p className="text-xs text-neutral-300 line-clamp-2 mb-4 font-sans opacity-90 group-hover:opacity-100 transition-opacity">
          {item.description}
        </p>

        {/* Explore Collection Button */}
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-champagne group-hover:text-gold-300 transition-colors pt-2 border-t border-white/10">
          <span>Explore Collection</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

export default function Collections({ onFilterCategory }) {
  const handleSelect = (item) => {
    if (item.isCustomAtelier) {
      const el = document.getElementById('custom-jewellery');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onFilterCategory(item.category);
      const el = document.getElementById('signature-collection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="collections" className="py-24 bg-obsidian-950 relative overflow-hidden">
      {/* Decorative Golden Ambient Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-gold-400 bg-gold-500/10 border border-gold-400/25 mb-4">
            <span>The Treasury</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Curated Jewellery Collections
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
            Discover our spectrum of handcrafted royal ornaments. From timeless everyday solitaires to sovereign wedding heirlooms.
          </p>
        </div>

        {/* 8 Category Interactive Grid with 3D Card Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COLLECTIONS.map((item) => (
            <TiltCard key={item.id} item={item} onSelectCategory={handleSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}
