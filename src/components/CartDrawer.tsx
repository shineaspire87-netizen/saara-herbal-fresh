'use client';

import React from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Truck, Sparkles, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { FREE_DELIVERY_THRESHOLD } from '@/data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    originalSubtotal,
    savings,
    deliveryFee,
    finalTotal,
    amountNeededForFreeDelivery,
    freeDeliveryProgress,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-[999] overflow-hidden bg-black/65 backdrop-blur-sm transition-opacity">
      {/* Backdrop click to close */}
      <div 
        className="absolute inset-0 cursor-pointer" 
        onClick={() => setIsCartOpen(false)} 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-16 pointer-events-none">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-emerald-100 animate-slideLeft pointer-events-auto">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-emerald-900 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold font-serif leading-none">Your Cart</h2>
                <span className="text-xs text-emerald-200">{totalItems} {totalItems === 1 ? 'item' : 'items'} selected</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100">
            {amountNeededForFreeDelivery > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-700" /> Add <strong className="text-emerald-700">₹{amountNeededForFreeDelivery}</strong> more for <strong className="text-emerald-700 uppercase">Free Delivery</strong>
                  </span>
                  <span>{freeDeliveryProgress}%</span>
                </div>
                <div className="w-full bg-emerald-200/80 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${freeDeliveryProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-300">
                <Sparkles className="w-4 h-4 text-amber-500 animate-bounce" />
                <span>🎉 Unlocked! You have FREE Delivery on this order!</span>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-gray-800 font-serif">Your shopping cart is empty</h3>
                  <p className="text-xs text-gray-500 max-w-xs">
                    Choose from our 8 organic traditional rice varieties cultivated chemical-free for your health.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
                >
                  Explore Rice Collection
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const { product, quantity } = item;
                return (
                  <div key={product.id} className="py-3.5 flex gap-3 items-center">
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl bg-stone-50 border border-gray-200 overflow-hidden shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate font-serif">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-gray-500 truncate">
                        {product.subtitle} ({product.weight})
                      </p>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xs sm:text-sm font-bold text-emerald-700">
                          ₹{product.salePrice * quantity}
                        </span>
                        <span className="text-[11px] text-gray-400 line-through">
                          ₹{product.originalPrice * quantity}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          (₹{product.salePrice}/kg)
                        </span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex flex-col items-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="text-gray-400 hover:text-red-500 p-1.5 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-l active:scale-95 cursor-pointer font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-gray-800">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded-r active:scale-95 cursor-pointer font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-emerald-100 space-y-3">
              
              {/* Savings Highlight */}
              {savings > 0 && (
                <div className="bg-emerald-100/90 text-emerald-900 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between border border-emerald-200">
                  <span>🎉 Your Total Savings:</span>
                  <span className="font-extrabold text-emerald-800">₹{savings}</span>
                </div>
              )}

              {/* Bill Details */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-medium text-gray-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-emerald-950 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-base text-emerald-700">₹{finalTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold py-3.5 px-4 rounded-xl text-sm shadow-lg shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fast WhatsApp Order Confirmation & Cash/UPI on Delivery</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
