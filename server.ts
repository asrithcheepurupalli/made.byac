import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { getGeminiClient, GEMINI_MODEL, ASRITH_SYSTEM_INSTRUCTION } from "./lib/gemini";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use("/images", express.static(path.join(process.cwd(), "public", "images")));
app.get("/favicon.png", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "favicon.png"));
});
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "favicon.png"));
});

// In-memory contact submission log
interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  aiFeedback?: string;
}
const submissions: ContactSubmission[] = [];

// Gemini client + studio persona are shared with the serverless API in lib/gemini.ts.

// Helper to determine if Gemini key is available
app.get("/api/gemini/status", (req, res) => {
  const isAvailable = !!process.env.GEMINI_API_KEY;
  res.json({ available: isAvailable });
});

// API chat route with streaming support or standard JSON
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Messages array is required." });
      return;
    }

    const ai = getGeminiClient();

    // Map history to Google GenAI format: { role: 'user' | 'model', parts: [{ text: ... }] }
    // Ensure roles are strictly 'user' or 'model'. Gemini uses 'model' instead of 'assistant'
    const formattedContents = messages.map((m) => {
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
});

// API Contact form submission with automated premium AI acknowledgment receipt
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required." });
      return;
    }

    let aiFeedback = "";
    const hasKey = !!process.env.GEMINI_API_KEY;

    if (hasKey) {
      try {
        const ai = getGeminiClient();
        const prompt = `
          The client '${name}' with email '${email}' left this message:
          "${message}"

          As the made. by ac studio team, write a short, extremely warm, specific 2-sentence and supportive acknowledgment feedback receipt for this idea.
          Use the first-person plural ("we" / "our studio"). Express subtle design interest in their specific field or idea. Do not refer to yourself as an AI. Keep it elegant.
        `;
        const response = await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt,
          config: {
            systemInstruction: "You are the made. by ac studio team, responding to a collaborative inquiry with premium calm elegance in the first-person plural (we/our studio).",
            temperature: 0.8,
          },
        });
        aiFeedback = response.text || "";
      } catch (geminiError) {
        console.warn("AI Feedback generation failed, skipping feedback.", geminiError);
      }
    }

    const newSubmission: ContactSubmission = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      aiFeedback: aiFeedback || "Thank you. Your inquiry has been registered on our secure studio log. We will respond to you personally within 24 hours.",
    };

    submissions.push(newSubmission);
    res.json({ success: true, submission: newSubmission });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Something went wrong." });
  }
});

// Get submissions (for simulation / showing the interaction in a premium dashboard)
app.get("/api/contact/submissions", (req, res) => {
  res.json(submissions);
});

// Start Express and integrate Vite
async function startServer() {
  const devMode = process.env.NODE_ENV !== "production";

  if (devMode) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets compiled inside /dist
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Studio Portfolio Service] Running at http://0.0.0.0:${PORT} under NODE_ENV=${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();
