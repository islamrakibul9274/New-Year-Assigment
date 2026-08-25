"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import Link from "next/link";
import { 
  User, 
  Camera, 
  Crown, 
  Sparkles, 
  Save, 
  Ticket, 
  Target, 
  CheckCircle2,
  Loader2
} from "lucide-react";
import { triggerFestiveConfetti } from "@/components/effects/ConfettiTrigger";

export default function ProfilePage() {
  const { user, loading, refreshUser, logout } = useAuth();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [customGreeting, setCustomGreeting] = useState("");
  const [themePreference, setThemePreference] = useState("festive-crimson");
  const [avatar, setAvatar] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setBio(user.bio || "Ready to celebrate and achieve great milestones this year!");
      setCustomGreeting(user.customGreeting || "Happy New Year! Wishing you boundless joy and prosperity!");
      setThemePreference(user.themePreference || "festive-crimson");
      setAvatar(user.avatar || "");
    }
  }, [user]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64data = reader.result;
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64data }),
        });
        const data = await res.json();
        if (res.ok && data.url) {
          setAvatar(data.url);
          await refreshUser();
          triggerFestiveConfetti(0.4);
        } else {
          alert(data.error || "Upload failed");
        }
      } catch {
        alert("Image upload failed");
      } finally {
        setUploadingAvatar(false);
      }
    };
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          bio,
          customGreeting,
          themePreference,
          avatar,
        }),
      });
      if (res.ok) {
        setSavedSuccess(true);
        await refreshUser();
        triggerFestiveConfetti(0.3);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        alert("Failed to save changes");
      }
    } catch {
      alert("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  // Avoid hydration mismatch while waiting for client mounting/auth state
  if (!mounted || loading) {
    return (
      <div className="pt-48 pb-24 max-w-md mx-auto px-4 text-center space-y-4">
        <Loader2 className="w-10 h-10 text-rose-500 animate-spin mx-auto" />
        <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase">
          Loading Celebration Profile...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pt-40 pb-24 max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Sign In to View Profile</h2>
        <p className="text-sm text-gray-400">
          Access your personal celebration dashboard, custom avatars, and booked gala passes.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 rounded-full bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-500/30 hover:bg-rose-600 transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 rounded-full bg-white/[0.08] text-white font-bold text-xs border border-white/10 hover:bg-white/15 transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-8 border border-white/15 mb-10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Avatar with Upload button */}
          <div className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || "User")}`}
              alt={name}
              className="w-24 h-24 rounded-3xl object-cover border-2 border-amber-400/40 shadow-2xl bg-rose-950/40"
            />
            <label className="absolute inset-0 bg-black/60 rounded-3xl flex flex-col items-center justify-center text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition cursor-pointer">
              <Camera className="w-5 h-5 mb-1" />
              <span>{uploadingAvatar ? "Uploading..." : "Change"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                disabled={uploadingAvatar}
                className="hidden"
              />
            </label>
          </div>

          {/* User Details */}
          <div className="text-center sm:text-left space-y-1 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white">{name}</h1>
              <span className="bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[10px] px-3 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <Crown className="w-3 h-3" />
                {user.plan} VIP Member
              </span>
            </div>
            <p className="text-xs text-gray-400">{user.email}</p>
            <p className="text-xs text-amber-300/90 font-medium italic pt-1">{customGreeting}</p>
          </div>

          <div className="flex sm:flex-col gap-2">
            <Link
              href="/pricing"
              className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold hover:bg-amber-500/30 transition text-center"
            >
              Upgrade Pass
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-rose-500/20 text-rose-400 text-xs font-semibold hover:bg-rose-500/30 transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Profile Form & Customizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form (7 Cols) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSaveProfile} className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Celebration Preferences & Profile</span>
            </h3>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Display Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">New Year Personal Motto / Bio</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 text-sm resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Custom Celebration Greeting</label>
              <input
                type="text"
                value={customGreeting}
                onChange={(e) => setCustomGreeting(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 text-sm"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Celebration Theme Style</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "festive-crimson", label: "Crimson Spark", color: "bg-rose-500" },
                  { id: "golden-gala", label: "Golden Gala", color: "bg-amber-500" },
                  { id: "midnight-neon", label: "Midnight Neon", color: "bg-violet-500" },
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setThemePreference(t.id)}
                    className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold transition ${
                      themePreference === t.id
                        ? "border-amber-400 bg-white/[0.1] text-white"
                        : "border-white/10 bg-white/[0.03] text-gray-400"
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${t.color}`} />
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-xl shadow-rose-500/30 hover:opacity-95 transition flex items-center justify-center gap-2 mt-4"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Changes..." : "Save Profile Customization"}</span>
            </button>

            {savedSuccess && (
              <div className="text-center text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Profile updated successfully!</span>
              </div>
            )}
          </form>
        </div>

        {/* Right Passes & Resolutions (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Ticket Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/15 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Ticket className="w-4 h-4 text-rose-500" />
              <span>My Party Pass</span>
            </h4>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-950/40 via-[#181c2e] to-amber-950/30 border border-amber-400/30 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Venue</span>
                <span className="font-bold text-white">New Park Hotel, FL</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-400">Date</span>
                <span className="font-bold text-white">31 Dec (7:30 PM - Late)</span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-white/10 pt-2">
                <span className="text-gray-400">Access Tier</span>
                <span className="font-bold font-mono text-amber-300 uppercase">{user.plan} PASS</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="glass-card rounded-3xl p-6 border border-white/15 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" />
              <span>Celebration Quick Tools</span>
            </h4>
            <div className="space-y-2 text-xs font-semibold">
              <Link
                href="/ai-resolutions"
                className="block p-3 rounded-xl bg-white/[0.04] hover:bg-white/10 text-gray-200 transition"
              >
                🎯 Generate New AI Resolution Plan
              </Link>
              <Link
                href="/live-lounge"
                className="block p-3 rounded-xl bg-white/[0.04] hover:bg-white/10 text-gray-200 transition"
              >
                📻 Join Real-Time Party Lounge
              </Link>
              <Link
                href="/deals"
                className="block p-3 rounded-xl bg-white/[0.04] hover:bg-white/10 text-gray-200 transition"
              >
                🎁 Browse 65% OFF Holiday Deals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
