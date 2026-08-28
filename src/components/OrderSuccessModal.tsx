'use client';

import React from 'react';
import { CheckCircle, Phone, Clock, MapPin, X } from 'lucide-react';
import { OrderData } from '@/types';
import { DEFAULT_WHATSAPP_NUMBER } from '@/data/products';

interface OrderSuccessModalProps {
  orderData: OrderData | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ orderData, onClose }) => {
  if (!orderData) return null;

  const rawTargetPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
  const cleanTargetPhone = rawTargetPhone.replace(/\D/g, '') || DEFAULT_WHATSAPP_NUMBER;

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-emerald-100 relative my-auto p-6 sm:p-8 text-center space-y-5 z-10 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-2 cursor-pointer rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10" />
        </div>

        {/* Heading */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Order Sent via WhatsApp!
          </span>
          <h3 className="text-2xl font-black text-emerald-950 font-serif pt-2">
            Thank You, {orderData.customer.fullName}!
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Your order <strong className="text-emerald-800 font-mono">#{orderData.orderCode}</strong> has been created and WhatsApp has been opened for instant confirmation.
          </p>
        </div>

        {/* Summary Details */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-left space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-stone-200">
            <span className="text-gray-500 font-medium">Order Total:</span>
            <span className="text-sm font-extrabold text-emerald-800">₹{orderData.totalAmount}</span>
          </div>

          <div className="flex items-start gap-2 text-gray-700">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">{orderData.customer.address}</span>, {orderData.customer.city} - {orderData.customer.pincode}
            </div>
          </div>

          <div className="flex items-start gap-2 text-gray-700">
            <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Estimated Delivery: <strong>2-3 Days (TN) | 4-5 Days (Other States)</strong></span>
          </div>
        </div>

        {/* Re-Open WhatsApp Button if popup was blocked */}
        <div className="space-y-2 pt-1">
          <a
            href={`https://wa.me/${cleanTargetPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-emerald-950 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <Phone className="w-4 h-4 fill-emerald-950" />
            <span>Open WhatsApp Again</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full bg-stone-100 hover:bg-stone-200 text-gray-800 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
