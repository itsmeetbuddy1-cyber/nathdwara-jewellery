import React, { useState } from 'react';
import { Phone, Mail, MessageSquare, Send, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [form, setForm] = useState({
    name: '',
    mobileNumber: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Please enter your name';
    if (!form.mobileNumber.trim()) {
      errs.mobileNumber = 'Please enter your mobile number';
    } else if (!/^[6-9]\d{9}$/.test(form.mobileNumber.trim().replace(/\D/g, ''))) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!form.message.trim()) errs.message = 'Please enter your message or inquiry';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 700);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setForm({ name: '', mobileNumber: '', email: '', message: '' });
    setErrors({});
  };

  const whatsappMessage = encodeURIComponent(
    'Hello Nathdwara Jwellery, I would like to enquire about your jewellery collection.'
  );
  const whatsappUrl = `https://wa.me/917435083922?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-24 bg-obsidian-900/80 border-t border-gold-400/15 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-gold-400 bg-gold-500/10 border border-gold-400/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span>Atelier Concierge</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Connect with Nathdwara Jwellery
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed">
            Our master jewellers and design consultants are at your service for personal advice, custom designs, and order inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Contact Card & Direct Buttons */}
          <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-gold-400/30 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-gold-400 block mb-2">
                Official Contact Desk
              </span>
              <h3 className="font-serif text-3xl font-bold text-white mb-6">
                Nathdwara Jwellery
              </h3>

              {/* Direct Info List */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-champagne shrink-0">
                    <Phone className="w-5 h-5 text-gold-300" />
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-sans">
                      Phone Concierge
                    </p>
                    <a
                      href="tel:7435083922"
                      className="text-lg font-serif font-bold text-white hover:text-champagne transition-colors"
                    >
                      7435083922
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-champagne shrink-0">
                    <Mail className="w-5 h-5 text-gold-300" />
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-sans">
                      Email Inquiries
                    </p>
                    <a
                      href="mailto:msoni04062006@gmail.com"
                      className="text-base font-medium text-white hover:text-champagne transition-colors break-all"
                    >
                      msoni04062006@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-champagne shrink-0">
                    <Clock className="w-5 h-5 text-gold-300" />
                  </div>
                  <div>
                    <p className="text-[11px] text-neutral-400 uppercase tracking-wider font-sans">
                      Atelier Hours
                    </p>
                    <p className="text-sm text-neutral-300 font-sans">
                      Mon - Sat: 10:30 AM – 8:30 PM IST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">
                Instant Communication:
              </p>

              {/* WhatsApp Us Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                {/* Call Us Button */}
                <a
                  href="tel:7435083922"
                  className="py-3 rounded-xl bg-gold-500/15 hover:bg-gold-500 text-champagne hover:text-obsidian-950 border border-gold-400/40 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>

                {/* Email Us Button */}
                <a
                  href="mailto:msoni04062006@gmail.com?subject=Enquiry%20-%20Nathdwara%20Jwellery"
                  className="py-3 rounded-xl glass-panel hover:bg-white/10 text-neutral-200 border border-white/20 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: "Have a Question?" Contact Form */}
          <div className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-gold-400/25 shadow-2xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Have a Question?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-sans mb-8">
              Send us an inquiry and our team will get back to you with custom estimates and recommendations.
            </p>

            {isSuccess ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white mb-2">
                  Enquiry Received!
                </h4>
                <p className="text-sm text-neutral-300 max-w-sm mb-6 font-sans">
                  Thank you, {form.name}. Our concierge team will review your query and contact you at {form.mobileNumber} promptly.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full bg-gold-500 text-obsidian-950 text-xs uppercase tracking-wider font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                      Your Name <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vikramaditya Singh"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                        errors.name ? 'border-rose-500' : 'border-white/10'
                      }`}
                    />
                    {errors.name && <p className="text-rose-400 text-xs mt-1">{errors.name}</p>}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                      Mobile Number <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 7435083922"
                      value={form.mobileNumber}
                      onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                        errors.mobileNumber ? 'border-rose-500' : 'border-white/10'
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p className="text-rose-400 text-xs mt-1">{errors.mobileNumber}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Email Address <span className="text-neutral-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. client@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Message <span className="text-gold-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the design, occasion, ring size, or any specific questions you have..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                      errors.message ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.message && <p className="text-rose-400 text-xs mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gold-gradient text-obsidian-950 font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-300 shadow-gold-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
