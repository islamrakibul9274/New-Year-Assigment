"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useCart } from "@/components/providers/CartProvider";
import { triggerFestiveConfetti } from "@/components/effects/ConfettiTrigger";
import { 
  Sparkles, 
  PartyPopper, 
  Calendar, 
  Gift, 
  BrainCircuit, 
  CreditCard, 
  Radio, 
  User as UserIcon, 
  LogOut, 
  LogIn,
  Menu, 
  X,
  Crown,
  ChevronDown,
  ShoppingCart
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "Events & RSVP", href: "/events", icon: Calendar },
    { name: "Deals & Gifts", href: "/deals", icon: Gift },
    { name: "AI Studio", href: "/ai-resolutions", icon: BrainCircuit },
    { name: "VIP Pricing", href: "/pricing", icon: CreditCard },
    { name: "Live Lounge", href: "/live-lounge", icon: Radio, badge: "LIVE" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0b0d14]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-2.5 sm:py-3"
          : "bg-gradient-to-b from-[#0b0d14]/90 via-[#0b0d14]/40 to-transparent py-3.5 sm:py-5"
      }`}
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" suppressHydrationWarning>
        <div className="flex items-center justify-between gap-3 sm:gap-6" suppressHydrationWarning>
          
          {/* ================= BRAND LOGO & TITLE ================= */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group select-none py-1"
            onClick={() => triggerFestiveConfetti(0.2)}
          >
            {/* Logo Icon with Glowing Border */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-400 p-[1.5px] shadow-lg shadow-rose-500/25 group-hover:shadow-rose-500/40 group-hover:scale-105 transition-all duration-300 shrink-0">
              <div className="w-full h-full bg-[#0e111d] rounded-[14px] flex items-center justify-center">
                <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping opacity-75" />
            </div>

            {/* Typography with clean alignment & justification */}
            <div className="flex flex-col justify-center text-left">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-sm sm:text-base tracking-tight text-white uppercase whitespace-nowrap">
                  NEW YEAR
                </span>
                <span className="font-extrabold text-[11px] text-amber-300 font-mono px-1.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/30 whitespace-nowrap leading-none">
                  2026
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-bold text-rose-400 mt-1 leading-none whitespace-nowrap">
                Celebration Hub
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION LINKS ================= */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-lg shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white shadow-md shadow-rose-500/25 font-bold"
                      : "text-gray-300 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-gray-400"}`} />
                  <span className="whitespace-nowrap shrink-0">{link.name}</span>
                  {link.badge && (
                    <span className="bg-rose-500 text-white text-[9px] px-1.5 py-0.2 rounded-full font-extrabold uppercase animate-pulse shadow-sm shrink-0">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Medium Screen Nav (lg to xl) */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
            {navLinks.slice(0, 4).map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-sm font-bold"
                      : "text-gray-300 hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span className="whitespace-nowrap">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* ================= USER AUTH & CART ACTIONS ================= */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-nowrap" suppressHydrationWarning>
            {/* Global Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/[0.06] hover:bg-rose-500/20 text-gray-200 hover:text-white border border-white/10 hover:border-rose-500/40 transition duration-200 shrink-0"
              aria-label="Open Shopping Bag"
            >
              <ShoppingCart className="w-4 h-4" />
              {mounted && totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[9px] font-black flex items-center justify-center animate-bounce shadow-md">
                  {totalCount}
                </span>
              )}
            </button>

            {mounted && user ? (
              <div className="relative shrink-0 hidden lg:block">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3.5 rounded-full bg-white/[0.06] border border-white/10 hover:border-rose-500/40 hover:bg-white/[0.1] transition-all text-left whitespace-nowrap shrink-0"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.name)}`}
                    alt={user.name}
                    className="w-8 h-8 rounded-full bg-rose-950/60 object-cover border border-amber-400/40 shrink-0"
                  />
                  <div className="flex flex-col justify-center leading-tight">
                    <span className="text-xs font-bold text-white truncate max-w-[95px] whitespace-nowrap">
                      {user.name}
                    </span>
                    <span className="text-[9px] text-amber-400 font-semibold uppercase tracking-wider flex items-center gap-0.5 whitespace-nowrap">
                      {user.plan !== "free" && <Crown className="w-2.5 h-2.5 text-amber-400 shrink-0" />}
                      {user.plan} Pass
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 glass-card rounded-2xl p-2 shadow-2xl z-50 border border-white/15 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-200 hover:bg-rose-500/20 hover:text-white rounded-lg transition"
                      >
                        <UserIcon className="w-4 h-4 text-rose-400 shrink-0" />
                        <span className="whitespace-nowrap">Celebration Profile</span>
                      </Link>
                      <Link
                        href="/pricing"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-200 hover:bg-amber-500/20 hover:text-white rounded-lg transition"
                      >
                        <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="whitespace-nowrap">VIP Passes</span>
                      </Link>
                    </div>
                    <div className="pt-1 border-t border-white/10">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/20 rounded-lg transition text-left"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span className="whitespace-nowrap">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2.5 shrink-0 flex-nowrap">
                {/* SIGN IN BUTTON */}
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-gray-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] transition-all shrink-0 select-none"
                >
                  <LogIn className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="whitespace-nowrap inline-block font-bold">Sign In</span>
                </Link>

                {/* JOIN CELEBRATION CTA */}
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0 select-none"
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap inline-block font-bold">Join Celebration</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-2xl bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.1] transition shrink-0"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-card border-t border-white/10 px-4 pt-4 pb-6 mt-3 space-y-2 max-w-7xl mx-auto shadow-2xl animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md"
                    : "text-gray-300 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">{link.name}</span>
                </div>
                {link.badge && (
                  <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shrink-0">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            {mounted && user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.04] text-white text-sm font-medium"
                >
                  <UserIcon className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="whitespace-nowrap">My Profile ({user.name})</span>
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-rose-500/20 text-rose-400 text-sm font-semibold"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span className="whitespace-nowrap">Sign Out</span>
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 rounded-2xl border border-white/15 text-sm text-gray-200 font-semibold hover:bg-white/5 transition whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white text-sm font-bold shadow-lg shadow-rose-500/30 whitespace-nowrap"
                >
                  Join Celebration
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
