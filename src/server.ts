import dotenv from "dotenv";

import express from "express";
import cors from "cors";

import { aiRouter } from "./routes/ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/ai", aiRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`🚀 AI backend running on http://localhost:${port}`);
});
