# 🎆 New Year Celebration Hub — Full-Stack Next.js Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Stripe](https://img.shields.io/badge/Stripe-VIP_Passes-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Groq AI](https://img.shields.io/badge/Groq_AI-LLaMA_3.3_70B-F55036?style=for-the-badge)](https://groq.com/)
[![Netlify Status](https://img.shields.io/badge/Netlify-Live_Deploy-00C7B7?style=for-the-badge&logo=netlify)](https://newyear-celebration-hub.netlify.app)

> **Live Production URL**: [https://newyear-celebration-hub.netlify.app](https://newyear-celebration-hub.netlify.app)  
> **GitHub Repository**: [https://github.com/islamrakibul9274/new-year-celebration-hub](https://github.com/islamrakibul9274/new-year-celebration-hub)

---

## 🌟 Overview

**New Year Celebration Hub** transforms a static festive webpage into a modern, full-stack digital celebration ecosystem. Ring in the New Year with live countdown lounges, AI-powered life coaching, exclusive 65% holiday discounts, interactive shopping bags, VIP midnight passes, and real-time screen-wide confetti cannons.

---

## ✨ Features & Capabilities

### 🎨 Modern Festive UI & Micro-Interactions
- **Glassmorphism & Festive Glows**: Deep dark aesthetic (`#0b0d14`), crimson glows (`#ff3366`), gold accents (`#f59e0b`), and neon particle engine.
- **Synchronized Confetti & Fireworks**: Multi-color confetti cannons and fireworks showers on key user actions powered by `canvas-confetti`.
- **Responsive Navigation**: Bulletproof sticky glass navbar with active indicators, live shopping bag badge, and mobile drawer.
- **Rich Multi-column Footer**: Original venue & contact details preserved with newsletter subscription and celebration tags.

### 🧭 Multi-Page Platform
1. **`/` (Home)**: Live countdown clock, 65% OFF Deals, Midnight Party Showcase, Event Schedule with instant RSVP modal, 2026 Incoming Offers, 50% Holiday Sale, filterable Gift Portfolio with preview modals, and Newsletter subscription.
2. **`/events`**: Party timeline (Acoustic Concerts, Gala Dinner, Midnight Fireworks, Afterparty), venue maps, and instant digital pass generator with unique barcodes.
3. **`/deals`**: Holiday gift shop with live search, category filtering, coupon code system (`FESTIVE15`, `HOLIDAY50`), and interactive shopping bag.
4. **`/ai-resolutions`**: AI Resolution Architect (4-quarter structured milestone plans) & Custom Greeting Card Maker powered by **Groq LLaMA 3.3 70B**.
5. **`/pricing`**: VIP passes (Free, Silver Celebration, Diamond Gala) with Monthly/Annual billing, **Stripe Checkout**, and 1-click instant demo activation.
6. **`/live-lounge`**: Real-time **Pusher** live party chat room with synchronized midnight countdown and screen-wide confetti triggers.
7. **`/profile`**: User profile dashboard with **Cloudinary** avatar uploads, theme customization, saved resolutions, and digital pass holder.
8. **`/login` & `/signup`**: User authentication with bcrypt password hashing, JWT session cookies, and **Resend** welcome emails.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide Icons, Canvas Confetti |
| **Backend** | Next.js API Routes, Server Actions, Node.js v25 |
| **Database** | MongoDB Atlas with Mongoose + Resilient Persistent Local Fallback (`data/db.json`) |
| **Authentication** | Custom JWT Sessions + BcryptJS password encryption |
| **AI Engine** | Groq SDK (`llama-3.3-70b-versatile`) |
| **Payments** | Stripe Checkout & Webhook Integration |
| **Realtime** | Pusher Channels (live chat & synchronized confetti) |
| **Email** | Resend API (welcome emails, tickets, newsletters) |
| **Media CDN** | Cloudinary (avatar & photo uploads) |
| **Hosting** | Netlify Serverless Cloud |

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/islamrakibul9274/new-year-celebration-hub.git
cd new-year-celebration-hub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI="your_mongodb_connection_string"
AUTH_SECRET="your_jwt_auth_secret"
AUTH_URL="http://localhost:3000"

STRIPE_SECRET_KEY="your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="your_stripe_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your_stripe_publishable_key"

GROQ_API_KEY="your_groq_api_key"
RESEND_API_KEY="your_resend_api_key"

PUSHER_APP_ID="your_pusher_app_id"
NEXT_PUBLIC_PUSHER_KEY="your_pusher_key"
PUSHER_SECRET="your_pusher_secret"
NEXT_PUBLIC_PUSHER_CLUSTER="mt1"

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 📜 License
Distributed under the MIT License. Built with ❤️ for the New Year Celebration.
