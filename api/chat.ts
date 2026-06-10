import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getGeminiClient, GEMINI_MODEL, ASRITH_SYSTEM_INSTRUCTION } from "../lib/gemini";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const { messages } = req.body ?? {};
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Messages array is required." });
      return;
    }

    const ai = getGeminiClient();

    // Map history to Google GenAI format. Gemini uses 'model' instead of 'assistant'.
    const formattedContents = messages.map((m: { role?: string; content?: string }) => {
      const isModel = m.role === "model" || m.role === "assistant";
      return {
        role: isModel ? "model" : "user",
        parts: [{ text: m.content || "" }],
      };
    });

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: formattedContents,
      config: {
        systemInstruction: ASRITH_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({
      error: error.message || "An error occurred during negotiation with the model.",
      isKeyMissing: !process.env.GEMINI_API_KEY,
    });
  }
}
