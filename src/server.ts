import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { aiRouter } from "./routes/ai";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "aiassistant-frontend-eight.vercel.app",
  "aiassistant-frontend-git-main-yuriy-shaklaks-projects.vercel.app",
  "aiassistant-frontend-6mhdfzqcv-yuriy-shaklaks-projects.vercel.app", // твій live Vercel frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked for origin: ${origin}`));
      }
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

app.use("/ai", aiRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`🚀 AI backend running on http://localhost:${port}`);
});
