'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Search, Phone, Sparkles, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { DEFAULT_WHATSAPP_NUMBER } from '@/data/products';

export const Header: React.FC = () => {
  const { totalItems, setIsCartOpen, searchQuery, setSearchQuery, isMounted } = useCart();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
      {/* Top Notification Bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white text-xs sm:text-sm py-1.5 px-3 text-center flex items-center justify-center gap-2 font-medium tracking-wide">
        <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-amber-300/30">
          <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" /> Sale Live
        </span>
        <span className="hidden sm:inline">100% Traditional Organic Rice Direct From Farmers •</span>
        <span>Free Delivery on Orders Above ₹500! 🚚</span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none cursor-pointer">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-emerald-600 shadow-sm transition-transform duration-300 group-hover:scale-105 bg-emerald-50 shrink-0">
              <Image
                src="/images/logo.webp"
                alt="Saara Herbal Fresh Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-emerald-900 font-serif leading-none">
                  Saara Herbal Fresh
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 uppercase tracking-widest mt-0.5">
                Traditional & Organic Rice
              </span>
            </div>
          </a>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search traditional rice (e.g., Kavuni, Poongar, Kuzhiyadechan)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-emerald-50/50 hover:bg-emerald-50/80 focus:bg-white text-sm text-gray-800 placeholder-emerald-700/60 rounded-full border border-emerald-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
              <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="md:hidden p-2 text-emerald-800 hover:bg-emerald-50 rounded-full transition-colors cursor-pointer"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Quick WhatsApp Support Link */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%20Saara%20Herbal%20Fresh,%20I%20have%20an%20inquiry%20about%20traditional%20rice.`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 px-3 py-2 rounded-full transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Help & WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              id="header-cart-button"
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-md shadow-emerald-700/20 transition-all font-medium text-sm cursor-pointer"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              
              {isMounted && totalItems > 0 && (
                <span className="bg-amber-400 text-emerald-950 font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center -mr-1 animate-pulse shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expansion */}
        {isSearchVisible && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                autoFocus
                placeholder="Search rice varieties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 bg-emerald-50 text-sm text-gray-800 placeholder-emerald-700/60 rounded-xl border border-emerald-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none"
              />
              <Search className="w-4 h-4 text-emerald-700 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
