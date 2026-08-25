"use client";

import React from "react";
import Link from "next/link";
import { PartyPopper, RefreshCw } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-48 pb-24 max-w-md mx-auto px-4 text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
        <PartyPopper className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-bold text-white">Celebration Hiccup</h2>
      <p className="text-xs text-gray-400">
        Something unexpected occurred. Let&apos;s get you back to the celebration.
      </p>
      <div className="flex gap-3 justify-center pt-2">
        <button
          onClick={() => reset()}
          className="px-5 py-2.5 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center gap-2 hover:bg-rose-600 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Try Again</span>
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-white/[0.08] text-white font-bold text-xs border border-white/10 hover:bg-white/15 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
