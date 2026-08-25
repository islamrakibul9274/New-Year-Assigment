"use client";

import React, { useState } from "react";
import { triggerFestiveConfetti } from "@/components/effects/ConfettiTrigger";
import { Mail, Send, CheckCircle2, Sparkles } from "lucide-react";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
        triggerFestiveConfetti(0.5);
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
    <section className="py-20 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-14 text-center border border-white/15 relative overflow-hidden">
          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Mail Graphic (Group 61.png) */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/Group 61.png" alt="Newsletter" className="w-8 h-8 object-contain" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Subscribe Newsletter
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Get exclusive invites to midnight galas, secret holiday flash deals, and personalized New Year inspiration sent straight to your inbox.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@gmail.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.08] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 text-sm"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/30 hover:opacity-95 transition disabled:opacity-50"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>

            {message && (
              <div
                className={`text-xs font-semibold flex items-center justify-center gap-1.5 pt-2 ${
                  status === "success" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {status === "success" && <CheckCircle2 className="w-4 h-4" />}
                <span>{message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
