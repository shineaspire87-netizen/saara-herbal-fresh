'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroBanner } from '@/components/HeroBanner';
import { TrustBadges } from '@/components/TrustBadges';
import { ProductGrid } from '@/components/ProductGrid';
import { CartDrawer } from '@/components/CartDrawer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { OrderSuccessModal } from '@/components/OrderSuccessModal';
import { ProductDetailModal } from '@/components/ProductDetailModal';
import { FloatingMobileCartBar } from '@/components/FloatingMobileCartBar';
import { Footer } from '@/components/Footer';
import { OrderData } from '@/types';
import { Sparkles, HeartPulse, CheckCircle, ShieldCheck, Leaf, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Home() {
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);
  const { setSelectedCategory } = useCart();

  const handleOrderSuccess = (order: OrderData) => {
    setCompletedOrder(order);
  };

  return (
    <main className="flex-1 flex flex-col bg-[#faf8f5]">
      {/* 1. Sticky Navigation */}
      <Header />

      {/* 2. Hero Banner */}
      <HeroBanner />

      {/* 3. Value Proposition / Trust Badges */}
      <TrustBadges />

      {/* 4. Main Products Catalog */}
      <ProductGrid />

      {/* 5. Health Benefits & Heritage Rice Guide */}
      <section id="benefits" className="py-12 sm:py-16 bg-gradient-to-b from-emerald-900 to-emerald-950 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-700">
              Ancient Wisdom & Wellness
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif pt-1 text-white">
              Why Choose Heritage Unpolished Rice?
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-light">
              Unlike commercial polished white rice that loses 90% of its vitamins and fiber during factory processing, our organic heritage grains preserve their complete nutritional value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-3 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-amber-300">Natural Diabetes & Heart Care</h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Slow-release complex carbohydrates with a low glycemic index help maintain steady blood sugar levels without sudden insulin spikes.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-3 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center font-bold">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-emerald-300">Immunity & Stamina</h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Rich in Anthocyanin pigments, natural iron, zinc, and magnesium that nourish hemoglobin, fortify joints, and combat cellular fatigue.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md space-y-3 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-serif text-amber-300">Women & Family Health</h3>
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Varieties like Poongar and Kuzhiyadechan are traditionally prescribed in Tamil households for hormonal balance, postnatal strength, and lactation.
              </p>
            </div>

          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => {
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-transform active:scale-95"
            >
              <span>Order Traditional Rice for Your Family</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. Modals & Overlays */}
      <CartDrawer />
      <CheckoutModal onOrderSuccess={handleOrderSuccess} />
      <OrderSuccessModal orderData={completedOrder} onClose={() => setCompletedOrder(null)} />
      <ProductDetailModal />

      {/* 7. Mobile Floating Cart Bar */}
      <FloatingMobileCartBar />

      {/* 8. Footer */}
      <Footer />
    </main>
  );
}
