import { NextResponse } from "next/server";
import { FEEDBACK_PROMPT } from "@/services/Constants";

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const apiKey = process.env.GEMINI_API_KEY;

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: FINAL_PROMPT }],
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log("FULL RESPONSE:", JSON.stringify(data, null, 2));

    const rawOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const cleaned = rawOutput
      .replace(/```json\s*/, "")
      .replace(/```[\s\n]*$/, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return NextResponse.json(parsed); 
  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json(
      { error: "Failed to generate feedback" },
      { status: 500 }
    );
  }
}
