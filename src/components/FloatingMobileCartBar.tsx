'use client';

import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const FloatingMobileCartBar: React.FC = () => {
  const { totalItems, finalTotal, setIsCartOpen, isMounted } = useCart();

  if (!isMounted || totalItems === 0) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-emerald-200 shadow-2xl animate-slideUp">
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white rounded-2xl py-3 px-4 flex items-center justify-between shadow-lg shadow-emerald-800/30 transition-transform font-medium cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-amber-300 font-bold text-xs">
            {totalItems}
          </div>
          <div className="text-left">
            <span className="text-xs text-emerald-200 block font-normal leading-none">View Bag</span>
            <span className="text-sm font-extrabold font-serif">₹{finalTotal}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider bg-emerald-600/60 px-3 py-1.5 rounded-xl border border-emerald-400/30">
          <span>Checkout</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
