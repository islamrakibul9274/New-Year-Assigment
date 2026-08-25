import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { localDB } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();
    const session = await getSession();

    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let planToSet = "silver";

    if (sessionId && process.env.STRIPE_SECRET_KEY) {
      try {
        const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);
        planToSet = stripeSession.metadata?.planId || "silver";
      } catch (e) {
        console.warn("Stripe session retrieve skipped or test mode:", e);
      }
    }

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      try {
        await User.findByIdAndUpdate(session.userId, { plan: planToSet });
      } catch {}
    }
    localDB.updateUser(session.userId, { plan: planToSet });

    return NextResponse.json({ success: true, plan: planToSet });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
