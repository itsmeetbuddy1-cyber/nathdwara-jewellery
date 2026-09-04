import React, { useState } from 'react';
import { ShopProvider } from './context/ShopContext';
import IntroAnimation from './components/IntroAnimation';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Collections from './components/Collections';
import FeaturedProducts from './components/FeaturedProducts';
import ProductViewer3DSection from './components/ProductViewer3DSection';
import CustomJewellery from './components/CustomJewellery';
import TrustSection from './components/TrustSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

// Overlays & Modals
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductDetailModal from './components/ProductDetailModal';
import CheckoutModal from './components/CheckoutModal';
import SearchModal from './components/SearchModal';
import AdminDrawer from './components/AdminDrawer';
import Toast from './components/Toast';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterCategory = (category) => {
    setActiveFilter(category);
  };

  const handleLaunch3D = (product) => {
    const el = document.getElementById('studio3d');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ShopProvider>
      <div className="min-h-screen bg-obsidian-950 text-neutral-200 flex flex-col font-sans selection:bg-gold-500/30 selection:text-champagne overflow-x-hidden">
        {/* Luxury Opening Animation with Official Emblem */}
        {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}

        {/* Sticky Premium Navbar */}
        <Navbar />

        {/* Cinematic 3D Hero */}
        <main className="flex-1">
          <Hero isIntroActive={showIntro} />

          {/* Jewellery Collections (8 Interactive Categories) */}
          <Collections onFilterCategory={handleFilterCategory} />

          {/* Featured Signature Collection with Filter Tabs */}
          <FeaturedProducts
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            onLaunch3D={handleLaunch3D}
          />

          {/* Dedicated 3D WebGL Studio */}
          <ProductViewer3DSection />

          {/* Custom Jewellery Atelier ("Your Imagination. Our Craftsmanship.") */}
          <CustomJewellery />

          {/* Trust Section */}
          <TrustSection />

          {/* About Nathdwara Jwellery */}
          <AboutSection />

          {/* Atelier Contact & Query Form */}
          <ContactSection />
        </main>

        {/* Luxury Footer */}
        <Footer />

        {/* Global Modals & Drawers */}
        <CartDrawer />
        <WishlistDrawer />
        <ProductDetailModal />
        <CheckoutModal />
        <SearchModal />
        <AdminDrawer />
        <Toast />
      </div>
    </ShopProvider>
  );
}
