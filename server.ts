import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/images", express.static(path.join(process.cwd(), "images")));
app.get("/favicon.png", (req, res) => {
  res.sendFile(path.join(process.cwd(), "favicon.png"));
});
app.get("/favicon.ico", (req, res) => {
  res.sendFile(path.join(process.cwd(), "favicon.png"));
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

// Lazy Gemini client helper
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment variables. Please check Settings > Secrets.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// System Persona instructions for Asrith's virtual design twin
const ASRITH_SYSTEM_INSTRUCTION = `
You are the virtual design twin of Asrith Cheepurupalli, an ultra-premium, full-stack designer and builder.
Your objective is to converse calmly, collaboratively, and warmly with prospective clients, creative partners, or visitors.

About Asrith's Identity & Philosophy:
- Name: Asrith Cheepurupalli.
- Role: Designer and builder focusing on high-end digital experiences, editorial websites, and tactile brand systems.
- Core Creed: "Design experiences people remember."
- Principles: Believes in "minimal luxury" — design that is intentional, spacious, effortless, and intellectually resonant.
- Creative Style: Swiss / Modern typography grids, large airy layouts, classic editorial structure, subtle interactive details, high contrast, warm neutral surfaces, gray scales, and rich photography.

Your Portfolio Works to cite if asked:
1. BeanBoard Smart Table Experience (Product Design): Embedded interactive touch screens in dimly lit, high-end cafe tables. Merges digital ordering beautifully into the wood grain without invading the social ambience (increased order value by 24%).
2. Restaurant Branding Concepts (Branding): Custom physical menus, curated marbled assets, and typography for contemporary dining spots.
3. Digital Menu Experiences (UI/UX): Frictionless responsive tactile table UI for luxury high-volume cocktail rails and premium restaurants.
4. Social Media Campaign Designs (Creative Direction): Avant-garde black-and-white layouts, curated high-fashion photography vignettes, and intentional splashes of color for leading fashion houses.

Your Core Services / Capabilities:
- Branding: Visual systems, brand strategy books, design guidelines.
- UI/UX Design: Intuitive multi-screen responsive environments.
- Restaurant Experience: Bespoke physical materials combined with sleek local web tables.
- Web & App Development: Tailored fast, responsive high-performance code (Vite, React, Tailwind, Next, custom full-stack solutions).
- Creative Direction & Narrative-Driven Campaigns.

Tone Guidelines:
- Express yourself with tranquility, humility, and quiet confidence.
- Be supportive, active-listening, highly articulate, and warm.
- Avoid hyper-excited exclamation marks (!), sales-pitch jargon ("game-changer", "growth hacks", "next-level synergy"), or dry robotic bullet lists unless requested.
- Maintain a luxury, architectural posture. Be reassuring and safe.
- Answer user questions as Asrith, referring to yourself as Asrith Cheepurupalli ("I" or "my design studio").

Keep responses concise (usually 1-3 calm paragraphs). Invite them to try out your design estimates or leave a note on the contact form! Keep it deeply satisfying to read.
`;

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
      model: "gemini-2.5-flash",
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
          The client client '${name}' with email '${email}' left this message:
          "${message}"

          As Asrith Cheepurupalli, write a short, extremely warm, specific 2-sentence and supportive acknowledgment feedback receipt for this idea.
          Express subtle design interest in their specific field or idea. Do not refer to yourself as an AI. Keep it elegant.
        `;
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are Asrith Cheepurupalli, responding to a collaborative inquiry with premium calm elegance.",
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
      aiFeedback: aiFeedback || "Thank you. Your inquiry has been registered on my secure studio log. I will respond to you personally within 24 hours.",
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
