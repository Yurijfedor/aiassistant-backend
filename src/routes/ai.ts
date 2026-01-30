import { Router } from "express";
import cors from "cors";
import { openai } from "../openai/client";

export const aiRouter = Router();

// 🔥 ЯВНО обробляємо preflight для цього endpoint
aiRouter.options(
  "/stream",
  cors({
    origin: [
      "http://localhost:5173",
      "https://aiassistant-test-frontend.vercel.app",
    ],
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

aiRouter.post("/stream", async (req, res) => {
  const { input } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const stream = await openai.responses.stream({
    model: "gpt-4.1-mini",
    input,
  });

  try {
    for await (const event of stream) {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }
  } catch (err) {
    res.write(`event: error\ndata: {}\n\n`);
  } finally {
    res.end();
  }
});
