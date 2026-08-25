import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Newsletter } from "@/models/Newsletter";
import { localDB } from "@/lib/store";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      try {
        await Newsletter.create({ email: cleanEmail, source: "homepage_footer" });
      } catch {}
    }
    localDB.createNewsletter(cleanEmail);

    try {
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_dummy") {
        await resend.emails.send({
          from: "New Year Celebration <onboarding@resend.dev>",
          to: cleanEmail,
          subject: "✨ You are Subscribed to 2026 Holiday Specials & Secret Perks!",
          html: `
            <div style="background-color: #0b0d14; color: #ffffff; padding: 24px; font-family: sans-serif; border-radius: 12px;">
              <h2 style="color: #f59e0b;">Welcome to the Inner Circle! 🥂</h2>
              <p>You'll be the first to receive exclusive party invites, 65% OFF holiday vouchers, and secret New Year giveaways.</p>
              <p style="color: #ff3366; font-weight: bold;">Promo Code for 15% EXTRA OFF: <span style="font-family: monospace; background: #272c3d; padding: 4px 8px; border-radius: 4px;">FESTIVE15</span></p>
            </div>
          `,
        });
      }
    } catch {}

    return NextResponse.json({ success: true, message: "Thank you for subscribing! Check your inbox for secret holiday perks." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Subscription failed" }, { status: 500 });
  }
}
