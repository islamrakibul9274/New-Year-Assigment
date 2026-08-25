"use client";

import React, { useState } from "react";
import Link from "next/link";
import { triggerFestiveConfetti } from "@/components/effects/ConfettiTrigger";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Globe, 
  Send, 
  Heart, 
  PartyPopper,
  CheckCircle2
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
        triggerFestiveConfetti(0.8);
      } else {
        setStatus("error");
        setMessage(data.error || "Subscription failed");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <footer className="relative z-10 bg-[#07080d] border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand & Theme */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
                <PartyPopper className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white">
                NEW YEAR <span className="text-amber-400">2024</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Step into the ultimate New Year celebration. Featuring live countdown lounges, AI resolution coaches, exclusive holiday deals, and VIP midnight gala passes.
            </p>
            <div className="flex items-center gap-3 text-xs text-amber-400/90 font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Celebrating New Beginnings Worldwide</span>
            </div>
          </div>

          {/* Column 2: Venue & Contact Info (Preserving original) */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Event Venue & Contact</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>44, Big Building Roosevelt Street, Beach Garden Florida 33410</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+00 123 584 124</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>www.newyearcelebration.com</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Explore Celebration</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/events" className="hover:text-rose-400 transition">Midnight Party & Schedule</Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-rose-400 transition">Holiday 65% OFF Deals</Link>
              </li>
              <li>
                <Link href="/ai-resolutions" className="hover:text-rose-400 transition">AI Resolution Studio</Link>
              </li>
              <li>
                <Link href="/live-lounge" className="hover:text-rose-400 transition">Real-Time Party Lounge</Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-rose-400 transition">VIP Membership Passes</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Stay In The Loop</h4>
            <p className="text-xs text-gray-400">
              Subscribe to get secret midnight discounts, VIP early passes, and AI celebration tips.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white/[0.06] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 pr-10"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-rose-500 text-white hover:bg-rose-600 transition disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {message && (
                <div className={`text-[11px] flex items-center gap-1.5 ${status === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                  {status === "success" && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Social Icons & Copyright (Preserving original) */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-rose-500/20 hover:border-rose-500 transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Facebook.png" alt="Facebook" className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-rose-500/20 hover:border-rose-500 transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Instagram.png" alt="Instagram" className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-rose-500/20 hover:border-rose-500 transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Twitter.png" alt="Twitter" className="w-4 h-4" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-rose-500/20 hover:border-rose-500 transition">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Linkedin.png" alt="Linkedin" className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <span>&copy; 2024 New Year Celebration. All Rights Reserved.</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-rose-400">
              Crafted with <Heart className="w-3 h-3 fill-rose-500" /> for the New Year
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
