import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Heart, ShoppingBag, Menu, X, Shield, Phone, Sparkles } from 'lucide-react';

export default function Navbar() {
  const {
    totalCartItems,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAdminOpen,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Collections', href: '#collections' },
    { name: '3D Studio', href: '#studio3d' },
    { name: 'Custom Jewellery', href: '#custom-jewellery' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-panel border-b border-gold-400/20 shadow-2xl py-3'
            : 'bg-transparent border-b border-white/5 py-4'
        }`}
      >
        {/* Top subtle announcement bar */}
        <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-6 text-[11px] font-sans tracking-widest text-neutral-400 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-champagne font-medium">ONLINE ORDERS ACCEPTED</span>
            <span className="text-neutral-500">•</span>
            <span>Complimentary Insured All-India Transit</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:7435083922"
              className="hover:text-gold-300 transition-colors flex items-center gap-1.5 text-neutral-300"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span>Direct Atelier: 7435083922</span>
            </a>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-gold-300 text-neutral-400 hover:underline text-[10px] uppercase tracking-wider flex items-center gap-1"
              title="Atelier Dashboard"
            >
              <Shield className="w-3 h-3 text-gold-400/80" />
              <span>Admin Desk</span>
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between pt-2">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <a href="#home" className="flex flex-col items-center sm:items-start group">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full border border-gold-400/60 flex items-center justify-center bg-gold-500/10 group-hover:border-gold-300 transition-all shadow-gold-sm">
                <span className="font-serif text-sm font-bold text-gold-300">N</span>
              </div>
              <span className="font-serif text-lg sm:text-xl lg:text-2xl font-bold tracking-[0.18em] text-gold-gradient uppercase">
                Nathdwara Jwellery
              </span>
            </div>
            <span className="hidden sm:block text-[9px] uppercase tracking-[0.28em] text-neutral-400 pl-9 font-sans -mt-0.5">
              Crafted for You • Designed to Shine
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] uppercase tracking-[0.15em] font-medium text-neutral-300 hover:text-gold-300 transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gold-gradient transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-neutral-300 hover:text-gold-300 rounded-full hover:bg-white/5 transition-colors relative"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2.5 text-neutral-300 hover:text-gold-300 rounded-full hover:bg-white/5 transition-colors relative"
              aria-label="View wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 text-neutral-300 hover:text-gold-300 rounded-full hover:bg-white/5 transition-colors relative flex items-center gap-1.5"
              aria-label="View shopping cart"
            >
              <ShoppingBag className="w-5 h-5 text-champagne" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gold-500 text-obsidian-950 text-[10px] font-bold flex items-center justify-center shadow-gold-sm">
                  {totalCartItems}
                </span>
              )}
            </button>

            <a
              href="#custom-jewellery"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/10 text-champagne border border-gold-400/40 hover:bg-gold-500 hover:text-obsidian-950 transition-all duration-300 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sliding Panel */}
          <div className="relative w-full max-w-xs bg-obsidian-900 border-r border-gold-400/20 p-6 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full border border-gold-400 flex items-center justify-center bg-gold-500/10">
                    <span className="font-serif text-sm font-bold text-gold-300">N</span>
                  </div>
                  <span className="font-serif text-base font-bold tracking-widest text-gold-gradient">
                    NATHDWARA
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base uppercase tracking-wider font-medium text-neutral-300 hover:text-gold-300 py-2 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-gold-400/40 text-xs">→</span>
                  </a>
                ))}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminOpen(true);
                  }}
                  className="text-left text-sm uppercase tracking-wider font-medium text-neutral-400 hover:text-gold-300 py-2 border-b border-white/5 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 text-gold-400" />
                  <span>Admin Desk</span>
                </button>
              </nav>
            </div>

            {/* Bottom Atelier Contact */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <p className="text-xs text-neutral-400 font-sans">Direct Concierge</p>
              <a
                href="tel:7435083922"
                className="flex items-center gap-2 text-champagne text-sm font-medium"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>+91 7435083922</span>
              </a>
              <a
                href="https://wa.me/917435083922?text=Hello%20Nathdwara%20Jwellery%2C%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection."
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2.5 text-center text-xs uppercase tracking-widest font-semibold rounded-xl bg-gold-500 text-obsidian-950 shadow-gold-sm"
              >
                WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
