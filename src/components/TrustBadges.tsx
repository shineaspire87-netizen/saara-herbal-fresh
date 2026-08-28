'use client';

import React from 'react';
import { Leaf, ShieldCheck, Truck, Sparkles, HeartHandshake } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  const badges = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      title: '100% Traditional & Organic',
      desc: 'No chemical polishing or synthetic preservatives.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-amber-600" />,
      title: 'Direct Farmer Fair Trade',
      desc: 'Sourced from organic paddy farmers in Tamil Nadu.',
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      title: 'Fast Doorstep Delivery',
      desc: '2-3 Days in Tamil Nadu | 4-5 Days Other States.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Siddha & Ayurvedic Value',
      desc: 'Rich in antioxidants, natural iron, zinc & fiber.',
    },
  ];

  return (
    <section className="bg-emerald-50/70 border-y border-emerald-100/80 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {badges.map((b, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 bg-white p-3.5 sm:p-4 rounded-xl border border-emerald-100/70 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-2.5 rounded-lg bg-emerald-50 shrink-0">
              {b.icon}
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-snug">
                {b.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-gray-600 mt-0.5 leading-relaxed">
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
