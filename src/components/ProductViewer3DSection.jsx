import React, { useState } from 'react';
import JewelleryViewer, { METALS, GEMSTONES } from './ThreeD/JewelleryViewer';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, Sparkles, Sliders, ShieldCheck, Check, Info, Box } from 'lucide-react';

export default function ProductViewer3DSection() {
  const { formatPrice, addToCart } = useShop();

  const [selectedMetal, setSelectedMetal] = useState('yellowGold');
  const [selectedGem, setSelectedGem] = useState('diamond');
  const [ringSize, setRingSize] = useState('14');
  const [isAdded, setIsAdded] = useState(false);

  // Dynamic pricing calculation based on selected metal & gemstone
  const basePrice = 78000;
  const metalMultiplier = selectedMetal === 'platinum' ? 1.25 : selectedMetal === 'roseGold' ? 1.05 : 1.0;
  const gemMultiplier = selectedGem === 'ruby' ? 1.15 : selectedGem === 'emerald' ? 1.18 : selectedGem === 'sapphire' ? 1.12 : 1.0;
  const currentPrice = Math.round(basePrice * metalMultiplier * gemMultiplier);

  const handleAddToCart3D = () => {
    const customProduct = {
      id: `nj-bespoke-${selectedMetal}-${selectedGem}`,
      name: `Bespoke Solitaire Ring (${METALS[selectedMetal].label} • ${GEMSTONES[selectedGem].label})`,
      category: 'Rings',
      price: currentPrice,
      metalType: METALS[selectedMetal].name,
      purity: METALS[selectedMetal].tag,
      grossWeight: '5.60 g',
      stoneDetails: `0.90 ct ${GEMSTONES[selectedGem].name}`,
      images: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'],
      sizes: ['12', '14', '16', '18', '20'],
      description: `Custom configured 3D specimen in ${METALS[selectedMetal].name} adorned with ${GEMSTONES[selectedGem].name}.`,
    };

    addToCart(customProduct, 1, {
      size: ringSize,
      metal: METALS[selectedMetal].name,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <section id="studio3d" className="py-24 bg-obsidian-950 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gold-500/10 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-gold-400 bg-gold-500/10 border border-gold-400/30 mb-4">
            <Box className="w-3.5 h-3.5 text-gold-300" />
            <span>Interactive 3D Showroom</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Inspect Every Facet in Real-Time 3D
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
            Rotate 360°, zoom in to inspect microscopic diamond facets, and switch metals and precious gemstones on the fly.
          </p>
        </div>

        {/* Studio Grid: 3D Canvas + Specimen Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive 3D WebGL Canvas */}
          <div className="lg:col-span-8 w-full">
            <JewelleryViewer
              initialMetal={selectedMetal}
              initialGem={selectedGem}
              height="560px"
              onCustomChange={({ metal, gem }) => {
                // Keep synchronized
              }}
            />
          </div>

          {/* Right: Specimen Configuration & Instant Buy */}
          <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-2xl border border-gold-400/25 flex flex-col justify-between h-full shadow-2xl">
            <div>
              {/* Product Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-400">
                  Live 3D Customizer
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  GLTF/GLB Engine Ready
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                The Sovereign Solitaire Halo
              </h3>

              <p className="text-xs text-neutral-300 font-sans leading-relaxed mb-6">
                Custom forged with your chosen precious metal alloy and hand-selected central precious stone.
              </p>

              {/* Live Technical Specs */}
              <div className="p-4 rounded-xl bg-obsidian-950/70 border border-white/5 space-y-2 mb-6 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Selected Metal Alloy:</span>
                  <span className="text-champagne font-medium">{METALS[selectedMetal].name}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Hallmark Standard:</span>
                  <span className="text-champagne font-medium">{METALS[selectedMetal].tag}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Center Gemstone:</span>
                  <span className="text-champagne font-medium">{GEMSTONES[selectedGem].name}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Approximate Gold Weight:</span>
                  <span className="text-champagne font-medium">5.60 Grams</span>
                </div>
              </div>

              {/* Ring Size Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-neutral-300 mb-2">
                  <span>Select Ring Size (Indian Standard):</span>
                  <span className="text-gold-400 font-bold">Size {ringSize}</span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {['10', '12', '14', '16', '18'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setRingSize(sz)}
                      className={`py-2 rounded-lg text-xs font-semibold border transition-all ${
                        ringSize === sz
                          ? 'bg-gold-500 text-obsidian-950 border-gold-400 font-bold shadow-gold-sm'
                          : 'glass-panel text-neutral-400 hover:text-white hover:border-white/20'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Add to Cart */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">
                    Custom Specimen Price:
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    {formatPrice(currentPrice)}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400">Includes 3% GST</span>
              </div>

              <button
                onClick={handleAddToCart3D}
                className={`w-full py-4 rounded-xl text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-gold-md ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gold-gradient text-obsidian-950 hover:brightness-110'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added 3D Configuration to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order This 3D Configuration</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-neutral-400 text-center mt-3 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
                Handcrafted upon order confirmation • Tamper-evident transit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
