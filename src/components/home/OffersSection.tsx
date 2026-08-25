"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function OffersSection() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Column 1: Incoming Offer Text */}
          <div className="space-y-4 p-8 rounded-3xl glass-card border border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              NEW BEST OFFER
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              COMING SOON
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Experience the pinnacle of holiday luxury. Exclusive midnight champagne tastings, fireworks cruise tickets, and tailored party kits.
            </p>
            <div className="pt-2">
              <Link
                href="/deals"
                className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
              >
                <span>View Early Bird Deals</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Column 2: Center Celebration Graphic (Ellipse 1.png) */}
          <div className="flex justify-center relative">
            <div className="relative group">
              <div className="absolute -inset-3 bg-rose-500/30 rounded-full blur-2xl group-hover:scale-110 transition duration-500" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Ellipse 1.png"
                alt="Celebration Ring"
                className="relative w-64 h-64 sm:w-80 sm:h-80 object-contain rounded-full shadow-2xl transform group-hover:rotate-6 transition duration-700"
              />
            </div>
          </div>

          {/* Column 3: Year Logo & Perk Highlights (Group 96.png) */}
          <div className="space-y-4 p-8 rounded-3xl glass-card border border-white/10 text-left">
            <h3 className="text-4xl sm:text-5xl font-black text-rose-500 tracking-tight">
              2024
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Step into the new year with our AI-driven celebration tools, interactive guest books, and synchronized countdowns.
            </p>
            <div className="pt-2 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Group 96.png"
                alt="Year 2024 Celebration"
                className="w-full max-w-[200px] object-contain hover:scale-105 transition"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
