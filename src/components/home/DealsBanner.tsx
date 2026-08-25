"use client";

import React from "react";
import Link from "next/link";
import { Gift, Tag, ArrowUpRight, Zap } from "lucide-react";
import { triggerFestiveConfetti } from "@/components/effects/ConfettiTrigger";

export default function DealsBanner() {
  return (
    <section className="py-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl glass-card border border-rose-500/30 p-8 sm:p-12 lg:p-16">
          {/* Background Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-extrabold uppercase tracking-wider">
                <Tag className="w-3.5 h-3.5" />
                <span>Special Holiday Deals</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-5xl sm:text-7xl font-black tracking-tight text-white">
                  <span className="text-rose-500 text-glow-red">65%</span> OFF
                </h2>
                <p className="text-xl sm:text-2xl font-bold tracking-wide text-amber-300">
                  OUR HOLIDAY DEALS ARE BETTER
                </p>
                <h3 className="text-base sm:text-lg uppercase tracking-widest text-gray-300 font-semibold">
                  ALL CATEGORIES & GIFT PACKS
                </h3>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-xl">
                Unwrap exceptional discounts across holiday hampers, fireworks bundles, party supplies, and VIP gala tickets. Use promo code <span className="font-mono text-amber-300 bg-black/40 px-2 py-1 rounded border border-amber-400/30 font-bold">NYE2024</span> at checkout!
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/deals"
                  onClick={() => triggerFestiveConfetti(0.4)}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/25 hover:opacity-95 transition"
                >
                  <Gift className="w-4 h-4" />
                  <span>Shop Holiday Deals</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/pricing"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/15 text-white font-semibold text-sm border border-white/15 transition"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Get VIP Pass</span>
                </Link>
              </div>
            </div>

            {/* Right Graphic Banner */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-rose-500 to-amber-500 rounded-3xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/New Year Photo.png"
                  alt="New Year 65% OFF Deals"
                  className="relative rounded-2xl w-full max-w-md object-cover shadow-2xl border border-white/20 transform group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
