import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getGeminiClient, GEMINI_MODEL } from "../lib/gemini";

// NOTE: Serverless functions are stateless, so submissions are not persisted
// across invocations here. The form still returns a warm AI acknowledgment.
// A real datastore (Vercel KV / Postgres) can be wired in during the upgrade pass.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const { name, email, message } = req.body ?? {};
    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required." });
      return;
    }

    let aiFeedback = "";
    if (process.env.GEMINI_API_KEY) {
      try {
        const ai = getGeminiClient();
        const prompt = `
          The client '${name}' with email '${email}' left this message:
          "${message}"

          As Asrith Cheepurupalli, write a short, extremely warm, specific 2-sentence and supportive acknowledgment feedback receipt for this idea.
          Express subtle design interest in their specific field or idea. Do not refer to yourself as an AI. Keep it elegant.
        `;
        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt,
          config: {
            systemInstruction:
              "You are Asrith Cheepurupalli, responding to a collaborative inquiry with premium calm elegance.",
            temperature: 0.8,
          },
        });
        aiFeedback = response.text || "";
      } catch (geminiError) {
        console.warn("AI Feedback generation failed, skipping feedback.", geminiError);
      }
    }

    const submission = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      aiFeedback:
        aiFeedback ||
        "Thank you. Your inquiry has been registered on my secure studio log. I will respond to you personally within 24 hours.",
    };

    res.json({ success: true, submission });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Something went wrong." });
  }
}
