"use client";

import React, { useState } from "react";
import { MapPin, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { triggerFestiveConfetti } from "@/components/effects/ConfettiTrigger";

export default function ScheduleCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [guestsCount, setGuestsCount] = useState(1);
  const [passType, setPassType] = useState("standard");
  const [loading, setLoading] = useState(false);
  const [successTicket, setSuccessTicket] = useState<string | null>(null);

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: name,
          guestEmail: email,
          guestsCount,
          passType,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessTicket(data.ticketCode);
        triggerFestiveConfetti(0.4);
      } else {
        alert(data.error || "RSVP failed");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 relative overflow-hidden">
          {/* Top Banner Gradient Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            {/* Place */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Place</p>
                <h4 className="text-sm sm:text-base font-bold text-white">New Park Hotel</h4>
                <p className="text-xs text-gray-400">Beach Garden Florida</p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Date</p>
                <h4 className="text-sm sm:text-base font-bold text-white">31 December Night</h4>
                <p className="text-xs text-gray-400">Grand Gala 2026</p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Time</p>
                <h4 className="text-sm sm:text-base font-bold text-white">Evening 7:30 PM</h4>
                <p className="text-xs text-gray-400">to 12:30 AM Midnight</p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="flex justify-center md:justify-end">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-rose-500/30 hover:scale-105 transition"
              >
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* RSVP Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="glass-card max-w-md w-full rounded-3xl p-6 sm:p-8 border border-white/20 relative">
            <button
              onClick={() => {
                setModalOpen(false);
                setSuccessTicket(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg font-bold"
            >
              ✕
            </button>

            {successTicket ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">You are Confirmed!</h3>
                <p className="text-sm text-gray-300">
                  Your reservation is secured. A digital pass has been emailed to <span className="text-amber-300 font-semibold">{email}</span>.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.06] border border-amber-400/30 font-mono text-amber-300 text-lg font-bold">
                  {successTicket}
                </div>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setSuccessTicket(null);
                  }}
                  className="w-full py-3 rounded-xl bg-rose-500 text-white font-bold text-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRSVP} className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-black text-white">Midnight Party RSVP</h3>
                  <p className="text-xs text-gray-400 mt-1">Reserve your digital ticket for New Park Hotel</p>
                </div>

                <div>
                  <label htmlFor="rsvp-name" className="text-xs font-semibold text-gray-300 block mb-1">Full Name</label>
                  <input
                    id="rsvp-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="rsvp-email" className="text-xs font-semibold text-gray-300 block mb-1">Email Address</label>
                  <input
                    id="rsvp-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="rsvp-guests" className="text-xs font-semibold text-gray-300 block mb-1">Guests</label>
                    <select
                      id="rsvp-guests"
                      name="guestsCount"
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#131726] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-rose-500"
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={6}>6 (Table)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="rsvp-pass" className="text-xs font-semibold text-gray-300 block mb-1">Pass Tier</label>
                    <select
                      id="rsvp-pass"
                      name="passType"
                      value={passType}
                      onChange={(e) => setPassType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#131726] border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-rose-500"
                    >
                      <option value="standard">Standard Pass</option>
                      <option value="vip_silver">VIP Silver</option>
                      <option value="diamond_all_access">Diamond VIP</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/30 hover:opacity-95 transition disabled:opacity-50 mt-4"
                >
                  {loading ? "Confirming Reservation..." : "Confirm My RSVP"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
