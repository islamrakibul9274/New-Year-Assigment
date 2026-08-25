import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="pt-48 pb-24 max-w-md mx-auto px-4 text-center space-y-4">
      <div className="text-6xl font-black text-rose-500 font-mono">404</div>
      <h2 className="text-2xl font-bold text-white">Party Page Not Found</h2>
      <p className="text-xs text-gray-400">
        The festive page you are looking for doesn&apos;t exist or has moved.
      </p>
      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-xs shadow-lg shadow-rose-500/25"
        >
          <Sparkles className="w-4 h-4" />
          <span>Return to Celebration Hub</span>
        </Link>
      </div>
    </div>
  );
}
