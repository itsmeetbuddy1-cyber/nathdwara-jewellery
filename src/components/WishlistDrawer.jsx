import React from 'react';
import { useShop } from '../context/ShopContext';
import { FALLBACK_JEWELLERY_IMAGE } from '../data/products';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    formatPrice,
    setQuickViewProduct,
  } = useShop();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-obsidian-900 border-l border-gold-400/25 h-full flex flex-col justify-between shadow-2xl z-10">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-950/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-400/30 flex items-center justify-center text-rose-300">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Your Saved Jewels</h2>
              <p className="text-[11px] text-neutral-400 font-sans">
                {wishlist.length} {wishlist.length === 1 ? 'Design' : 'Designs'} saved
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <p className="font-serif text-xl text-white mb-2">No Saved Jewels Yet</p>
              <p className="text-xs text-neutral-400 max-w-xs mb-6 font-sans">
                Tap the heart icon on any jewellery piece to save it to your private wishlist.
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl glass-panel border border-white/10 flex gap-4 relative group"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setQuickViewProduct(item);
                  }}
                  className="w-20 h-20 rounded-xl overflow-hidden bg-obsidian-950 border border-white/10 shrink-0 cursor-pointer"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_JEWELLERY_IMAGE;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          setQuickViewProduct(item);
                        }}
                        className="font-serif text-sm font-bold text-white truncate cursor-pointer hover:text-champagne transition-colors"
                      >
                        {item.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-gold-400/90 font-sans mt-0.5">
                      {item.metalType} • {item.purity}
                    </p>
                    <p className="font-serif text-sm font-bold text-white mt-1">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Move to Cart */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="w-full py-2 rounded-xl bg-gold-500/15 hover:bg-gold-500 text-champagne hover:text-obsidian-950 border border-gold-400/30 hover:border-transparent text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
