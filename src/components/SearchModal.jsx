import React, { useState, useMemo } from 'react';
import { PRODUCTS, FALLBACK_JEWELLERY_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Search, X, ShoppingBag, Eye, Heart } from 'lucide-react';

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setQuickViewProduct,
    addToCart,
    formatPrice,
    toggleWishlist,
    isInWishlist,
  } = useShop();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.metalType.toLowerCase().includes(q) ||
        p.stoneDetails.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-400/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3 bg-obsidian-950">
          <Search className="w-5 h-5 text-gold-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search jewellery by name, gold carat, diamond, solitaire, choker, emerald..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-white rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors text-xs uppercase font-semibold"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {!query.trim() ? (
            <div className="py-8 text-center text-neutral-500 font-sans text-xs">
              <p className="mb-3 uppercase tracking-wider text-neutral-400">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Solitaire Ring', 'Polki Choker', '22K Gold', 'Chandbali', 'Platinum', 'Emerald'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10 text-xs transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 font-sans text-sm">
              <p>No jewellery pieces found matching "{query}".</p>
              <p className="text-xs text-neutral-500 mt-2">
                Try searching for "gold", "solitaire", "bangles", or request a custom design.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-wider text-neutral-400 font-sans px-1">
                Found {searchResults.length} {searchResults.length === 1 ? 'Masterpiece' : 'Masterpieces'}
              </p>
              {searchResults.map((product) => {
                const inWishlist = isInWishlist(product.id);
                return (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setQuickViewProduct(product);
                    }}
                    className="p-3 rounded-xl glass-panel border border-white/10 hover:border-gold-400/40 flex items-center justify-between gap-4 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-obsidian-950 shrink-0 border border-white/10">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          onError={(e) => {
                            e.currentTarget.src = FALLBACK_JEWELLERY_IMAGE;
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm font-bold text-white group-hover:text-champagne transition-colors truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-gold-400/90 font-sans">
                          {product.metalType} • {product.purity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-serif text-sm font-bold text-white">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="p-2 rounded-lg bg-gold-500/15 hover:bg-gold-500 text-champagne hover:text-obsidian-950 transition-colors"
                        title="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
