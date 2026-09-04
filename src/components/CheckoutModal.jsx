import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  ShieldCheck,
  Truck,
  CheckCircle2,
  CreditCard,
  Building2,
  QrCode,
  ArrowRight,
  Printer,
  MessageSquare,
  Lock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartGST,
    cartTotal,
    formatPrice,
    placeOrder,
  } = useShop();

  if (!isCheckoutOpen) return null;

  const [step, setStep] = useState(1); // 1: Address, 2: Payment, 3: Success Confirmation
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    address: '',
    city: '',
    state: 'Rajasthan',
    pincode: '',
    paymentMethod: 'upi_demo',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const indianStates = [
    'Rajasthan',
    'Gujarat',
    'Maharashtra',
    'Delhi',
    'Karnataka',
    'Tamil Nadu',
    'Uttar Pradesh',
    'Madhya Pradesh',
    'Punjab',
    'West Bengal',
    'Other State',
  ];

  const validateStep1 = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim().replace(/\D/g, ''))) {
      errs.mobileNumber = 'Enter valid 10-digit Indian mobile number';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pincode.trim()) {
      errs.pincode = 'PIN Code is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Enter valid 6-digit PIN code';
    }
    return errs;
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    const errs = validateStep1();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep(2);
    }
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const order = placeOrder({
        customer: {
          fullName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          email: formData.email,
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        paymentMethod: formData.paymentMethod,
        isTestMode: true,
      });

      setConfirmedOrder(order);
      setIsProcessing(false);
      setStep(3);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const generateWhatsAppOrderSync = () => {
    if (!confirmedOrder) return '#';
    const text = encodeURIComponent(
      `Hello Nathdwara Jwellery Atelier,\n\nI have placed an order on your website:\n- Order ID: ${confirmedOrder.id}\n- Client Name: ${confirmedOrder.customer.fullName}\n- Phone: ${confirmedOrder.customer.mobileNumber}\n- Total: ${formatPrice(confirmedOrder.total)}\n- Address: ${confirmedOrder.shippingAddress.address}, ${confirmedOrder.shippingAddress.city}, ${confirmedOrder.shippingAddress.pincode}\n\nPlease confirm vault dispatch and tracking.`
    );
    return `https://wa.me/917435083922?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl bg-obsidian-900 border border-gold-400/30 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-obsidian-950/80">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-bold text-gold-gradient">
              NATHDWARA ATELIER CHECKOUT
            </span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              Online Orders Accepted
            </span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="px-6 py-3 bg-obsidian-950/40 border-b border-white/5 flex items-center justify-center gap-6 text-xs font-semibold">
            <div className={`flex items-center gap-2 ${step >= 1 ? 'text-champagne' : 'text-neutral-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 1 ? 'bg-gold-500 text-obsidian-950' : 'bg-white/10'}`}>
                1
              </span>
              <span>Shipping & Details</span>
            </div>
            <span className="text-neutral-600">———</span>
            <div className={`flex items-center gap-2 ${step >= 2 ? 'text-champagne' : 'text-neutral-500'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step >= 2 ? 'bg-gold-500 text-obsidian-950' : 'bg-white/10'}`}>
                2
              </span>
              <span>Payment Gateway (Demo)</span>
            </div>
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {/* STEP 1: Shipping Details */}
          {step === 1 && (
            <form onSubmit={handleNextToPayment} className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-1">
                  Recipient & Delivery Address
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  Orders are dispatched via secure, insured courier with tamper-evident seal verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                    Full Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maharani Gayatri Devi"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 ${
                      errors.fullName ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.fullName && <p className="text-rose-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                    Mobile Number <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 7435083922"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 ${
                      errors.mobileNumber ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.mobileNumber && (
                    <p className="text-rose-400 text-xs mt-1">{errors.mobileNumber}</p>
                  )}
                </div>

                {/* Email */}
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                    Email Address <span className="text-neutral-500 font-normal">(For receipt & invoice)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. recipient@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400"
                  />
                </div>

                {/* Street Address */}
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                    Complete Street Address / Apartment <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 108 Royal Heritage Palace Road, Near Temple Square"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 ${
                      errors.address ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.address && <p className="text-rose-400 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                    City <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Nathdwara / Udaipur"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 ${
                      errors.city ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.city && <p className="text-rose-400 text-xs mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                    State <span className="text-gold-400">*</span>
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400"
                  >
                    {indianStates.map((st) => (
                      <option key={st} value={st} className="bg-obsidian-900 text-white">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* PIN Code */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-1.5">
                    6-Digit PIN Code <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 313301"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 ${
                      errors.pincode ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.pincode && <p className="text-rose-400 text-xs mt-1">{errors.pincode}</p>}
                </div>

                {/* Shipping Method badge */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/25 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-white">Insured Armed Vault Transit</p>
                    <p className="text-[11px] text-emerald-300">Complimentary 100% Insured Delivery</p>
                  </div>
                </div>
              </div>

              {/* Order Quick Summary Bar */}
              <div className="p-4 rounded-xl bg-obsidian-950/70 border border-white/5 flex items-center justify-between">
                <span className="text-xs text-neutral-400">Total payable ({cart.length} items):</span>
                <span className="font-serif text-xl font-bold text-gold-300">{formatPrice(cartTotal)}</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gold-gradient text-obsidian-950 font-semibold text-xs uppercase tracking-[0.18em] hover:brightness-110 shadow-gold-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Payment Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Payment Gateway Selection (Demo Mode / Real Gateway Ready) */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-1">
                  Select Payment Gateway
                </h3>
                <p className="text-xs text-neutral-400 font-sans">
                  Choose your preferred payment method below.
                </p>
              </div>

              {/* Clearly Marked Demo / Integration Notice */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex gap-3 text-xs">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-champagne uppercase tracking-wider text-[11px]">
                    Payment Gateway Demo / Test Mode Active
                  </p>
                  <p className="text-neutral-300 leading-relaxed font-sans text-[11px]">
                    This checkout is built ready to plug into real payment providers like <strong>Razorpay</strong> or <strong>Stripe</strong> via server webhooks. No real money will be deducted during this live demonstration.
                  </p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                {[
                  {
                    id: 'upi_demo',
                    name: 'Instant UPI (Google Pay, PhonePe, Paytm)',
                    desc: 'Scan QR code or verify via registered UPI handle',
                    icon: QrCode,
                  },
                  {
                    id: 'cards_demo',
                    name: 'Credit / Debit Cards (Visa, Mastercard, RuPay)',
                    desc: 'Safe 256-bit encrypted card processing',
                    icon: CreditCard,
                  },
                  {
                    id: 'netbanking_demo',
                    name: 'NetBanking (HDFC, ICICI, SBI, Axis)',
                    desc: 'Direct authentication through secure banking portals',
                    icon: Building2,
                  },
                ].map((method) => {
                  const Icon = method.icon;
                  const isSelected = formData.paymentMethod === method.id;
                  return (
                    <div
                      key={method.id}
                      onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-gold-500/15 border-gold-400/70 shadow-gold-sm'
                          : 'glass-panel border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-gold-500 text-obsidian-950' : 'bg-white/5 text-neutral-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{method.name}</p>
                          <p className="text-[11px] text-neutral-400 font-sans">{method.desc}</p>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-gold-400 bg-gold-400 text-obsidian-950' : 'border-white/20'}`}>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-obsidian-950" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Final Review Table */}
              <div className="p-4 rounded-xl bg-obsidian-950/80 border border-white/5 space-y-2 text-xs font-sans">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal:</span>
                  <span className="text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Gold GST (3%):</span>
                  <span className="text-white">{formatPrice(cartGST)}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Shipping:</span>
                  <span className="text-emerald-400">FREE INSURED TRANSIT</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Amount Due:</span>
                  <span className="text-gold-300">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-4 rounded-full glass-panel hover:bg-white/10 text-neutral-300 text-xs uppercase tracking-wider font-semibold border border-white/15"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleCompleteOrder}
                  className="flex-1 py-4 rounded-full bg-gold-gradient text-obsidian-950 font-semibold text-xs sm:text-sm uppercase tracking-[0.18em] hover:brightness-110 shadow-gold-md transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Verifying Transaction with Bank...' : `Pay ${formatPrice(cartTotal)} & Confirm Order`}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Order Confirmation & Invoice Receipt */}
          {step === 3 && confirmedOrder && (
            <div className="text-center py-6 animate-fade-in space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center text-emerald-300 shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 text-champagne">
                  Order ID: {confirmedOrder.id}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-3">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-neutral-300 font-sans mt-1">
                  Thank you for placing your trust in Nathdwara Jwellery.
                </p>
              </div>

              {/* Printable Invoice Summary Card */}
              <div className="text-left p-6 rounded-2xl bg-obsidian-950/90 border border-gold-400/25 space-y-4 text-xs font-sans max-w-xl mx-auto">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <div>
                    <p className="font-serif text-base font-bold text-white">Nathdwara Jwellery Atelier</p>
                    <p className="text-[11px] text-neutral-400">Order Date: {new Date().toLocaleDateString('en-IN')}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold uppercase text-[10px]">
                    Confirmed
                  </span>
                </div>

                <div className="space-y-1.5">
                  <p className="text-neutral-400">
                    <strong className="text-white">Customer:</strong> {confirmedOrder.customer.fullName} ({confirmedOrder.customer.mobileNumber})
                  </p>
                  <p className="text-neutral-400">
                    <strong className="text-white">Shipping To:</strong> {confirmedOrder.shippingAddress.address}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} - {confirmedOrder.shippingAddress.pincode}
                  </p>
                </div>

                {/* Items */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <p className="font-semibold text-neutral-300 uppercase tracking-wider text-[11px]">
                    Purchased Jewels:
                  </p>
                  {confirmedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-neutral-300">
                      <span>
                        {it.product.name} (Qty {it.quantity}) • {it.selectedMetal}
                      </span>
                      <span className="font-medium text-white">{formatPrice(it.product.price * it.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/10 flex justify-between items-baseline font-serif text-base font-bold text-white">
                  <span>Grand Total (incl. 3% GST):</span>
                  <span className="text-gold-300 text-lg">{formatPrice(confirmedOrder.total)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={generateWhatsAppOrderSync()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Order to WhatsApp Concierge</span>
                </a>

                <button
                  onClick={handlePrint}
                  className="px-6 py-3.5 rounded-full glass-panel hover:bg-white/10 text-neutral-200 font-semibold text-xs uppercase tracking-wider border border-white/20 flex items-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4 text-gold-400" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="px-6 py-3.5 rounded-full bg-gold-500 text-obsidian-950 font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
