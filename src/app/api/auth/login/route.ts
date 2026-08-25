import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { localDB } from "@/lib/store";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    let foundUser: any = null;

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      try {
        foundUser = await User.findOne({ email: cleanEmail });
      } catch (e) {
        console.warn("Mongo find failed, checking local DB", e);
      }
    }

    if (!foundUser) {
      foundUser = localDB.findUserByEmail(cleanEmail);
    }

    if (!foundUser || !foundUser.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const sessionPayload = {
      userId: foundUser._id?.toString() || foundUser.userId,
      email: foundUser.email,
      name: foundUser.name,
      plan: foundUser.plan || "free",
      avatar: foundUser.avatar || "",
    };

    const token = signToken(sessionPayload);

    const response = NextResponse.json({
      success: true,
      user: sessionPayload,
      message: "Logged in successfully!",
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
    console.error("Login error:", error);
    return NextResponse.json({ error: error.message || "Failed to log in" }, { status: 500 });
  }
}
