import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { connectToDatabase } from "@/lib/db";
import { Resolution } from "@/models/Resolution";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { prompt, type, category, authorName } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const session = await getSession();

    let systemPrompt = "";
    if (type === "card") {
      systemPrompt = `You are a festive, poetic, and heartwarming New Year Greeting Card Writer. 
Generate a beautifully styled New Year Card message based on the user's prompt. 
Format your response as strict JSON with this shape:
{
  "title": "A catchy title for the greeting card",
  "quote": "A poetic 2-4 sentence festive greeting message full of warmth and celebration",
  "wishes": ["3 distinct bullet-point wishes for health, prosperity, and joy"],
  "signature": "A warm festive sign-off"
}`;
    } else {
      systemPrompt = `You are a world-class New Year Resolution Strategist and Life Coach.
Turn the user's goal/theme into an inspiring, actionable, step-by-step New Year Resolution plan.
Format your response as strict JSON with this shape:
{
  "title": "Inspiring goal title",
  "category": "Health & Fitness" | "Career & Tech" | "Mindfulness" | "Financial Freedom" | "Travel & Fun",
  "motivationalQuote": "A punchy, memorable motto for the year",
  "milestones": [
    "Q1 (Jan-Mar) milestone with concrete habit",
    "Q2 (Apr-Jun) milestone with progress metric",
    "Q3 (Jul-Sep) milestone with expansion",
    "Q4 (Oct-Dec) celebration & mastery target"
  ],
  "actionTip": "A golden rule for daily execution"
}`;
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate for: ${prompt}. Category: ${category || "Career & Tech"}` },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const responseContent = completion.choices[0]?.message?.content || "{}";
    const parsedData = JSON.parse(responseContent);

    // Save to database if resolution
    if (type !== "card") {
      await connectToDatabase();
      await Resolution.create({
        userId: session?.userId || null,
        userEmail: session?.email || "guest@celebration.app",
        authorName: authorName || session?.name || "Festive Dreamer",
        goal: parsedData.title || prompt,
        category: category || "Career & Tech",
        milestones: parsedData.milestones || [],
        motivationalQuote: parsedData.motivationalQuote || "",
        aiPrompt: prompt,
      });
    }

    return NextResponse.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Groq AI generation error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate AI content" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const resolutions = await Resolution.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .limit(12);
    return NextResponse.json({ resolutions });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
