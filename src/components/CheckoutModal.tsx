'use client';

import React, { useState } from 'react';
import { X, Phone, MapPin, User, Building, Send, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CustomerDetails, OrderData } from '@/types';
import { DEFAULT_WHATSAPP_NUMBER } from '@/data/products';

interface CheckoutModalProps {
  onOrderSuccess: (orderData: OrderData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderSuccess }) => {
  const { cart, isCheckoutOpen, setIsCheckoutOpen, subtotal, deliveryFee, finalTotal, totalItems, clearCart } = useCart();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit WhatsApp number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Please enter complete delivery address';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'Please enter city / town';
    }

    const cleanPincode = formData.pincode.replace(/\D/g, '');
    if (!cleanPincode || cleanPincode.length !== 6) {
      newErrors.pincode = 'Please enter a valid 6-digit Pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CustomerDetails]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Generate unique Order Code
      const timestamp = Date.now().toString().slice(-4);
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const orderCode = `SHF-${timestamp}-${randomNum}`;

      const orderData: OrderData = {
        orderCode,
        customer: formData,
        items: cart.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          weight: item.product.weight,
          price: item.product.salePrice,
          quantity: item.quantity,
          total: item.product.salePrice * item.quantity,
        })),
        subtotal,
        deliveryFee,
        totalAmount: finalTotal,
        itemsCount: totalItems,
        createdAt: new Date().toISOString(),
      };

      // 1. Send Order to Server API / Supabase in background
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });
      } catch (apiErr) {
        console.warn('Order API sync exception, proceeding to WhatsApp directly:', apiErr);
      }

      // 2. Build WhatsApp Message
      const rawTargetPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP_NUMBER;
      const cleanTargetPhone = rawTargetPhone.replace(/\D/g, '') || DEFAULT_WHATSAPP_NUMBER;
      
      let message = `🌾 *NEW ORDER - SAARA HERBAL FRESH*\n`;
      message += `----------------------------------------\n`;
      message += `📋 *Order Code*: ${orderCode}\n`;
      message += `👤 *Customer*: ${formData.fullName.trim()}\n`;
      message += `📞 *WhatsApp*: ${formData.phone.trim()}\n`;
      message += `📍 *Delivery Address*: ${formData.address.trim()}, ${formData.city.trim()} - ${formData.pincode.trim()}\n`;
      
      if (formData.notes && formData.notes.trim()) {
        message += `📝 *Instructions*: ${formData.notes.trim()}\n`;
      }
      
      message += `----------------------------------------\n`;
      message += `📦 *ITEMS ORDERED* (${totalItems} ${totalItems === 1 ? 'pack' : 'packs'}):\n`;
      
      cart.forEach((item, index) => {
        message += `${index + 1}. *${item.product.name}* (${item.product.weight})\n`;
        message += `   Qty: ${item.quantity} x ₹${item.product.salePrice} = *₹${item.product.salePrice * item.quantity}*\n`;
      });
      
      message += `----------------------------------------\n`;
      message += `💵 *Subtotal*: ₹${subtotal}\n`;
      message += `🚚 *Delivery Fee*: ${deliveryFee === 0 ? 'FREE (Special Offer)' : `₹${deliveryFee}`}\n`;
      message += `⭐ *TOTAL PAYABLE*: *₹${finalTotal}*\n`;
      message += `----------------------------------------\n`;
      message += `✨ _Estimated Delivery: 2-3 Days (TN) | 4-5 Days (Other States)_\n\n`;
      message += `Please confirm my order and share payment details. Thank you!`;

      // 3. Launch Confetti celebration safely
      try {
        const confettiModule = await import('canvas-confetti');
        const confetti = confettiModule.default || confettiModule;
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore if canvas is unavailable
      }

      // 4. Open WhatsApp
      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${cleanTargetPhone}?text=${encodedMsg}`;
      window.open(waUrl, '_blank');

      // 5. Trigger success callback & cleanup
      setIsCheckoutOpen(false);
      clearCart();
      onOrderSuccess(orderData);
    } catch (err) {
      console.error('Error initiating order:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] overflow-y-auto bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-emerald-100 relative my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700/80 flex items-center justify-center border border-emerald-500/40">
              <Send className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif leading-none">Checkout Details</h3>
              <p className="text-xs text-emerald-200 mt-1">Instant WhatsApp Order Verification</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-emerald-800 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-6 space-y-4">
          
          {/* Order Summary Strip */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-center justify-between text-xs sm:text-sm text-emerald-900">
            <div>
              <span className="font-semibold">{totalItems} Packs selected</span>
              <p className="text-[11px] text-emerald-700">Subtotal: ₹{subtotal} + Delivery: {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-gray-500 block uppercase font-bold">Total to Pay</span>
              <span className="text-base sm:text-lg font-extrabold text-emerald-800">₹{finalTotal}</span>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                required
                placeholder="e.g. Ramesh Kumar"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 text-sm text-gray-900 rounded-xl border ${
                  errors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20'
                } outline-none transition-all`}
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
          </div>

          {/* WhatsApp Phone */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              WhatsApp Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                placeholder="e.g. 9876543210 (10 digits)"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full pl-9 pr-3 py-2.5 bg-gray-50 text-sm text-gray-900 rounded-xl border ${
                  errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20'
                } outline-none transition-all`}
              />
              <Phone className="w-4 h-4 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Complete Delivery Address (Door No, Street) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                name="address"
                required
                rows={2}
                placeholder="e.g. Flat 302, Green Avenue, Anna Nagar"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full pl-9 pr-3 py-2 bg-gray-50 text-sm text-gray-900 rounded-xl border ${
                  errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20'
                } outline-none transition-all resize-none`}
              />
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
            {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
          </div>

          {/* City & Pincode */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                City / Town <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Chennai"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full pl-9 pr-3 py-2 bg-gray-50 text-sm text-gray-900 rounded-xl border ${
                    errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20'
                  } outline-none transition-all`}
                />
                <Building className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                required
                maxLength={6}
                placeholder="e.g. 600028"
                value={formData.pincode}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 bg-gray-50 text-sm text-gray-900 rounded-xl border ${
                  errors.pincode ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20'
                } outline-none transition-all`}
              />
              {errors.pincode && <p className="text-[11px] text-red-500 mt-1">{errors.pincode}</p>}
            </div>
          </div>

          {/* Delivery Note (Optional) */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Order Instructions (Optional)
            </label>
            <input
              type="text"
              name="notes"
              placeholder="e.g. Landmark / preferred delivery time"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-50 text-xs text-gray-900 rounded-xl border border-gray-200 focus:border-emerald-600 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3 space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] active:scale-95 text-emerald-950 font-extrabold py-3.5 px-4 rounded-xl text-sm sm:text-base shadow-lg shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Preparing Your Order...</span>
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5 fill-emerald-950" />
                  <span>Order via WhatsApp (₹{finalTotal})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Secure Direct Ordering • 100% Satisfaction Guarantee</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
