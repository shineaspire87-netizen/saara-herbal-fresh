'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Plus, Minus, Check, Sparkles, Clock, Info } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity, setSelectedProductForDetail, setIsCartOpen } = useCart();
  const [isAddedAnim, setIsAddedAnim] = useState(false);

  // Find if item is currently in cart
  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, true);
    setIsAddedAnim(true);
    setTimeout(() => setIsAddedAnim(false), 1400);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantityInCart + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(product.id, quantityInCart - 1);
  };

  const savingsAmount = product.originalPrice - product.salePrice;

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-emerald-100/90 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
        {product.badge && (
          <span className="bg-red-600 text-white font-extrabold text-[11px] sm:text-xs px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase flex items-center gap-1 animate-pulse-slow">
            <Sparkles className="w-3 h-3" /> {product.badge}
          </span>
        )}
        <span className="bg-emerald-700/95 backdrop-blur-sm text-white font-semibold text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md shadow-sm">
          {product.discountPercent}% OFF
        </span>
      </div>

      {/* Weight Badge */}
      <div className="absolute top-3 right-3 z-10 pointer-events-none">
        <span className="bg-amber-100/95 text-amber-900 border border-amber-300 font-bold text-[11px] px-2 py-0.5 rounded-full shadow-sm">
          {product.weight} Pack
        </span>
      </div>

      {/* Product Image Container */}
      <div
        onClick={() => setSelectedProductForDetail(product)}
        className="relative w-full pt-[90%] bg-gradient-to-b from-stone-50 to-emerald-50/40 cursor-pointer overflow-hidden group-hover:bg-emerald-50/60 transition-colors"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Quick View Overlay on Hover (Desktop) */}
        <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center">
          <span className="bg-white/95 text-emerald-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-emerald-600" /> View Health Benefits
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Title & Subtitle */}
        <div className="space-y-1">
          <h3
            onClick={() => setSelectedProductForDetail(product)}
            className="text-base sm:text-lg font-bold text-gray-900 font-serif leading-snug hover:text-emerald-700 cursor-pointer transition-colors line-clamp-1"
          >
            {product.name}
          </h3>

          {product.tamilName && (
            <p className="text-xs text-emerald-800/85 font-medium italic">
              {product.tamilName}
            </p>
          )}

          <p className="text-xs text-gray-600 font-normal line-clamp-1">
            {product.subtitle}
          </p>
        </div>

        {/* Highlight Benefit */}
        {product.healthBenefits && product.healthBenefits.length > 0 && (
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-lg p-2 text-[11px] text-emerald-950">
            🌱 <span className="font-semibold text-emerald-900">Key Benefit:</span> {product.healthBenefits[0]}
          </div>
        )}

        {/* Estimated Delivery Info - Completely wrapped with zero truncation */}
        <div className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
          <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <p className="whitespace-normal break-words text-[11px] sm:text-xs text-emerald-800/80 leading-relaxed font-medium">
            {product.deliveryInfo}
          </p>
        </div>

        {/* Pricing Block */}
        <div className="pt-1 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-emerald-700 tracking-tight">
              ₹{product.salePrice}
            </span>
            <span className="text-xs sm:text-sm text-gray-400 line-through font-medium">
              ₹{product.originalPrice}
            </span>
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-full">
            Save ₹{savingsAmount}
          </span>
        </div>

        {/* Add To Cart & Stepper Actions */}
        <div className="pt-2">
          {quantityInCart === 0 ? (
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer ${
                isAddedAnim
                  ? 'bg-emerald-800 text-white ring-2 ring-amber-400'
                  : 'bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white shadow-emerald-700/20 hover:shadow-md'
              }`}
            >
              {isAddedAnim ? (
                <>
                  <Check className="w-4 h-4 text-amber-300 animate-bounce" />
                  <span>Added to Cart! (1)</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 rounded-xl p-1.5 shadow-sm">
              <button
                type="button"
                onClick={handleDecrement}
                className="w-9 h-9 rounded-lg bg-white text-emerald-800 hover:bg-emerald-200 active:scale-90 flex items-center justify-center font-bold text-sm shadow-sm transition-transform cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              
              <div 
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setIsCartOpen(true)}
              >
                <span className="font-bold text-xs sm:text-sm text-emerald-950 px-2">
                  {quantityInCart} in Cart
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">
                  (₹{product.salePrice * quantityInCart})
                </span>
              </div>

              <button
                type="button"
                onClick={handleIncrement}
                className="w-9 h-9 rounded-lg bg-emerald-700 text-white hover:bg-emerald-800 active:scale-90 flex items-center justify-center font-bold text-sm shadow-sm transition-transform cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
