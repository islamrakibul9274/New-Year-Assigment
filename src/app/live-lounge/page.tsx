"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { getPusherClient } from "@/lib/pusher";
import { 
  Radio, 
  Send, 
  Sparkles, 
  PartyPopper, 
  Users, 
  Crown
} from "lucide-react";
import { triggerFestiveConfetti, triggerFireworksShower } from "@/components/effects/ConfettiTrigger";

interface Message {
  id: string;
  sender: string;
  text: string;
  avatar: string;
  plan: string;
  timestamp: string;
}

export default function LiveLoungePage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Celebration Host",
      text: "🎉 Welcome to the 2024 Live Countdown Lounge! Chat with friends and trigger live confetti drops!",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Host",
      plan: "diamond",
      timestamp: "12:00 PM",
    },
    {
      id: "2",
      sender: "Sarah Jenkins",
      text: "Happy New Year everyone!! Can't wait for midnight fireworks! 🎆✨",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=Sarah",
      plan: "silver",
      timestamp: "12:01 PM",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [onlineCount, setOnlineCount] = useState(148);
  const [latestBlastBy, setLatestBlastBy] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Real-time countdown
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(new Date().getFullYear(), 11, 31, 23, 59, 59).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pusher Client subscription
  useEffect(() => {
    const pusher = getPusherClient();
    if (!pusher) return;

    const channel = pusher.subscribe("live-party-room");

    channel.bind("new-message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    channel.bind("confetti-blast", (data: { triggerBy: string }) => {
      setLatestBlastBy(data.triggerBy);
      triggerFestiveConfetti(0.4);
      setTimeout(() => setLatestBlastBy(null), 3000);
    });

    return () => {
      pusher.unsubscribe("live-party-room");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const msgToSend = inputText;
    setInputText("");

    try {
      await fetch("/api/pusher/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msgToSend,
          senderName: user?.name || "Party Guest",
          avatar: user?.avatar,
        }),
      });
    } catch (e) {
      console.error("Message send failed", e);
    }
  };

  const triggerLiveConfetti = async () => {
    try {
      await fetch("/api/pusher/confetti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          triggerBy: user?.name || "Festive Guest",
        }),
      });
      triggerFireworksShower();
    } catch (e) {
      console.error("Confetti trigger failed", e);
    }
  };

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 animate-pulse text-rose-500" />
            <span>Live Celebration Lounge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Midnight Party <span className="festive-gradient-text">Live Room</span>
          </h1>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-4">
          <div className="glass-card px-4 py-2.5 rounded-2xl border border-white/10 flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-gray-200">{onlineCount} Online Now</span>
          </div>

          <button
            onClick={triggerLiveConfetti}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:scale-105 transition"
          >
            <PartyPopper className="w-4 h-4" />
            <span>Drop Global Confetti</span>
          </button>
        </div>
      </div>

      {/* Synchronized Blast Toast */}
      {latestBlastBy && (
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-rose-500/20 via-amber-500/20 to-rose-500/20 border border-amber-400/40 text-center animate-bounce">
          <p className="text-xs sm:text-sm font-bold text-amber-300 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span><strong>{latestBlastBy}</strong> just launched a screen-wide fireworks confetti drop! 🎆</span>
          </p>
        </div>
      )}

      {/* Main Grid: Synced Clock & Live Chat Room */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Clock & Quick Reactions (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-white/15 text-center space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Synced Midnight Countdown
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5">
                <span className="text-2xl font-black text-rose-400 font-mono">
                  {String(timeLeft.h).padStart(2, "0")}
                </span>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Hrs</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5">
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {String(timeLeft.m).padStart(2, "0")}
                </span>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Mins</p>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5">
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {String(timeLeft.s).padStart(2, "0")}
                </span>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Secs</p>
              </div>
            </div>
            <p className="text-[11px] text-gray-400">Synchronized with New Park Hotel official celebration clock.</p>
          </div>

          {/* Quick Festive Emoji Reactions */}
          <div className="glass-card rounded-3xl p-6 border border-white/15 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Party Reactions</h4>
            <div className="grid grid-cols-4 gap-2">
              {["🎉", "🎆", "🥂", "💖", "✨", "🔥", "🎊", "🍾"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => {
                    setInputText((prev) => prev + " " + emoji);
                    triggerFestiveConfetti(0.2);
                  }}
                  className="p-3 rounded-2xl bg-white/[0.04] hover:bg-rose-500/20 hover:border-rose-500 text-xl border border-white/5 transition flex items-center justify-center hover:scale-110"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Chat Room (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="glass-card rounded-3xl border border-white/15 h-[620px] flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Room Header */}
            <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Global Celebrators Chat</h4>
                  <p className="text-[10px] text-gray-400">Pusher Realtime Broadcast Active</p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                #NewYearParty2024
              </span>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={msg.avatar}
                    alt={msg.sender}
                    className="w-9 h-9 rounded-full bg-rose-950/50 object-cover border border-white/10 shrink-0 mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{msg.sender}</span>
                      {msg.plan === "diamond" && (
                        <span className="bg-amber-500/20 text-amber-300 text-[9px] px-1.5 py-0.5 rounded font-extrabold flex items-center gap-0.5 border border-amber-500/30">
                          <Crown className="w-2.5 h-2.5" /> VIP
                        </span>
                      )}
                      <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                    </div>
                    <div className="p-3 rounded-2xl rounded-tl-none bg-white/[0.05] border border-white/10 text-xs sm:text-sm text-gray-200 inline-block leading-relaxed max-w-xl">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-[#0c0e18] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={user ? "Share your festive wishes..." : "Say something (Guest mode)..."}
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-2xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="p-3 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg shadow-rose-500/25 hover:opacity-95 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
