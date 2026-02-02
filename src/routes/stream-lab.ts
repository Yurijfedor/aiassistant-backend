import { Request, Response } from "express";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function streamLab(req: Request, res: Response) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();

  res.write("Пр");
  await sleep(200);
  res.write("ив");
  await sleep(200);
  res.write("іт");

  res.end();
}
