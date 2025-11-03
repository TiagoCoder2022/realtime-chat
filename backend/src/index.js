import dotenv from "dotenv";
dotenv.config();

console.log("🔍 CLIENT_URL:", process.env.CLIENT_URL);
console.log("🚀 NODE_ENV:", process.env.NODE_ENV);

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

console.log("🚀 NODE_ENV:", process.env.NODE_ENV);

dotenv.config();

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [process.env.CLIENT_URL || "http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

console.log("🌍 CORS habilitado para:", allowedOrigins);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDB();
});
