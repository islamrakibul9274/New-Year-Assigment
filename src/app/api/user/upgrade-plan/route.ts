import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { localDB } from "@/lib/store";

export async function POST(req: Request) {
  try {
    const { planId } = await req.json();
    const session = await getSession();

    if (!session || !session.userId) {
      return NextResponse.json({ error: "Please sign in or create an account to upgrade your VIP pass." }, { status: 401 });
    }

    const validPlan = ["free", "silver", "diamond"].includes(planId) ? planId : "silver";

    const mongooseConn = await connectToDatabase();
    if (mongooseConn) {
      try {
        await User.findByIdAndUpdate(session.userId, { plan: validPlan });
      } catch {}
    }
    localDB.updateUser(session.userId, { plan: validPlan });

    return NextResponse.json({
      success: true,
      plan: validPlan,
      message: `Congratulations! Your account has been upgraded to ${validPlan.toUpperCase()} Pass!`,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Upgrade failed" }, { status: 500 });
  }
}
