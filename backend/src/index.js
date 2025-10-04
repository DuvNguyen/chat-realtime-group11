import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/messages.js";
import { createSocketServer } from "./services/sockets.js";
import { startQueueConsumer } from "./services/sqs.js";

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.get("/health", (_, res) => res.json({ ok: true }));

createSocketServer(server, process.env.CORS_ORIGIN || "*");

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    const safeUri = process.env.MONGO_URI?.replace(/\/\/.*:.*@/, "//***:***@");
    console.log("Connecting Mongo with URI:", safeUri);

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // 10s
    });

    console.log("MongoDB connected");

    await startQueueConsumer?.(async () => {});

    server.listen(PORT, () => {
      console.log("Server listening on port", PORT);
    });
  } catch (e) {
    console.error("Failed to start server:", e.message);
    process.exit(1);
  }
})();
