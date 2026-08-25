import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { localDB } from "@/lib/store";
import { signToken } from "@/lib/auth";
import { resend } from "@/lib/resend";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const mongooseConn = await connectToDatabase();
    let createdUser: any = null;

    if (mongooseConn) {
      try {
        const existingUser = await User.findOne({ email: cleanEmail });
        if (existingUser) {
          return NextResponse.json({ error: "Email is already registered. Please login." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userDoc = await User.create({
          name: name.trim(),
          email: cleanEmail,
          password: hashedPassword,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
          plan: "free",
        });

        createdUser = {
          userId: userDoc._id.toString(),
          name: userDoc.name,
          email: userDoc.email,
          plan: userDoc.plan,
          avatar: userDoc.avatar,
        };
      } catch (mongoErr) {
        console.warn("MongoDB write failed, falling back to local DB", mongoErr);
      }
    }

    // Fallback to local persistent store if MongoDB unavailable
    if (!createdUser) {
      const existingUser = localDB.findUserByEmail(cleanEmail);
      if (existingUser) {
        return NextResponse.json({ error: "Email is already registered. Please login." }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const userDoc = localDB.createUser({
        name: name.trim(),
        email: cleanEmail,
        password: hashedPassword,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
        plan: "free",
        themePreference: "festive-crimson",
        confettiSoundsEnabled: true,
        customGreeting: "Happy New Year! Wishing you boundless joy and prosperity!",
        bio: "Ready to celebrate and achieve great milestones this year!",
      });

      createdUser = {
        userId: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        plan: userDoc.plan,
        avatar: userDoc.avatar,
      };
    }

    // Send welcome email via Resend in background
    try {
      if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_dummy") {
        await resend.emails.send({
          from: "New Year Celebration <onboarding@resend.dev>",
          to: cleanEmail,
          subject: "🎉 Welcome to the Ultimate New Year Celebration Hub!",
          html: `
            <div style="background-color: #0d0f17; color: #f3f4f6; padding: 30px; font-family: sans-serif; border-radius: 12px;">
              <h1 style="color: #ff3366;">Happy New Year, ${createdUser.name}! 🎆</h1>
              <p>Welcome to the official New Year Midnight Celebration & Resolution Hub.</p>
              <p>Your account is ready! Explore our VIP Party Pass, generate AI resolutions, and join the Live Countdown Lounge.</p>
            </div>
          `,
        });
      }
    } catch {
      // Non-blocking
    }

    const token = signToken(createdUser);

    const response = NextResponse.json({
      success: true,
      user: createdUser,
      message: "Registration successful!",
    });

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: error.message || "Failed to register" }, { status: 500 });
  }
}
