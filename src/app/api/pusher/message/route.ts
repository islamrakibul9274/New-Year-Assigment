import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { message, senderName, avatar } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const session = await getSession();
    const payload = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: senderName || session?.name || "Party Guest",
      avatar: avatar || session?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(senderName || "Guest")}`,
      plan: session?.plan || "free",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    await pusherServer.trigger("live-party-room", "new-message", payload);

    return NextResponse.json({ success: true, message: payload });
  } catch (error: any) {
    console.error("Pusher message error:", error);
    return NextResponse.json({ error: error.message || "Failed to broadcast message" }, { status: 500 });
  }
}
