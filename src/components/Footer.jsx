import React, { useState } from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Sparkles, X, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const [activePolicyModal, setActivePolicyModal] = useState(null);

  const policies = {
    privacy: {
      title: 'Privacy Policy',
      content:
        'At Nathdwara Jwellery, we treat your privacy with royal regard. Client details, bespoke design briefs, contact information, and shipping addresses are strictly confidential and encrypted. We never trade, sell, or disseminate your personal records to third parties.',
    },
    terms: {
      title: 'Terms & Conditions',
      content:
        'All jewellery pieces listed are handcrafted with authentic precious metals and natural/certified gemstones. Due to the individual nature of artisanal goldsmithing, gross weights may vary by +/- 3%. Custom bespoke orders are created specifically to client measurements and specifications.',
    },
    shipping: {
      title: 'Shipping & Insured Returns Policy',
      content:
        'Every parcel from Nathdwara Jwellery is dispatched in tamper-evident sealed packaging and is 100% insured until signature at your doorstep. We partner with specialized high-security logistics couriers across India. Complimentary resizing is available on custom rings within 15 days of receipt.',
    },
  };

  return (
    <>
      <footer className="bg-obsidian-950 border-t border-gold-400/20 text-neutral-400 pt-16 pb-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full border border-gold-400 flex items-center justify-center bg-gold-500/10 shadow-gold-sm">
                  <span className="font-serif text-base font-bold text-gold-300">N</span>
                </div>
                <span className="font-serif text-2xl font-bold tracking-[0.16em] text-gold-gradient uppercase">
                  Nathdwara Jwellery
                </span>
              </div>
              <p className="font-serif italic text-base text-champagne/90 mb-4">
                Crafted for You. Designed to Shine.
              </p>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm mb-6">
                Combining traditional Indian elegance with modern luxury and bespoke craftsmanship. Each jewel tells your personal story with timeless authenticity.
              </p>

              {/* Social Placeholders */}
              <div className="flex items-center gap-3">
                <a
                  href="#instagram"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-gold-400/50 hover:bg-gold-500/10 flex items-center justify-center text-neutral-300 hover:text-champagne transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-gold-400/50 hover:bg-gold-500/10 flex items-center justify-center text-neutral-300 hover:text-champagne transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#youtube"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-gold-400/50 hover:bg-gold-500/10 flex items-center justify-center text-neutral-300 hover:text-champagne transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div>
              <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4">
                Explore
              </h4>
              <ul className="space-y-2.5 text-xs font-sans">
                <li>
                  <a href="#home" className="hover:text-gold-300 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#collections" className="hover:text-gold-300 transition-colors">
                    Collections
                  </a>
                </li>
                <li>
                  <a href="#studio3d" className="hover:text-gold-300 transition-colors">
                    3D Interactive Studio
                  </a>
                </li>
                <li>
                  <a href="#custom-jewellery" className="hover:text-gold-300 transition-colors">
                    Custom Jewellery
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-gold-300 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-gold-300 transition-colors">
                    Contact Atelier
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal & Policies */}
            <div>
              <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4">
                Policies & Trust
              </h4>
              <ul className="space-y-2.5 text-xs font-sans">
                <li>
                  <button
                    onClick={() => setActivePolicyModal('privacy')}
                    className="hover:text-gold-300 transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('terms')}
                    className="hover:text-gold-300 transition-colors text-left"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal('shipping')}
                    className="hover:text-gold-300 transition-colors text-left"
                  >
                    Shipping & Returns
                  </button>
                </li>
                <li>
                  <span className="text-neutral-500 text-[11px] block pt-2">
                    Online Orders Accepted
                  </span>
                </li>
              </ul>
            </div>

            {/* Official Contact Column */}
            <div>
              <h4 className="font-serif text-base font-bold text-white uppercase tracking-wider mb-4">
                Atelier Contact
              </h4>
              <div className="space-y-3 text-xs font-sans">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                  <a href="tel:7435083922" className="text-white hover:text-gold-300 transition-colors">
                    7435083922
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                  <a
                    href="mailto:msoni04062006@gmail.com"
                    className="text-white hover:text-gold-300 transition-colors break-all"
                  >
                    msoni04062006@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 pt-2 text-[11px] text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                  <span>Insured All-India Transit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
            <p>© {new Date().getFullYear()} Nathdwara Jwellery. All Rights Reserved.</p>
            <p className="text-[11px] text-neutral-500">
              Crafted for You. Designed to Shine.
            </p>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {activePolicyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="max-w-lg w-full glass-panel p-6 sm:p-8 rounded-2xl border border-gold-400/30 relative">
            <button
              onClick={() => setActivePolicyModal(null)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              {policies[activePolicyModal]?.title}
            </h3>
            <p className="text-sm text-neutral-300 font-sans leading-relaxed mb-6">
              {policies[activePolicyModal]?.content}
            </p>
            <button
              onClick={() => setActivePolicyModal(null)}
              className="w-full py-2.5 rounded-xl bg-gold-500 text-obsidian-950 font-semibold text-xs uppercase tracking-wider"
            >
              Understood & Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
