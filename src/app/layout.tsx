import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { CartProvider } from "@/components/providers/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";
import ParticleBackground from "@/components/effects/ParticleBackground";

export const metadata: Metadata = {
  title: "New Year Celebration 2026 | Ultimate Midnight Gala & Deals Hub",
  description: "Celebrate the New Year with live countdown lounges, AI resolution coach, exclusive 65% holiday discounts, and VIP midnight gala passes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body 
        className="antialiased bg-[#0b0d14] text-[#f3f4f6] relative selection:bg-rose-500 selection:text-white"
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>
            <ParticleBackground />
            <Navbar />
            <CartDrawer />
            <main className="min-h-screen relative z-10">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
