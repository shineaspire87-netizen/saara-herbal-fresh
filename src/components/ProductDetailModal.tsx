'use client';

import React from 'react';
import Image from 'next/image';
import { X, Sparkles, Clock, CheckCircle2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductForDetail, setSelectedProductForDetail, cart, addToCart, updateQuantity, setIsCartOpen } = useCart();

  if (!selectedProductForDetail) return null;

  const product = selectedProductForDetail;
  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleClose = () => {
    setSelectedProductForDetail(null);
  };

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0 cursor-pointer" onClick={handleClose} />

      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-emerald-100 relative my-auto z-10 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-gray-100 text-gray-700 flex items-center justify-center shadow-md border border-gray-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image Side */}
          <div className="relative bg-gradient-to-b from-stone-100 to-emerald-50/50 p-6 flex items-center justify-center min-h-[260px] sm:min-h-[380px]">
            <div className="relative w-full h-64 sm:h-80">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>

            <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
              <span className="bg-red-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                {product.badge || 'Sale!'}
              </span>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs px-2.5 py-0.5 rounded-full">
                {product.weight}
              </span>
            </div>
          </div>

          {/* Details Side */}
          <div className="p-5 sm:p-6 flex flex-col justify-between space-y-4">
            
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                {product.category}
              </span>

              <h3 className="text-xl sm:text-2xl font-bold text-emerald-950 font-serif leading-tight">
                {product.name}
              </h3>

              {product.tamilName && (
                <p className="text-xs text-emerald-800 font-medium italic">
                  {product.tamilName}
                </p>
              )}

              <p className="text-xs sm:text-sm text-gray-600">
                {product.subtitle}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  ₹{product.salePrice}
                </span>
                <span className="text-sm sm:text-base text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">
                  {product.discountPercent}% OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed pt-1">
                {product.description}
              </p>

              {/* Health Benefits List */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Health & Wellness Benefits:
                </h4>
                <ul className="space-y-1.5">
                  {product.healthBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Delivery notice */}
              <div className="mt-3 flex items-start gap-2 text-[11px] text-gray-700 bg-stone-100 p-2.5 rounded-xl border border-stone-200">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span className="whitespace-normal break-words leading-relaxed font-medium">{product.deliveryInfo}</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              {quantityInCart === 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, 1, true);
                    handleClose();
                  }}
                  className="flex-1 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>
              ) : (
                <div className="flex-1 flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl p-1.5">
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                    className="w-9 h-9 rounded-lg bg-white text-emerald-800 hover:bg-emerald-200 active:scale-90 flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm text-emerald-950">
                    {quantityInCart} in Cart
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                    className="w-9 h-9 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 active:scale-90 flex items-center justify-center font-bold text-sm shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  if (quantityInCart === 0) {
                    addToCart(product, 1, false);
                  }
                  handleClose();
                  setIsCartOpen(true);
                }}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-emerald-950 font-bold py-3 px-4 rounded-xl text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
              >
                Checkout Now
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
