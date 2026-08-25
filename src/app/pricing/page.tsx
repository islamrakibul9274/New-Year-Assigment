"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { 
  Check, 
  Crown, 
  Sparkles, 
  Zap, 
  CreditCard, 
  HelpCircle,
  PartyPopper,
  CheckCircle2,
  Lock,
  ArrowRight
} from "lucide-react";
import { triggerFestiveConfetti, triggerFireworksShower } from "@/components/effects/ConfettiTrigger";

export default function PricingPage() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const [interval, setInterval] = useState<"month" | "year">("year");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [upgradeSuccess, setUpgradeSuccess] = useState<string | null>(null);

  const handleCheckout = async (planId: string, directActivate = false) => {
    if (planId === "free") {
      if (!user) {
        router.push("/signup");
      } else {
        alert("You are currently on the Free Explorer plan!");
      }
      return;
    }

    if (!user) {
      router.push(`/signup?redirect=/pricing&plan=${planId}`);
      return;
    }

    setLoadingPlan(planId);

    if (directActivate) {
      // 1-Click Instant Activation mode for demo/testing
      try {
        const res = await fetch("/api/user/upgrade-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId }),
        });
        const data = await res.json();
        if (res.ok) {
          await refreshUser();
          setUpgradeSuccess(`🎉 You are now officially a ${planId.toUpperCase()} VIP Member!`);
          triggerFireworksShower();
          setTimeout(() => setUpgradeSuccess(null), 5000);
        } else {
          alert(data.error || "Upgrade failed");
        }
      } catch {
        alert("Network error. Please try again.");
      } finally {
        setLoadingPlan(null);
      }
      return;
    }

    // Stripe Checkout session creation
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, interval }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // If stripe not configured with live payment, fallback to instant upgrade
        const fallbackRes = await fetch("/api/user/upgrade-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planId }),
        });
        if (fallbackRes.ok) {
          await refreshUser();
          setUpgradeSuccess(`🎉 You are now officially a ${planId.toUpperCase()} VIP Member!`);
          triggerFireworksShower();
        }
      }
    } catch {
      // Direct activation fallback
      const fallbackRes = await fetch("/api/user/upgrade-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      if (fallbackRes.ok) {
        await refreshUser();
        setUpgradeSuccess(`🎉 You are now officially a ${planId.toUpperCase()} VIP Member!`);
        triggerFireworksShower();
      }
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Crown className="w-4 h-4" />
          <span>VIP Celebration Passes</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white">
          Choose Your <br />
          <span className="festive-gradient-text">New Year Experience</span>
        </h1>
        <p className="text-gray-300 text-base sm:text-lg">
          Unlock full VIP ballroom & rooftop gala access, unlimited AI resolution coaching, priority deals, and real-time live lounge perks.
        </p>

        {/* Upgrade Success Notification */}
        {upgradeSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold animate-bounce flex items-center justify-center gap-2 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{upgradeSuccess}</span>
          </div>
        )}

        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-xs sm:text-sm font-bold ${interval === "month" ? "text-white" : "text-gray-400"}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => {
              setInterval(interval === "month" ? "year" : "month");
              triggerFestiveConfetti(0.3);
            }}
            className="w-14 h-8 rounded-full bg-white/[0.1] border border-white/20 p-1 flex items-center transition relative"
            aria-label="Toggle Billing Interval"
          >
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 shadow-md transition-transform duration-300 ${
                interval === "year" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${interval === "year" ? "text-amber-400" : "text-gray-400"}`}>
            Annual Billing
            <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
              Save 25%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
        {/* Tier 1: Free Explorer */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between space-y-8 hover:border-white/25 transition">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Free Explorer</h3>
              <span className="text-[10px] uppercase tracking-wider text-gray-400 bg-white/[0.06] px-2.5 py-1 rounded-full font-bold">
                Standard
              </span>
            </div>
            <p className="text-xs text-gray-400">Basic access to public celebration pages and standard RSVP.</p>
            <div className="text-4xl font-black text-white font-mono">$0</div>

            <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-300">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Access to Midnight Party Public Area</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3 Free AI Resolution Generations</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live Countdown Lounge View</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-500">
                <span className="line-through">VIP Rooftop Fireworks Access</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-500">
                <span className="line-through">Exclusive 65% VIP Discount Bundles</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleCheckout("free")}
            className="w-full py-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/15 text-white font-bold text-xs transition"
          >
            {user?.plan === "free" ? "Current Active Plan" : "Get Started Free"}
          </button>
        </div>

        {/* Tier 2: Silver Celebration (Popular) */}
        <div className="glass-card rounded-3xl p-8 border-2 border-rose-500 relative flex flex-col justify-between space-y-8 shadow-2xl shadow-rose-500/20">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-lg">
            Most Popular
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">Silver Celebration</h3>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-gray-300">Complete VIP party experience with unlimited AI coaching.</p>
            <div className="flex items-baseline gap-1 text-white font-mono">
              <span className="text-5xl font-black">
                {interval === "year" ? "$79" : "$9"}
              </span>
              <span className="text-xs text-gray-400">/{interval === "year" ? "yr" : "mo"}</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-200">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rose-400 shrink-0" />
                <span><strong>VIP Ballroom Access</strong> + Welcome Drinks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Unlimited Groq AI Resolutions & Cards</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Live Lounge VIP Chat Badge & Fast Send</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-rose-400 shrink-0" />
                <span>15% Extra Coupon across all holiday deals</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-500">
                <span className="line-through">Private Rooftop Skybox Lounge</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleCheckout("silver")}
              disabled={loadingPlan === "silver"}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 text-white font-bold text-xs shadow-xl shadow-rose-500/30 hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>{loadingPlan === "silver" ? "Connecting Stripe..." : user?.plan === "silver" ? "Active Silver Member" : "Pay with Stripe ($" + (interval === "year" ? "79" : "9") + ")"}</span>
            </button>

            <button
              onClick={() => handleCheckout("silver", true)}
              disabled={loadingPlan === "silver"}
              className="w-full py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-amber-300 font-bold text-[11px] border border-amber-400/30 transition flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant 1-Click Activate (VIP Demo)</span>
            </button>
          </div>
        </div>

        {/* Tier 3: Diamond Gala All-Access */}
        <div className="glass-card rounded-3xl p-8 border border-amber-400/40 flex flex-col justify-between space-y-8 hover:border-amber-400 transition bg-gradient-to-b from-amber-500/[0.05] to-transparent">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-amber-300">Diamond Gala</h3>
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-xs text-gray-300">Ultimate all-inclusive luxury gala experience with skybox access.</p>
            <div className="flex items-baseline gap-1 text-white font-mono">
              <span className="text-5xl font-black">
                {interval === "year" ? "$149" : "$19"}
              </span>
              <span className="text-xs text-gray-400">/{interval === "year" ? "yr" : "mo"}</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-white/10 text-xs text-gray-200">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>All-Inclusive Rooftop Skybox</strong> & Champagne Bar</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dedicated Table & Gourmet 5-Course Dinner</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Exclusive Diamond Hamper mailed to your home</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Synchronized Screen-Wide Confetti Trigger Rights</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Personalized AI Life Coach Mentorship</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => handleCheckout("diamond")}
              disabled={loadingPlan === "diamond"}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-extrabold text-xs shadow-xl shadow-amber-500/20 hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>{loadingPlan === "diamond" ? "Connecting Stripe..." : user?.plan === "diamond" ? "Active Diamond Member" : "Pay with Stripe ($" + (interval === "year" ? "149" : "19") + ")"}</span>
            </button>

            <button
              onClick={() => handleCheckout("diamond", true)}
              disabled={loadingPlan === "diamond"}
              className="w-full py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-amber-300 font-bold text-[11px] border border-amber-400/30 transition flex items-center justify-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>Instant 1-Click Activate (Diamond VIP)</span>
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/10 space-y-6 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-white text-center flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-rose-500" />
          <span>Frequently Asked Questions</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-xs sm:text-sm">
          <div className="space-y-2">
            <h4 className="font-bold text-white">Can I change or cancel my pass at any time?</h4>
            <p className="text-gray-400 leading-relaxed">Yes! You can manage or cancel your subscription anytime directly from your profile dashboard.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white">How do I receive my physical gala pass?</h4>
            <p className="text-gray-400 leading-relaxed">Your digital barcode pass is generated instantly in your profile and emailed via Resend upon checkout confirmation.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white">What payment methods are supported?</h4>
            <p className="text-gray-400 leading-relaxed">We support all major credit cards, Apple Pay, and Google Pay through Stripe secure checkout.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-white">Are party tickets refundable?</h4>
            <p className="text-gray-400 leading-relaxed">Passes can be transferred or cancelled with a full refund up to 48 hours before December 31st.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
