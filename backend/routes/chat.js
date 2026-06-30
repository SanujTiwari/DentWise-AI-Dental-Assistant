import express from "express";
import { GoogleGenAI } from "@google/genai";
import { DENTAL_SYSTEM_PROMPT } from "../utils/dental-prompt.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST /api/chat
router.post("/", auth, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages are required." });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    });

    // Build conversation history for Gemini
    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        systemInstruction: DENTAL_SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    const text =
      response.text ?? "I'm sorry, I couldn't process that. Please try again.";

    res.json({ message: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Failed to get AI response. Please try again later." });
  }
});

export default router;
