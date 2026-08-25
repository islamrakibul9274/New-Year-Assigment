"use client";

import React, { useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { Eye, ShoppingCart, Check } from "lucide-react";

const portfolioItems = [
  { id: 1, name: "Sparkling Fireworks Kit", category: "Fireworks", img: "/images/Rectangle 3.png", price: 49.99, discount: "30% OFF" },
  { id: 2, name: "Gourmet Party Hamper", category: "Gift Baskets", img: "/images/Rectangle 4.png", price: 79.99, discount: "50% OFF" },
  { id: 3, name: "Midnight Champagne Set", category: "Drinks", img: "/images/Rectangle 5.png", price: 65.00, discount: "40% OFF" },
  { id: 4, name: "Festive Neon Decor Pack", category: "Decor", img: "/images/Rectangle 6.png", price: 34.99, discount: "25% OFF" },
  { id: 5, name: "Luxury Celebration Box", category: "Gift Baskets", img: "/images/Rectangle 7.png", price: 89.99, discount: "45% OFF" },
  { id: 6, name: "Gold Confetti Cannon", category: "Fireworks", img: "/images/Rectangle 8.png", price: 29.99, discount: "20% OFF" },
];

export default function GiftPortfolio() {
  const { addToCart, items } = useCart();
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const filteredItems = activeFilter === "All"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-rose-400">
            THE BEST GIFTS
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Our Awesome Portfolio
          </h2>
          <p className="text-sm text-gray-400">
            Discover handpicked festive treasures designed to delight friends, family, and celebration guests.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {["All", "Gift Baskets", "Fireworks", "Decor", "Drinks"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/25"
                  : "bg-white/[0.06] text-gray-300 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const inCart = items.some((i) => i.id === item.id);
            return (
              <div
                key={item.id}
                className="group relative rounded-3xl glass-card overflow-hidden border border-white/10 hover:border-rose-500/40 transition-all duration-300 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {item.discount}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f17] via-transparent to-transparent opacity-60" />

                  {/* Hover Quick Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40 backdrop-blur-xs">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-3 rounded-full bg-white text-black hover:bg-rose-500 hover:text-white transition shadow-lg"
                      title="Quick Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      className="p-3 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition shadow-lg"
                      title="Add to Bag"
                    >
                      {inCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-rose-400 transition">
                      {item.name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-white font-mono">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Item Modal Preview */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="glass-card max-w-lg w-full rounded-3xl overflow-hidden border border-white/20 relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-white z-10 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center font-bold"
            >
              ✕
            </button>
            <div className="h-64 bg-black/60 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedItem.img}
                alt={selectedItem.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-amber-400 font-bold uppercase">
                  {selectedItem.category}
                </span>
                <span className="text-xl font-black text-rose-400 font-mono">
                  ${selectedItem.price.toFixed(2)}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedItem.name}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Premium quality holiday celebration essential. Crafted with high-grade components to elevate your New Year party experience.
              </p>
              <button
                onClick={() => {
                  addToCart(selectedItem);
                  setSelectedItem(null);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-rose-500/30"
              >
                Add To Holiday Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
