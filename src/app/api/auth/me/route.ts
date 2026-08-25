import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { localDB } from "@/lib/store";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ user: null });
    }

    let user: any = null;
    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      try {
        user = await User.findById(session.userId).select("-password");
      } catch {}
    }

    if (!user) {
      user = localDB.findUserById(session.userId);
    }

    if (!user) {
      return NextResponse.json({
        user: {
          userId: session.userId,
          name: session.name,
          email: session.email,
          avatar: session.avatar,
          plan: session.plan || "free",
        },
      });
    }

    return NextResponse.json({
      user: {
        userId: user._id?.toString() || user.userId,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        plan: user.plan || "free",
        themePreference: user.themePreference || "festive-crimson",
        confettiSoundsEnabled: user.confettiSoundsEnabled ?? true,
        customGreeting: user.customGreeting || "Happy New Year!",
        bio: user.bio || "",
        createdAt: user.createdAt,
      },
    });
  } catch {
    return NextResponse.json({ user: null });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    let updatedUser: any = null;

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      try {
        updatedUser = await User.findByIdAndUpdate(
          session.userId,
          {
            name: body.name,
            avatar: body.avatar,
            themePreference: body.themePreference,
            confettiSoundsEnabled: body.confettiSoundsEnabled,
            customGreeting: body.customGreeting,
            bio: body.bio,
          },
          { new: true }
        ).select("-password");
      } catch {}
    }

    if (!updatedUser) {
      updatedUser = localDB.updateUser(session.userId, {
        name: body.name,
        avatar: body.avatar,
        themePreference: body.themePreference,
        confettiSoundsEnabled: body.confettiSoundsEnabled,
        customGreeting: body.customGreeting,
        bio: body.bio,
      });
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
