import { Router } from "express";
import { openai } from "../openai/client";

export const aiRouter = Router();

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
    res.write(
      `event: error\ndata: ${JSON.stringify({ message: "stream failed" })}\n\n`,
    );
  } finally {
    res.end();
  }
});
