import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import JewelleryViewer from './ThreeD/JewelleryViewer';
import {
  X,
  Heart,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ChevronDown,
  Box,
  Image as ImageIcon,
} from 'lucide-react';

export default function ProductDetailModal() {
  const {
    quickViewProduct: product,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen,
    setIsCheckoutOpen,
  } = useShop();

  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [show3D, setShow3D] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Standard');
  const [isAdded, setIsAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('delivery'); // 'delivery' or 'care'

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, 1, { size: selectedSize, metal: product.metalType });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, 1, { size: selectedSize, metal: product.metalType });
    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCustomizeDesign = () => {
    setQuickViewProduct(null);
    const el = document.getElementById('custom-jewellery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl bg-obsidian-900 border border-gold-400/30 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-obsidian-950/80">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">
              {product.category}
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-xs text-neutral-400">{product.purity}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-2 rounded-full border transition-all ${
                inWishlist
                  ? 'bg-rose-500/20 text-rose-400 border-rose-400/50'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => setQuickViewProduct(null)}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visual Media (Gallery & 3D) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* View Mode Toggle Button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-obsidian-950 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setShow3D(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    !show3D
                      ? 'bg-gold-500 text-obsidian-950 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Gallery</span>
                </button>
                <button
                  onClick={() => setShow3D(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    show3D
                      ? 'bg-gold-500 text-obsidian-950 shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D Interactive</span>
                </button>
              </div>

              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                In Stock & Ready for Vault Dispatch
              </span>
            </div>

            {/* Main Stage */}
            <div className="relative aspect-square rounded-2xl bg-obsidian-950 border border-gold-400/20 overflow-hidden flex items-center justify-center">
              {show3D ? (
                <JewelleryViewer height="100%" interactive={true} />
              ) : (
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              )}
            </div>

            {/* Thumbnails (when in Gallery mode) */}
            {!show3D && product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-gold-400 ring-2 ring-gold-400/30'
                        : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-400 font-medium mb-1">
                {product.metalType} • {product.purity}
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif text-3xl font-bold text-white">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-neutral-500 line-through font-sans">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-gold-400 font-sans ml-2">
                  (Inclusive of all taxes & 3% GST)
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Detailed Spec Sheet */}
              <div className="grid grid-cols-2 gap-2.5 p-4 rounded-xl bg-obsidian-950/80 border border-white/5 text-xs mb-6 font-sans">
                <div>
                  <span className="text-neutral-500 block">Gross Gold Weight:</span>
                  <span className="text-white font-medium">{product.grossWeight}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block">Metal Standard:</span>
                  <span className="text-white font-medium">{product.metalType} ({product.purity})</span>
                </div>
                <div className="col-span-2">
                  <span className="text-neutral-500 block">Precious Stones:</span>
                  <span className="text-white font-medium">{product.stoneDetails}</span>
                </div>
              </div>

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-neutral-300 uppercase tracking-wider mb-2">
                    <span>Select Size:</span>
                    <span className="text-gold-400 font-bold">{selectedSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedSize === sz
                            ? 'bg-gold-500 text-obsidian-950 border-gold-400 font-bold'
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Accordions: Delivery & Care Instructions */}
              <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
                {/* Delivery Accordion */}
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'delivery' ? null : 'delivery')}
                    className="w-full p-3 bg-obsidian-950/60 flex items-center justify-between text-xs font-semibold text-neutral-200"
                  >
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gold-400" />
                      Delivery Information & Transit Insurance
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'delivery' ? 'rotate-180 text-gold-400' : 'text-neutral-400'
                      }`}
                    />
                  </button>
                  {openAccordion === 'delivery' && (
                    <div className="p-3 bg-obsidian-950/30 text-xs text-neutral-400 leading-relaxed font-sans border-t border-white/5">
                      Complimentary fully-insured doorstep delivery across India via specialized secure courier. Handcrafted orders are delivered within 4-7 business days with tamper-proof security seals.
                    </div>
                  )}
                </div>

                {/* Care Instructions Accordion */}
                <div className="border border-white/10 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                    className="w-full p-3 bg-obsidian-950/60 flex items-center justify-between text-xs font-semibold text-neutral-200"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-gold-400" />
                      Jewellery Care Instructions
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'care' ? 'rotate-180 text-gold-400' : 'text-neutral-400'
                      }`}
                    />
                  </button>
                  {openAccordion === 'care' && (
                    <div className="p-3 bg-obsidian-950/30 text-xs text-neutral-400 leading-relaxed font-sans border-t border-white/5 space-y-1">
                      <p>• Store in the provided velvet-lined Nathdwara keepsake box away from moisture.</p>
                      <p>• Avoid direct contact with harsh perfumes, chlorine, and chemical cosmetics.</p>
                      <p>• Clean gently with a soft microfibre jewellery cloth.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons: Add to Cart, Buy Now, Customize */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gold-500/15 hover:bg-gold-500 text-champagne hover:text-obsidian-950 border border-gold-400/40'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-semibold text-xs uppercase tracking-wider hover:brightness-110 shadow-gold-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              <button
                onClick={handleCustomizeDesign}
                className="w-full py-3 rounded-xl glass-panel hover:bg-white/10 text-neutral-300 hover:text-white border border-white/15 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Customize This Design</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
