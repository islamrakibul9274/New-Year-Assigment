"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ShoppingBag, Percent, ArrowRight } from "lucide-react";
import { triggerFestiveConfetti } from "@/components/effects/ConfettiTrigger";

export default function HolidaySale() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-amber-400">
            WHAT IS FUNCTIONAL
          </p>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            <span className="text-rose-500">HOLIDAYS</span> SALE 50%
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Curated gift sets, party decorations, and premium holiday hampers crafted to make every celebration memorable.
          </p>
        </div>

        {/* 3 Interactive Showcase Cards (Rectangle 1, Group 44, Group 75) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Card 1: Shopping Model */}
          <div className="relative group overflow-hidden rounded-3xl glass-card border border-white/10 p-6 flex flex-col items-center text-center">
            <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Rectangle 1.png"
                alt="Holiday Shopper"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                50% OFF
              </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Holiday Fashion & Gifts</h4>
            <p className="text-xs text-gray-400 mb-4">Chic partywear and celebration accessories</p>
            <Link
              href="/deals"
              className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Discount Pic (Group 44.png) */}
          <div className="relative group overflow-hidden rounded-3xl glass-card border border-amber-500/30 p-6 flex flex-col items-center text-center bg-gradient-to-b from-amber-500/10 to-transparent">
            <div className="w-full h-64 rounded-2xl flex items-center justify-center mb-4 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Group 44.png"
                alt="Discount 50%"
                className="max-h-56 object-contain group-hover:scale-110 transition duration-500 animate-bounce"
              />
            </div>
            <h4 className="text-lg font-bold text-amber-300 mb-1">Flash Discount Pass</h4>
            <p className="text-xs text-gray-400 mb-4">Instant promo savings applied at checkout</p>
            <button
              onClick={() => triggerFestiveConfetti(0.4)}
              className="px-5 py-2 rounded-full bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 transition"
            >
              Claim Promo
            </button>
          </div>

          {/* Card 3: Gift Box (Group 75.png) */}
          <div className="relative group overflow-hidden rounded-3xl glass-card border border-white/10 p-6 flex flex-col items-center text-center">
            <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 relative flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Group 75.png"
                alt="Gift Box"
                className="max-h-60 object-contain group-hover:scale-110 transition duration-500"
              />
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Midnight Gift Hamper</h4>
            <p className="text-xs text-gray-400 mb-4">Luxury chocolates, champagne & keepsakes</p>
            <Link
              href="/deals"
              className="text-xs font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1"
            >
              <span>Order Gift Box</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
