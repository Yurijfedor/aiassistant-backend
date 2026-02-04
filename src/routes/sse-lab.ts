import { Request, Response } from "express";

export async function sseLab(req: Request, res: Response) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let i = 0;

  const interval = setInterval(() => {
    res.write(`data: chunk ${i++}\n\n`);
  }, 300);

  req.on("close", () => {
    clearInterval(interval);
    console.log("SSE closed");
  });
}
