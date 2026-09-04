import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Shield,
  ShoppingBag,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export default function AdminDrawer() {
  const { isAdminOpen, setIsAdminOpen, orders, customInquiries, formatPrice } = useShop();
  const [activeTab, setActiveTab] = useState('inquiries'); // 'inquiries', 'orders', 'catalog'

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={() => setIsAdminOpen(false)}
      />

      {/* Slide-out Admin Panel */}
      <div className="relative w-full max-w-2xl bg-obsidian-900 border-l border-gold-400/30 h-full flex flex-col justify-between shadow-2xl z-10">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-obsidian-950/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-400 flex items-center justify-center text-champagne">
              <Shield className="w-5 h-5 text-gold-300" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-white">
                Nathdwara Atelier Admin Desk
              </h2>
              <p className="text-[11px] text-neutral-400 font-sans">
                Real-time Management & Integration Ready Architecture
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-3 bg-obsidian-950/50 border-b border-white/5">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'inquiries'
                ? 'bg-gold-500 text-obsidian-950 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Custom Requests ({customInquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'orders'
                ? 'bg-gold-500 text-obsidian-950 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Customer Orders ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'catalog'
                ? 'bg-gold-500 text-obsidian-950 font-bold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Catalog API</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: Custom Inquiries (Fully Functional) */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Submitted Bespoke Commissions
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live LocalStorage Synced
                </span>
              </div>

              {customInquiries.length === 0 ? (
                <div className="py-16 text-center text-neutral-500 font-sans text-xs">
                  <p>No custom jewellery requests submitted yet.</p>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    Fill the "Your Imagination. Our Craftsmanship" form on the site to test live capture.
                  </p>
                </div>
              ) : (
                customInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-5 rounded-2xl glass-panel border border-gold-400/25 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-400/30">
                          {inq.id}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white mt-1">
                          {inq.fullName}
                        </h4>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-sans">
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-sans">
                      <div className="text-neutral-400">
                        <span className="block text-[10px] uppercase text-neutral-500">Contact:</span>
                        <span className="text-white">{inq.mobileNumber}</span>
                        {inq.email && <span className="block text-neutral-400 text-[11px]">{inq.email}</span>}
                      </div>
                      <div className="text-neutral-400">
                        <span className="block text-[10px] uppercase text-neutral-500">Budget Range:</span>
                        <span className="text-champagne font-medium">{inq.budget}</span>
                      </div>
                      <div className="text-neutral-400">
                        <span className="block text-[10px] uppercase text-neutral-500">Design Type:</span>
                        <span className="text-white">{inq.jewelleryType}</span>
                      </div>
                      <div className="text-neutral-400">
                        <span className="block text-[10px] uppercase text-neutral-500">Preferred Metal:</span>
                        <span className="text-white">{inq.preferredMetal}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/5 text-xs text-neutral-300 font-sans">
                      <span className="text-neutral-500 block text-[10px] uppercase mb-1">
                        Design Vision:
                      </span>
                      {inq.designDescription}
                    </div>

                    {inq.imagePreview && (
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase mb-1">
                          Uploaded Sketch / Photo:
                        </span>
                        <img
                          src={inq.imagePreview}
                          alt="Inquiry sketch"
                          className="w-24 h-24 object-cover rounded-xl border border-white/10"
                        />
                      </div>
                    )}

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-neutral-400">
                        Contact preference: <strong className="text-white">{inq.preferredContactMethod}</strong>
                      </span>
                      <a
                        href={`https://wa.me/91${inq.mobileNumber.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(inq.fullName)}%2C%20regarding%20your%20custom%20jewellery%20request%20with%20Nathdwara%20Jwellery...`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        <span>Chat via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: Orders (Fully Functional) */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Placed Online Orders
                </span>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Order Dispatch
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-16 text-center text-neutral-500 font-sans text-xs">
                  <p>No orders placed yet.</p>
                  <p className="text-[11px] text-neutral-600 mt-1">
                    Add products to your cart and complete the demo checkout to view captured orders here.
                  </p>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-5 rounded-2xl glass-panel border border-gold-400/25 space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 px-2 py-0.5 rounded bg-gold-500/10 border border-gold-400/30">
                          {ord.id}
                        </span>
                        <h4 className="font-serif text-lg font-bold text-white mt-1">
                          {ord.customer.fullName}
                        </h4>
                      </div>
                      <span className="font-serif text-base font-bold text-gold-300">
                        {formatPrice(ord.total)}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-400 font-sans space-y-1">
                      <p>Phone: <span className="text-white">{ord.customer.mobileNumber}</span></p>
                      <p>
                        Destination: <span className="text-white">{ord.shippingAddress.address}, {ord.shippingAddress.city}, {ord.shippingAddress.state} - {ord.shippingAddress.pincode}</span>
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="p-3 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-1.5 text-xs font-sans">
                      <p className="text-[10px] uppercase text-neutral-500">Order Items:</p>
                      {ord.items.map((it, i) => (
                        <div key={i} className="flex justify-between text-neutral-300">
                          <span>{it.product.name} (x{it.quantity})</span>
                          <span>{formatPrice(it.product.price * it.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {ord.paymentStatus}
                      </span>
                      <span className="text-neutral-500">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: Catalog API & Future Backend Integrations */}
          {activeTab === 'catalog' && (
            <div className="space-y-4 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-champagne uppercase tracking-wider text-[11px]">
                    Backend API Integration Stubs
                  </p>
                  <p className="text-neutral-300 leading-relaxed text-[11px] mt-1">
                    This architecture is pre-structured to connect to a production Node/Express or Next.js API backed by PostgreSQL/Supabase.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl glass-panel border border-white/10">
                  <h4 className="font-semibold text-white mb-1">1. Product Management Endpoints</h4>
                  <p className="text-neutral-400 text-[11px] mb-2">
                    POST /api/products (Create with 3D model .glb URL, multi-images, weight, karats)
                  </p>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/10 text-[10px]">
                    Ready for Database Migration
                  </span>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-white/10">
                  <h4 className="font-semibold text-white mb-1">2. Razorpay / Stripe Webhook Handlers</h4>
                  <p className="text-neutral-400 text-[11px] mb-2">
                    POST /api/webhooks/razorpay (HMAC SHA-256 signature verification)
                  </p>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/10 text-[10px]">
                    Webhook Architecture Ready
                  </span>
                </div>

                <div className="p-4 rounded-xl glass-panel border border-white/10">
                  <h4 className="font-semibold text-white mb-1">3. Automated WhatsApp Cloud API</h4>
                  <p className="text-neutral-400 text-[11px] mb-2">
                    Direct order and custom design alert dispatch to +91 7435083922
                  </p>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/10 text-[10px]">
                    Frontend Direct Deep-Link Active
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-obsidian-950/80 text-center text-xs text-neutral-500 font-sans">
          Nathdwara Jwellery Operations • Confidential Internal System
        </div>
      </div>
    </div>
  );
}
