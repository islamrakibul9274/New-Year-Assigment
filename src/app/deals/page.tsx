"use client";

import React, { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { 
  Gift, 
  Tag, 
  ShoppingCart, 
  Search, 
  Flame,
  Check
} from "lucide-react";

const allProducts = [
  { id: 101, name: "65% OFF Deluxe Party Hamper", category: "Baskets", price: 69.99, originalPrice: 199.99, img: "/images/New Year Photo.png", discount: "65% OFF", desc: "Champagne, truffles, gourmet treats, and festive crackers." },
  { id: 102, name: "Midnight Sparkler & Fireworks Set", category: "Fireworks", price: 39.99, originalPrice: 79.99, img: "/images/Rectangle 3.png", discount: "50% OFF", desc: "Long-duration golden sparklers and safe celebration fountains." },
  { id: 103, name: "Gourmet Celebration Keepsake Box", category: "Baskets", price: 49.99, originalPrice: 99.99, img: "/images/Rectangle 4.png", discount: "50% OFF", desc: "Handcrafted wooden keepsake chest packed with festive sweets." },
  { id: 104, name: "Luxury Champagne Twin Pack", category: "Drinks", price: 54.99, originalPrice: 95.00, img: "/images/Rectangle 5.png", discount: "42% OFF", desc: "Two bottles of vintage French sparkling wine for midnight cheers." },
  { id: 105, name: "Neon LED Party Ambience Pack", category: "Decor", price: 29.99, originalPrice: 59.99, img: "/images/Rectangle 6.png", discount: "50% OFF", desc: "Glowing 2026 signs, LED balloons, and fairy garlands." },
  { id: 106, name: "Royal Grand Gala Hamper", category: "Baskets", price: 89.99, originalPrice: 160.00, img: "/images/Rectangle 7.png", discount: "45% OFF", desc: "The supreme holiday package for luxury gifting." },
  { id: 107, name: "Confetti Poppers Cannon (12-pack)", category: "Fireworks", price: 24.99, originalPrice: 45.00, img: "/images/Rectangle 8.png", discount: "45% OFF", desc: "Biodegradable metallic gold & ruby confetti poppers." },
  { id: 108, name: "Holiday Chic Party Wear Set", category: "Fashion", price: 74.99, originalPrice: 149.99, img: "/images/Rectangle 1.png", discount: "50% OFF", desc: "Exclusive holiday collection dresses and party outfits." },
];

export default function DealsPage() {
  const { addToCart, items, totalCount, setIsCartOpen } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered = allProducts.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Promo Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-card border border-rose-500/30 p-8 sm:p-12 mb-12">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Holiday Flash Sale Active</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Exclusive <span className="festive-gradient-text">65% OFF Deals</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base">
            Celebrate the season with hand-curated gift baskets, fireworks kits, party decorations, and festive essentials.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xs text-gray-400">Secret 15% Extra Discount Code:</span>
            <span className="font-mono text-amber-300 bg-white/[0.08] px-3 py-1 rounded-lg border border-amber-400/30 text-xs font-bold">
              FESTIVE15
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {["All", "Baskets", "Fireworks", "Drinks", "Decor", "Fashion"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md"
                  : "bg-white/[0.06] text-gray-300 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & Cart Trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gifts & deals..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-white/[0.06] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-white text-xs font-bold shadow-lg shadow-rose-500/25 hover:opacity-95 transition shrink-0"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Bag ({totalCount})</span>
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((item) => {
          const inCart = items.some((i) => i.id === item.id);
          return (
            <div
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 hover:border-rose-500/40 transition flex flex-col group"
            >
              <div className="h-52 bg-black/40 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {item.discount}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{item.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div>
                    <span className="text-base font-black text-white font-mono">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2 font-mono">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="p-2.5 rounded-xl bg-white/[0.08] hover:bg-rose-500 text-white transition"
                    title="Add to bag"
                  >
                    {inCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
