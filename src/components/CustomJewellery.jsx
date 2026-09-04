import React, { useState, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Upload, CheckCircle2, MessageSquare, Phone, Mail, Image as ImageIcon, X } from 'lucide-react';

export default function CustomJewellery() {
  const { addCustomInquiry } = useShop();

  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    jewelleryType: 'Ring',
    preferredMetal: '22K Imperial Yellow Gold',
    gemstone: 'Natural Diamond',
    budget: '₹50,000 - ₹1,00,000',
    designDescription: '',
    preferredContactMethod: 'WhatsApp',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState(null);

  const fileInputRef = useRef(null);

  const jewelleryTypes = [
    'Ring',
    'Necklace / Choker',
    'Earrings / Jhumkas',
    'Bangles / Kadas',
    'Pendant',
    'Bridal Set',
    'Bracelet',
    'Other Custom Design',
  ];

  const metals = [
    '22K Imperial Yellow Gold (916)',
    '18K Royal Yellow Gold (750)',
    '18K Sunset Rose Gold',
    '950 Pure Platinum',
    '925 Sterling Silver',
  ];

  const gemstones = [
    'Natural Diamond (VVS / EF)',
    'Lab-Grown Certified Diamond',
    'Syndicate Uncut Polki & Kundan',
    'Zambian Natural Emerald',
    'Burmese Pigeon Blood Ruby',
    'Kashmir Royal Blue Sapphire',
    'Basra River Pearls',
    'No Gemstone (Solid Metal)',
  ];

  const budgetRanges = [
    'Under ₹35,000',
    '₹35,000 - ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000 - ₹5,00,000',
    '₹5,00,000 - ₹10,00,000',
    '₹10,00,000+ (Grand Heirloom)',
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit.');
        return;
      }
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.mobileNumber.trim()) {
      errs.mobileNumber = 'Please enter your mobile number';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim().replace(/\D/g, ''))) {
      errs.mobileNumber = 'Please enter a valid 10-digit Indian mobile number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.designDescription.trim()) {
      errs.designDescription = 'Please briefly describe your vision or requirements';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);
      setTimeout(() => {
        const id = addCustomInquiry({
          ...formData,
          imageName: imageFileName || 'No image attached',
          imagePreview: imagePreview || null,
        });
        setSubmittedInquiryId(id);
        setIsSubmitting(false);
      }, 700);
    }
  };

  const resetForm = () => {
    setSubmittedInquiryId(null);
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      jewelleryType: 'Ring',
      preferredMetal: '22K Imperial Yellow Gold',
      gemstone: 'Natural Diamond',
      budget: '₹50,000 - ₹1,00,000',
      designDescription: '',
      preferredContactMethod: 'WhatsApp',
    });
    removeImage();
    setErrors({});
  };

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello Nathdwara Jwellery Atelier,\n\nI have submitted a Custom Jewellery Request (${submittedInquiryId}):\n- Name: ${formData.fullName}\n- Type: ${formData.jewelleryType}\n- Metal: ${formData.preferredMetal}\n- Gemstone: ${formData.gemstone}\n- Budget: ${formData.budget}\n- Details: ${formData.designDescription}\n\nPlease share design sketches and estimate.`
    );
    return `https://wa.me/917435083922?text=${text}`;
  };

  return (
    <section id="custom-jewellery" className="py-24 bg-obsidian-950 relative overflow-hidden">
      {/* Background Motifs */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gold-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading & Copy */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-[0.25em] text-gold-400 bg-gold-500/10 border border-gold-400/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-300" />
            <span>Private Bespoke Atelier</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
            Your Imagination. Our Craftsmanship.
          </h2>

          <p className="font-serif text-lg sm:text-xl text-champagne/90 italic mb-4">
            Have something special in mind? We create customized jewellery designed especially for you.
          </p>

          <p className="text-sm sm:text-base text-neutral-300 font-sans max-w-2xl mx-auto leading-relaxed">
            Share your idea, reference image, preferred design, metal, gemstone and budget — our master karigars will help turn your vision into a beautiful, heirloom piece of jewellery.
          </p>
        </div>

        {/* Custom Jewellery Interactive Form Card */}
        <div className="max-w-4xl mx-auto rounded-3xl glass-panel border border-gold-400/30 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {submittedInquiryId ? (
            /* Submission Success State */
            <div className="text-center py-12 px-4 flex flex-col items-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center text-champagne mb-6 shadow-gold-md">
                <CheckCircle2 className="w-10 h-10 text-gold-300" />
              </div>

              <span className="px-3.5 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-white/5 border border-white/10 text-champagne mb-4">
                Inquiry Ref: {submittedInquiryId}
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
                Thank you!
              </h3>

              <p className="text-lg text-champagne/90 font-serif mb-4">
                Your custom jewellery request has been received. Our team will contact you shortly.
              </p>

              <p className="text-sm text-neutral-300 max-w-md mx-auto mb-8 font-sans">
                Our head karigar will review your preferences ({formData.jewelleryType} in {formData.preferredMetal}) and connect via {formData.preferredContactMethod} within 24 business hours.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Details Directly on WhatsApp</span>
                </a>

                <button
                  onClick={resetForm}
                  className="px-6 py-3.5 rounded-full glass-panel hover:bg-white/10 text-neutral-300 text-xs uppercase tracking-wider font-medium border border-white/20 transition-all"
                >
                  Submit Another Design Request
                </button>
              </div>
            </div>
          ) : (
            /* Custom Design Request Form */
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Full Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Maharani Gayatri Devi"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                      errors.fullName ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.fullName && <p className="text-rose-400 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Mobile Number <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 7435083922"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                      errors.mobileNumber ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.mobileNumber && <p className="text-rose-400 text-xs mt-1">{errors.mobileNumber}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Email Address <span className="text-neutral-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. client@nathdwara.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-white/10'
                    }`}
                  />
                  {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Jewellery Type */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Jewellery Type <span className="text-gold-400">*</span>
                  </label>
                  <select
                    value={formData.jewelleryType}
                    onChange={(e) => setFormData({ ...formData, jewelleryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    {jewelleryTypes.map((t) => (
                      <option key={t} value={t} className="bg-obsidian-900 text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Metal */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Preferred Metal <span className="text-gold-400">*</span>
                  </label>
                  <select
                    value={formData.preferredMetal}
                    onChange={(e) => setFormData({ ...formData, preferredMetal: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    {metals.map((m) => (
                      <option key={m} value={m} className="bg-obsidian-900 text-white">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gemstone */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Gemstone Preference <span className="text-gold-400">*</span>
                  </label>
                  <select
                    value={formData.gemstone}
                    onChange={(e) => setFormData({ ...formData, gemstone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    {gemstones.map((g) => (
                      <option key={g} value={g} className="bg-obsidian-900 text-white">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Approximate Budget */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Approximate Budget <span className="text-gold-400">*</span>
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border border-white/10 text-white text-sm focus:outline-none focus:border-gold-400 transition-colors"
                  >
                    {budgetRanges.map((b) => (
                      <option key={b} value={b} className="bg-obsidian-900 text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'WhatsApp', icon: MessageSquare },
                      { id: 'Phone Call', icon: Phone },
                      { id: 'Email', icon: Mail },
                    ].map((method) => {
                      const Icon = method.icon;
                      const selected = formData.preferredContactMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, preferredContactMethod: method.id })}
                          className={`py-3 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                            selected
                              ? 'bg-gold-500 text-obsidian-950 border-gold-400 shadow-gold-sm'
                              : 'glass-panel text-neutral-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{method.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Design Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                  Design Description & Your Vision <span className="text-gold-400">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe details such as ring size, motif inspiration (e.g. peacock, lotus, contemporary halo), engraving wishes, or specific heirloom stones you wish to incorporate..."
                  value={formData.designDescription}
                  onChange={(e) => setFormData({ ...formData, designDescription: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl bg-obsidian-950/80 border text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-gold-400 transition-colors ${
                    errors.designDescription ? 'border-rose-500' : 'border-white/10'
                  }`}
                />
                {errors.designDescription && (
                  <p className="text-rose-400 text-xs mt-1">{errors.designDescription}</p>
                )}
              </div>

              {/* Upload Reference Image */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-neutral-300 mb-2">
                  Upload Reference Image or Sketch <span className="text-neutral-500 font-normal">(PNG, JPG, WEBP up to 10MB)</span>
                </label>

                {imagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gold-400/40 p-2 bg-obsidian-950/80 flex items-center gap-4">
                    <img
                      src={imagePreview}
                      alt="Uploaded preview"
                      className="w-20 h-20 object-cover rounded-xl border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{imageFileName}</p>
                      <p className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-3 h-3" /> Ready for Karigar Review
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/15 hover:border-gold-400/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-obsidian-950/40 hover:bg-obsidian-950/80"
                  >
                    <Upload className="w-8 h-8 text-gold-400/80 mx-auto mb-2" />
                    <p className="text-xs text-neutral-300 font-medium">
                      Click to upload or drag & drop reference jewellery photo
                    </p>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Screenshots, sketches, or real jewellery photos welcome
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full bg-gold-gradient text-obsidian-950 font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-300 shadow-gold-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isSubmitting ? 'Registering Custom Request...' : 'Request Custom Jewellery'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
