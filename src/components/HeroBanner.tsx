'use client';

import React from 'react';
import { Leaf, ShieldCheck, Truck, Sparkles, HeartPulse, Award } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 text-white pt-8 pb-12 sm:pt-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6 text-center lg:text-left">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 bg-emerald-700/60 border border-emerald-400/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs sm:text-sm text-emerald-100 shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-amber-300" />
              <span className="font-semibold text-white">100% Traditional & Organic Rice</span>
              <span className="text-emerald-300 hidden sm:inline">• Direct Farmer Sourced</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight leading-tight sm:leading-snug text-white">
              Rediscover Ancient Grains for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-200">
                Natural Immunity & Vitality
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-emerald-100 text-sm sm:text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Experience the pure healing power of South India’s unpolished heritage rice—Karunkuruvai, Sivappu Kavuni, Poongar, Kuzhiyadechan, and Thooyamalli. Cultivated chemical-free with rich natural bran layers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={scrollToProducts}
                className="bg-amber-400 hover:bg-amber-300 active:scale-95 text-emerald-950 font-bold px-6 py-3 rounded-full text-sm sm:text-base shadow-lg shadow-amber-400/20 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-900" />
                <span>Explore 8 Heritage Rice</span>
              </button>

              <a
                href="#benefits"
                className="bg-emerald-800/80 hover:bg-emerald-700 active:scale-95 text-white border border-emerald-500/30 px-5 py-3 rounded-full text-sm sm:text-base transition-all font-medium flex items-center gap-2"
              >
                <HeartPulse className="w-4 h-4 text-emerald-300" />
                <span>Health Benefits</span>
              </a>
            </div>

            {/* Quick Micro Badges */}
            <div className="pt-4 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 text-center">
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                <p className="text-amber-300 font-bold text-base sm:text-xl">8</p>
                <p className="text-[11px] sm:text-xs text-emerald-200">Heritage Varieties</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                <p className="text-amber-300 font-bold text-base sm:text-xl">100%</p>
                <p className="text-[11px] sm:text-xs text-emerald-200">Unpolished & Pure</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-2 sm:p-2.5 backdrop-blur-sm">
                <p className="text-amber-300 font-bold text-base sm:text-xl">2-3 Days</p>
                <p className="text-[11px] sm:text-xs text-emerald-200">Fast Delivery</p>
              </div>
            </div>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-emerald-400/20 shadow-2xl relative">
              <div className="absolute -top-3 -right-3 bg-amber-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                Limited Sale
              </div>

              <div className="flex items-center gap-2 text-amber-300 font-semibold text-sm mb-3">
                <Award className="w-4 h-4" />
                <span>Why Saara Herbal Fresh?</span>
              </div>

              <ul className="space-y-3 text-xs sm:text-sm text-emerald-50">
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 font-bold">✓</div>
                  <span><strong>Naturally Rich in Minerals</strong> - Handpounded & unpolished with intact aleurone layer.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 font-bold">✓</div>
                  <span><strong>Low Glycemic Index</strong> - Safe & wholesome for diabetic nutrition.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 font-bold">✓</div>
                  <span><strong>Direct From Organic Farms</strong> - Ensuring fair prices to traditional paddy growers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5 font-bold">✓</div>
                  <span><strong>Fast WhatsApp Checkout</strong> - Direct doorstep ordering in under 30 seconds.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
