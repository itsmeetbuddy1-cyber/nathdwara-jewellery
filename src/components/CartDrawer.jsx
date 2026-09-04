import React from 'react';
import { useShop } from '../context/ShopContext';
import { FALLBACK_JEWELLERY_IMAGE } from '../data/products';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartGST,
    cartTotal,
    totalCartItems,
    formatPrice,
    setIsCheckoutOpen,
  } = useShop();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div className="relative w-full max-w-md bg-obsidian-900 border-l border-gold-400/25 h-full flex flex-col justify-between shadow-2xl z-10">
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-950/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-400/40 flex items-center justify-center text-champagne">
              <ShoppingBag className="w-4 h-4 text-gold-300" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white">Your Shopping Bag</h2>
              <p className="text-[11px] text-neutral-400 font-sans">
                {totalCartItems} {totalCartItems === 1 ? 'Item' : 'Items'} selected
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Online Orders Accepted Prominent Banner */}
        <div className="bg-gold-500/10 border-b border-gold-400/20 px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-champagne">
              Online Orders Accepted
            </span>
          </div>
          <span className="text-[11px] text-neutral-400 font-sans">100% Insured Transit</span>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-serif text-xl text-white mb-2">Your Bag is Empty</p>
              <p className="text-xs text-neutral-400 max-w-xs mb-6 font-sans">
                Explore our signature collection or create a custom piece designed just for you.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  const el = document.getElementById('signature-collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-full bg-gold-gradient text-obsidian-950 text-xs uppercase tracking-widest font-semibold hover:brightness-110 transition-all shadow-gold-sm"
              >
                Shop Online Now
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedMetal}-${idx}`}
                className="p-4 rounded-2xl glass-panel border border-white/10 flex gap-4 relative group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-obsidian-950 border border-white/10 shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_JEWELLERY_IMAGE;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-bold text-white truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() =>
                          removeFromCart(item.product.id, item.selectedSize, item.selectedMetal)
                        }
                        className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-gold-400/90 font-sans mt-0.5">
                      {item.selectedMetal} {item.selectedSize && `• Size ${item.selectedSize}`}
                    </p>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                    <div className="flex items-center gap-2 bg-obsidian-950 px-2 py-1 rounded-lg border border-white/10">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize, item.selectedMetal, -1)
                        }
                        className="text-neutral-400 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold text-white px-1">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.selectedSize, item.selectedMetal, 1)
                        }
                        className="text-neutral-400 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-serif text-sm font-bold text-white">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary & Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-obsidian-950/90 space-y-4">
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex justify-between text-neutral-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Gold GST (3%)</span>
                <span className="text-white font-medium">{formatPrice(cartGST)}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Insured Doorstep Courier</span>
                <span className="text-emerald-400 font-semibold uppercase tracking-wider text-[10px]">
                  FREE COMPLIMENTARY
                </span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                <span>Total Amount</span>
                <span className="text-gold-300 text-lg">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-full bg-gold-gradient text-obsidian-950 font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] hover:brightness-110 shadow-gold-md transition-all flex items-center justify-center gap-2 group"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <p className="text-[10px] text-neutral-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-gold-400" />
              Insured tamper-evident packaging • Razorpay / Stripe gateway ready
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
