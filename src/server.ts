import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { aiRouter } from "./routes/ai";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://<твоє-деплой-фронт-домен>"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/ai", aiRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`🚀 AI backend running on http://localhost:${port}`);
});
