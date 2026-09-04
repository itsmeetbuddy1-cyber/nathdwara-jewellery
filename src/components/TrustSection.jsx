import React from 'react';
import { Gem, Palette, ShieldCheck, Headphones } from 'lucide-react';

export default function TrustSection() {
  const trustPillars = [
    {
      icon: Gem,
      title: 'Authentic Craftsmanship',
      description: 'Beautifully crafted jewellery with attention to detail.',
    },
    {
      icon: Palette,
      title: 'Customized Designs',
      description: 'Jewellery created according to your ideas and preferences.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Shopping',
      description: 'Safe and reliable online ordering experience.',
    },
    {
      icon: Headphones,
      title: 'Personal Assistance',
      description: 'Contact our team for jewellery selection and customization.',
    },
  ];

  return (
    <section className="py-20 bg-obsidian-900 border-y border-gold-400/15 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-gold-400/20 hover:border-gold-400/50 transition-all duration-300 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-champagne mb-5 group-hover:scale-110 group-hover:border-gold-300 transition-all shadow-gold-sm">
                  <Icon className="w-7 h-7 text-gold-300" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-champagne transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
