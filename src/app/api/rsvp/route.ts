import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { RSVP } from "@/models/RSVP";
import { localDB } from "@/lib/store";
import { getSession } from "@/lib/auth";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { guestName, guestEmail, guestsCount, passType, celebrationWish } = await req.json();

    if (!guestName || !guestEmail) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const session = await getSession();
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const ticketCode = `NYE-2026-${randomSuffix}`;

    const rsvpData = {
      userId: session?.userId || null,
      guestName: guestName.trim(),
      guestEmail: guestEmail.toLowerCase().trim(),
      guestsCount: guestsCount || 1,
      passType: passType || "standard",
      celebrationWish: celebrationWish || "Looking forward to an amazing year!",
      ticketCode,
      status: "confirmed",
    };

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      try {
        await RSVP.create(rsvpData);
      } catch {
        localDB.createRSVP(rsvpData);
      }
    } else {
      localDB.createRSVP(rsvpData);
    }

    // Send confirmation email via Resend
    try {
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_dummy") {
        await resend.emails.send({
          from: "Midnight Party RSVP <onboarding@resend.dev>",
          to: guestEmail,
          subject: `🎟️ Your Midnight Party Pass [${ticketCode}] Confirmed!`,
          html: `
            <div style="background-color: #0b0d14; color: #ffffff; padding: 32px; font-family: sans-serif; border-radius: 12px; border: 1px solid #272c3d;">
              <h1 style="color: #ff3366; margin-bottom: 8px;">You're on the Guest List! 🎆</h1>
              <p style="font-size: 16px; color: #d1d5db;">Hey ${guestName}, get ready for the most magical Midnight Celebration of the year!</p>
              
              <div style="background: rgba(255,51,102,0.1); border: 1px dashed #ff3366; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <p style="margin: 4px 0;"><strong>Ticket Code:</strong> <span style="font-family: monospace; font-size: 18px; color: #fbbf24;">${ticketCode}</span></p>
                <p style="margin: 4px 0;"><strong>Event:</strong> Midnight Party Celebration</p>
                <p style="margin: 4px 0;"><strong>Venue:</strong> New Park Hotel, Beach Garden Florida</p>
                <p style="margin: 4px 0;"><strong>Date:</strong> 31 December Night (7:30 PM - 12:30 AM)</p>
                <p style="margin: 4px 0;"><strong>Pass Type:</strong> ${passType.toUpperCase()}</p>
                <p style="margin: 4px 0;"><strong>Guests:</strong> ${guestsCount || 1} Person(s)</p>
              </div>
            </div>
          `,
        });
      }
    } catch {
      // Email dispatch non-blocking
    }

    return NextResponse.json({
      success: true,
      ticketCode,
      message: "RSVP successfully confirmed! Check your email for your digital ticket.",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to confirm RSVP" }, { status: 500 });
  }
}

export async function GET() {
  try {
    let totalCount = 240;
    let latestGuests: any[] = [];

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      try {
        const count = await RSVP.countDocuments({ status: "confirmed" });
        totalCount += count;
        latestGuests = await RSVP.find({ status: "confirmed" })
          .sort({ createdAt: -1 })
          .limit(8)
          .select("guestName passType celebrationWish createdAt");
      } catch {}
    }

    if (latestGuests.length === 0) {
      const localRsvps = localDB.getRSVPs();
      totalCount += localRsvps.length;
      latestGuests = localRsvps.slice(-8).reverse();
    }

    return NextResponse.json({ totalCount, latestGuests });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
