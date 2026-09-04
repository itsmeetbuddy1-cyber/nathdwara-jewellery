import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useShop();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in">
      <div className="glass-panel-gold px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-gold-400/40 text-xs sm:text-sm font-medium text-white max-w-sm">
        <div className="w-6 h-6 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center text-champagne shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
        </div>
        <span className="font-sans">{toastMessage.msg}</span>
      </div>
    </div>
  );
}
