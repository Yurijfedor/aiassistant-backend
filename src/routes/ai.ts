import { Router } from "express";
import { openai } from "../openai/client";

export const aiRouter = Router();

aiRouter.post("/stream", async (req, res) => {
  const { input } = req.body;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await openai.responses.stream({
    model: "gpt-4.1-mini",
    input,
  });
  console.log(stream);

  try {
    for await (const event of stream) {
      console.log(JSON.stringify(event));

      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }
  } catch {
    res.write(`event: error\ndata: {}\n\n`);
  } finally {
    res.end();
  }
});
