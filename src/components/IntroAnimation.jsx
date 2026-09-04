import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: dark start, 1: emblem rise, 2: shine sweep, 3: ready to exit, 4: fading out
  const canvasRef = useRef(null);

  useEffect(() => {
    // 1. Floating Gold Dust Particles on Canvas
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let animationFrameId;
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const count = isMobile ? 22 : 55;
      const particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.8,
        speedY: -(Math.random() * 0.8 + 0.3),
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.7 + 0.2,
        pulsate: Math.random() * 0.05 + 0.01,
      }));

      const renderParticles = () => {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#f3e5ab';
          ctx.fill();

          p.y += p.speedY;
          p.x += p.speedX;
          p.alpha += Math.sin(Date.now() * p.pulsate) * 0.01;
          p.alpha = Math.max(0.1, Math.min(0.9, p.alpha));

          if (p.y < 0) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
        });

        animationFrameId = requestAnimationFrame(renderParticles);
      };
      renderParticles();

      return () => cancelAnimationFrame(animationFrameId);
    }
  }, []);

  useEffect(() => {
    // Staged Animation Sequence
    const t1 = setTimeout(() => setStage(1), 200);   // Logo emerges
    const t2 = setTimeout(() => setStage(2), 1400);  // Gold beam shine sweeps
    const t3 = setTimeout(() => setStage(3), 2800);  // Text & tagline settles
    const t4 = setTimeout(() => handleExit(), 4200); // Auto-open main website

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleExit = () => {
    setStage(4);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#070708] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${
        stage === 4 ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Radial Golden Aura */}
      <div className="absolute inset-0 bg-radial from-gold-500/15 via-[#070708]/80 to-[#070708] pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full bg-gold-400/10 blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center select-none max-w-lg">
        {/* Sacred Shrinathji Flute & Peacock Aura Ring */}
        <div className="relative w-56 h-56 sm:w-72 sm:h-72 flex items-center justify-center mb-6">
          {/* Outer Rotating Ornate Sacred Halo */}
          <div
            className={`absolute inset-0 rounded-full border border-gold-400/40 transition-all duration-1000 ${
              stage >= 1 ? 'opacity-100 scale-100 rotate-180' : 'opacity-0 scale-75 rotate-0'
            }`}
            style={{
              boxShadow: '0 0 45px rgba(212, 175, 55, 0.25)',
              transitionDuration: '1.8s',
            }}
          />

          {/* Dotted Golden Sunburst Ring */}
          <div
            className={`absolute -inset-4 rounded-full border border-dashed border-gold-400/30 transition-all duration-1000 ${
              stage >= 1 ? 'opacity-70 scale-100 animate-spin' : 'opacity-0 scale-50'
            }`}
            style={{ animationDuration: '30s' }}
          />

          {/* Central Official Embossed Logo */}
          <div
            className={`relative w-48 h-48 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000 transform ${
              stage >= 1
                ? 'opacity-100 translate-y-0 scale-100 drop-shadow-[0_15px_35px_rgba(212,175,55,0.4)]'
                : 'opacity-0 translate-y-8 scale-90'
            }`}
          >
            <img
              src="/nathdwara-logo.jpg"
              alt="Nathdwara Jwellery Official Emblem"
              className="w-full h-full object-cover object-center"
            />

            {/* Specular Diagonal Light Sweep */}
            <div
              className={`absolute inset-0 pointer-events-none transition-transform duration-1000 ${
                stage >= 2 ? 'translate-x-[200%]' : '-translate-x-[200%]'
              }`}
              style={{
                background:
                  'linear-gradient(105deg, transparent 20%, rgba(255, 245, 210, 0.75) 50%, transparent 80%)',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDuration: '1.2s',
              }}
            />
          </div>

          {/* Sparkle Glint on Crown */}
          {stage >= 2 && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 animate-ping pointer-events-none">
              <Sparkles className="w-6 h-6 text-champagne" />
            </div>
          )}
        </div>

        {/* Welcome Subtitle with Smooth Tracking */}
        <p
          className={`text-[11px] sm:text-xs uppercase tracking-[0.35em] text-gold-400/90 font-medium transition-all duration-700 ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Welcome to the Royal Atelier
        </p>

        {/* Brand Name Heading */}
        <h1
          className={`font-serif text-3xl sm:text-4xl font-bold tracking-[0.2em] text-gold-gradient uppercase my-2 transition-all duration-1000 ${
            stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Nathdwara Jwellery
        </h1>

        {/* Tagline */}
        <p
          className={`font-serif italic text-sm sm:text-base text-champagne/90 tracking-wide transition-all duration-1000 ${
            stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Crafted for You. Designed to Shine.
        </p>

        {/* Animated Golden Progress Line */}
        <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full my-6 overflow-hidden relative">
          <div
            className={`h-full bg-gold-gradient transition-all duration-1000 ease-out ${
              stage === 0
                ? 'w-0'
                : stage === 1
                ? 'w-1/4'
                : stage === 2
                ? 'w-2/3'
                : 'w-full'
            }`}
          />
        </div>

        {/* Skip / Enter Atelier Button */}
        <button
          onClick={handleExit}
          className="group px-6 py-2.5 rounded-full bg-gold-500/10 hover:bg-gold-500 text-champagne hover:text-obsidian-950 border border-gold-400/40 text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center gap-2 shadow-sm"
        >
          <span>Enter Atelier</span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Bottom Subtle Copyright */}
      <div className="absolute bottom-6 text-[10px] text-neutral-500 uppercase tracking-widest font-sans">
        Authentic Indian Heritage • Modern Luxury
      </div>
    </div>
  );
}
