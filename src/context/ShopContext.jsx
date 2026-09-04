import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Cart state persisted to LocalStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('nj_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to LocalStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('nj_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Custom Inquiries persisted to LocalStorage (Admin ready)
  const [customInquiries, setCustomInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('nj_custom_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders persisted to LocalStorage (Admin ready)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('nj_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Drawer & Modal States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('nj_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('nj_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('nj_custom_inquiries', JSON.stringify(customInquiries));
    } catch (e) {
      console.error(e);
    }
  }, [customInquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('nj_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Toast notification helper
  const showToast = (msg, type = 'gold') => {
    setToastMessage({ msg, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((current) => (current?.msg === msg ? null : current));
    }, 3500);
  };

  // Cart operations
  const addToCart = (product, quantity = 1, options = {}) => {
    const size = options.size || (product.sizes ? product.sizes[0] : 'Standard');
    const metal = options.metal || product.metalType;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedMetal === metal
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { product, quantity, selectedSize: size, selectedMetal: metal }];
      }
    });

    showToast(`Added "${product.name}" to your cart`);
  };

  const removeFromCart = (productId, selectedSize, selectedMetal) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedMetal === selectedMetal
          )
      )
    );
  };

  const updateQuantity = (productId, selectedSize, selectedMetal, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedMetal === selectedMetal
          ) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => setCart([]);

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to wishlist`);
    }
  };

  const isInWishlist = (productId) => wishlist.some((item) => item.id === productId);

  // Custom design inquiry submission
  const addCustomInquiry = (data) => {
    const inquiryId = `NJ-REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const newInquiry = {
      ...data,
      id: inquiryId,
      createdAt: new Date().toISOString(),
      status: 'Under Review by Master Karigar',
    };
    setCustomInquiries((prev) => [newInquiry, ...prev]);

    // Celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#FFF3D1', '#AA7C11', '#FFFFFF'],
    });

    return inquiryId;
  };

  // Order placement
  const placeOrder = (orderData) => {
    const orderId = `NJ-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      ...orderData,
      id: orderId,
      items: [...cart],
      subtotal: cartSubtotal,
      gst: cartGST,
      shipping: 0,
      total: cartTotal,
      createdAt: new Date().toISOString(),
      paymentStatus: 'Payment Verified (Demo / Razorpay Ready)',
      orderStatus: 'Confirmed & In Secure Vault Preparation',
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#FAF7F2', '#AA7C11', '#E5C378'],
    });

    return newOrder;
  };

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartGST = Math.round(cartSubtotal * 0.03); // 3% GST on Gold Jewellery in India
  const cartTotal = cartSubtotal + cartGST;
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Indian Rupee currency formatter
  const formatPrice = (amount) => {
    if (amount === undefined || amount === null) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartGST,
        cartTotal,
        totalCartItems,
        wishlist,
        toggleWishlist,
        isInWishlist,
        customInquiries,
        addCustomInquiry,
        orders,
        placeOrder,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAdminOpen,
        setIsAdminOpen,
        quickViewProduct,
        setQuickViewProduct,
        formatPrice,
        showToast,
        toastMessage,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
