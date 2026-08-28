'use client';

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin, Heart, ShieldCheck, Leaf, Sparkles } from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER } from '@/data/products';

export const Footer: React.FC = () => {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;

  return (
    <footer className="bg-emerald-950 text-white pt-12 pb-24 md:pb-12 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-emerald-900/80">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500 bg-white">
                <Image
                  src="/images/logo.webp"
                  alt="Saara Herbal Fresh"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold font-serif text-white leading-none block">
                  Saara Herbal Fresh
                </span>
                <span className="text-xs text-amber-300 font-medium">
                  Traditional & Organic Rice Brand
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed max-w-md font-light">
              Dedicated to reviving ancient South Indian paddy varieties (Kavuni, Karunkuruvai, Poongar, Kuzhiyadechan, Thooyamalli). 100% naturally farmed, chemical-free, handpounded grains for healthy families.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-emerald-300">
              <span className="bg-emerald-900/80 border border-emerald-700/50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <Leaf className="w-3 h-3 text-amber-400" /> 100% Organic
              </span>
              <span className="bg-emerald-900/80 border border-emerald-700/50 px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Direct from Farmers
              </span>
            </div>
          </div>

          {/* Varieties */}
          <div>
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
              Heritage Varieties
            </h4>
            <ul className="space-y-1.5 text-xs text-emerald-200/80">
              <li>• Kuzhiyadechan Red Rice (1kg)</li>
              <li>• Karunkuruvai Handpounded Rice (1kg)</li>
              <li>• Pure Thooyamalli Jasmine Rice (1kg)</li>
              <li>• Organic Sivappu Kavuni Rice (1kg)</li>
              <li>• Farm Fresh Sona Masoori Rice (1kg)</li>
              <li>• Soorakuruvai Ancient Rice (1kg)</li>
              <li>• Kudavalai Heritage Rice (1kg)</li>
              <li>• Hand Pounded Poongar Rice (1kg)</li>
            </ul>
          </div>

          {/* Quick Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3">
              Order Support
            </h4>
            
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-emerald-100 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: +{whatsappNumber}</span>
            </a>

            <div className="flex items-start gap-2 text-xs text-emerald-200/80">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Organic Paddy Farms & Heritage Distribution, Tamil Nadu, India</span>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-amber-300/90 block font-medium">
                ⚡ Fast Doorstep Dispatch within 24 Hours
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/60 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Saara Herbal Fresh. All rights reserved. Traditional Organic Rice.</p>
          <p className="flex items-center gap-1 justify-center">
            Cultivated with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> by Traditional Indian Farmers
          </p>
        </div>

      </div>
    </footer>
  );
};
