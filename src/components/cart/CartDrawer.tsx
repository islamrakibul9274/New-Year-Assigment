"use client";

import React, { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { 
  ShoppingCart, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Sparkles, 
  Tag, 
  ArrowRight, 
  CheckCircle2, 
  Gift 
} from "lucide-react";
import { triggerFestiveConfetti } from "@/components/effects/ConfettiTrigger";

export default function CartDrawer() {
  const { 
    items, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQty, 
    clearCart, 
    subtotal, 
    discountAmount, 
    total, 
    appliedCoupon, 
    couponCode, 
    applyCoupon 
  } = useCart();

  const [inputCode, setInputCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const success = applyCoupon(inputCode);
    if (!success) {
      setCouponError("Invalid promo code. Try FESTIVE15 or HOLIDAY50");
    } else {
      setInputCode("");
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      triggerFestiveConfetti(0.5);
      clearCart();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-[#0d0f19] h-full p-6 flex flex-col justify-between border-l border-white/15 shadow-2xl relative animate-in slide-in-from-right duration-300"
      >
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/30">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Your Holiday Bag</h3>
                <p className="text-[10px] text-gray-400">
                  {items.length} unique item{items.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setCheckoutSuccess(false);
              }}
              className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-gray-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Container */}
          <div className="py-4 space-y-3 max-h-[50vh] overflow-y-auto pr-1">
            {checkoutSuccess ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Holiday Order Placed!</h4>
                <p className="text-xs text-gray-300 max-w-xs mx-auto leading-relaxed">
                  Your festive gift pack has been confirmed and scheduled for delivery before New Year&apos;s Eve!
                </p>
                <button
                  onClick={() => {
                    setCheckoutSuccess(false);
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-2.5 rounded-full bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition"
                >
                  Continue Celebrating
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-14 space-y-3">
                <div className="w-14 h-14 rounded-full bg-white/[0.04] flex items-center justify-center mx-auto text-gray-500">
                  <Gift className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-gray-300">Your bag is empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our Holiday Deals & Awesome Gift Portfolio to add celebration hampers and fireworks!
                </p>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-white/10 transition"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-black/40 border border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-black text-rose-400 font-mono">
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      {item.discount && (
                        <span className="text-[9px] font-bold text-amber-400 bg-amber-500/15 px-1.5 py-0.2 rounded">
                          {item.discount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-white/[0.06] rounded-xl p-1 border border-white/5">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="p-1 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white"
                      title="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-white font-mono px-1">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="p-1 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white"
                      title="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Checkout & Promo Section */}
        {items.length > 0 && (
          <div className="border-t border-white/10 pt-4 space-y-3">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Coupon code (FESTIVE15)"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 uppercase focus:outline-none focus:border-rose-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/15 text-white text-xs font-bold transition"
                >
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-[10px] text-rose-400 font-semibold">{couponError}</p>
              )}
              {appliedCoupon && (
                <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Promo code {couponCode} applied successfully!</span>
                </p>
              )}
            </form>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-gray-300 pt-2 border-t border-white/5">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-400">
                  <span>Holiday Promo Discount</span>
                  <span className="font-mono font-bold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Festive Express Delivery</span>
                <span className="text-emerald-400 font-bold uppercase text-[10px]">FREE</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                <span>Grand Total</span>
                <span className="text-amber-400 font-mono text-lg">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-rose-500/30 hover:opacity-95 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCheckingOut ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <span>Complete Holiday Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
