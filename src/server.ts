import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { aiRouter } from "./routes/ai";

const app = express();

app.options("*", cors());
const allowedOrigins = [
  "http://localhost:5173",
  "https://aiassistant-test-frontend.vercel.app",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // дозволяємо server-to-server та curl
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());

app.use("/ai", aiRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`🚀 AI backend running on http://localhost:${port}`);
});
