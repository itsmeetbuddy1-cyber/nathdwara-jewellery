import React, { useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, FALLBACK_JEWELLERY_IMAGE } from '../data/products';
import { useShop } from '../context/ShopContext';
import {
  Heart,
  ShoppingBag,
  Eye,
  Box,
  Sparkles,
  Check,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Layers,
} from 'lucide-react';

export default function FeaturedProducts({ activeFilter, setActiveFilter, onLaunch3D }) {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
  } = useShop();

  const [addedAnimationId, setAddedAnimationId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleCount, setVisibleCount] = useState(() => {
    return typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 24;
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = PRODUCTS;

    // 1. Category Filter
    if (activeFilter && activeFilter !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // 2. Search Filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.metalType.toLowerCase().includes(q) ||
          p.stoneDetails.toLowerCase().includes(q) ||
          p.purity.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'weight-high') return parseFloat(b.grossWeight) - parseFloat(a.grossWeight);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    return result;
  }, [activeFilter, searchTerm, sortBy]);

  const displayedProducts = filteredAndSortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedProducts.length;

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart(product, 1, {
      size: product.sizes ? product.sizes[0] : 'Standard',
      metal: product.metalType,
    });
    setAddedAnimationId(product.id);
    setTimeout(() => setAddedAnimationId(null), 1600);
  };

  const handleLoadMore = () => {
    const step = typeof window !== 'undefined' && window.innerWidth < 768 ? 12 : 24;
    setVisibleCount((prev) => prev + step);
  };

  const handleShowAll = () => {
    setVisibleCount(filteredAndSortedProducts.length);
  };

  return (
    <section id="signature-collection" className="py-24 bg-obsidian-900/60 relative">
      {/* Decorative Jaali Background */}
      <div className="absolute inset-0 bg-jaali-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-gold-400 bg-gold-500/10 border border-gold-400/30 mb-3 shadow-gold-sm">
              <Sparkles className="w-3.5 h-3.5 text-gold-300" />
              <span>Timeless Craftsmanship • {PRODUCTS.length} Masterpieces</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Our Signature Collection
            </h2>
          </div>

          <p className="max-w-md text-sm text-neutral-400 font-sans">
            Every piece is forged with unyielding precision. Designed with authentic Indian heritage and refined for modern everyday splendour.
          </p>
        </div>

        {/* Filter Controls Bar (Search + Sort) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 glass-panel p-4 rounded-2xl border border-gold-400/20">
          {/* Quick Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by jewellery name, 22K gold, diamond, solitaire..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(24);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-obsidian-950/80 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-gold-400 transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold hidden sm:inline flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-obsidian-950 border border-white/10 text-xs font-semibold text-champagne focus:outline-none focus:border-gold-400"
            >
              <option value="featured" className="bg-obsidian-900 text-white">Featured Creations</option>
              <option value="price-low" className="bg-obsidian-900 text-white">Price: Low to High</option>
              <option value="price-high" className="bg-obsidian-900 text-white">Price: High to Low</option>
              <option value="weight-high" className="bg-obsidian-900 text-white">Gold Weight: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveFilter(cat.id);
                setVisibleCount(24);
              }}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-300 ${
                activeFilter === cat.id || (!activeFilter && cat.id === 'all')
                  ? 'bg-gold-500 text-obsidian-950 shadow-gold-sm font-bold'
                  : 'glass-panel text-neutral-400 hover:text-white hover:border-gold-400/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Count Header */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6 font-sans">
          <span>
            Showing <strong className="text-white">{displayedProducts.length}</strong> of{' '}
            <strong className="text-champagne">{filteredAndSortedProducts.length}</strong> Jewellery Creations
          </span>
          {hasMore && (
            <span className="text-[11px] text-neutral-500">
              Scroll down or tap "Load More" to view more
            </span>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {displayedProducts.map((product) => {
            const inWishlist = isInWishlist(product.id);
            const isJustAdded = addedAnimationId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="group relative rounded-2xl glass-panel border border-gold-400/20 hover:border-gold-400/50 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer overflow-hidden product-card-optimize"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-square w-full bg-obsidian-950 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_JEWELLERY_IMAGE;
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-[0.92] group-hover:brightness-100"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Gradient Shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-black/20 opacity-60 pointer-events-none" />

                  {/* Tag Pill */}
                  {product.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-gold-500/25 text-champagne border border-gold-400/30 backdrop-blur-none sm:backdrop-blur-md">
                      {product.tag}
                    </span>
                  )}

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                      inWishlist
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-400/50'
                        : 'bg-obsidian-900/70 text-neutral-300 hover:text-rose-400 border border-white/10 hover:border-white/25'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick Action Floating Bar on Hover */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="flex-1 py-2 rounded-xl bg-obsidian-950/90 hover:bg-obsidian-900 text-neutral-200 text-xs font-semibold uppercase tracking-wider border border-white/15 backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-gold-300" />
                      <span>Quick View</span>
                    </button>

                    {product.has3D && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onLaunch3D) onLaunch3D(product);
                          const el = document.getElementById('studio3d');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3 py-2 rounded-xl bg-gold-500/20 hover:bg-gold-500/40 text-champagne text-xs font-semibold uppercase tracking-wider border border-gold-400/40 backdrop-blur-md flex items-center gap-1 transition-colors"
                        title="View in 3D WebGL Studio"
                      >
                        <Box className="w-3.5 h-3.5 text-gold-300" />
                        <span className="hidden sm:inline">3D</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Product Meta Details */}
                <div className="p-5 flex flex-col flex-grow justify-between bg-obsidian-900/40">
                  <div>
                    {/* Metal Type & Purity */}
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-gold-400/90 font-medium mb-1.5">
                      <span className="truncate max-w-[150px]">{product.metalType}</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300 text-[10px] shrink-0">
                        {product.purity}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-champagne transition-colors line-clamp-1 mb-2">
                      {product.name}
                    </h3>

                    {/* Stone & Weight brief */}
                    <p className="text-[11px] text-neutral-400 line-clamp-1 mb-3 font-sans">
                      {product.stoneDetails} • {product.grossWeight}
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                        {formatPrice(product.price)}
                      </p>
                      {product.originalPrice && (
                        <p className="text-[11px] text-neutral-500 line-through font-sans">
                          {formatPrice(product.originalPrice)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gold-500/15 hover:bg-gold-500 text-champagne hover:text-obsidian-950 border border-gold-400/40 hover:border-transparent'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More & Pagination Controls */}
        {hasMore && (
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleLoadMore}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-500/15 hover:bg-gold-500 text-champagne hover:text-obsidian-950 border border-gold-400/40 hover:border-transparent font-semibold text-xs sm:text-sm uppercase tracking-[0.16em] transition-all duration-300 shadow-gold-sm flex items-center justify-center gap-2"
            >
              <span>Load More Masterpieces (+24)</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              onClick={handleShowAll}
              className="w-full sm:w-auto px-6 py-4 rounded-full glass-panel hover:bg-white/10 text-neutral-300 hover:text-white border border-white/15 font-medium text-xs sm:text-sm uppercase tracking-[0.16em] transition-all flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4 text-gold-400" />
              <span>Show All ({filteredAndSortedProducts.length} Items)</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
