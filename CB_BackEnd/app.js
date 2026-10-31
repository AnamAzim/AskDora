const path = require("path");
const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

dotenv.config();

for (const key of ["MONGO_URI", "JWT_SECRET"]) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

const authRoutes = require("./routes/authRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const isProd = process.env.NODE_ENV === "production";

// Render/Railway/Heroku sit behind a proxy - needed for secure cookies + rate limiting
app.set("trust proxy", 1);

app.use(helmet({ contentSecurityPolicy: false }));

// Only needed if the frontend is hosted on a different origin (local dev uses the CRA proxy)
if (process.env.CLIENT_URL) {
  app.use(
    cors({
      origin: process.env.CLIENT_URL.split(",").map((s) => s.trim()),
      credentials: true
    })
  );
}

app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Brute-force protection on login/register
app.use(
  "/api/auth/login",
  rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false })
);
app.use(
  "/api/auth/register",
  rateLimit({ windowMs: 60 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false })
);

app.use("/api/auth", authRoutes);
app.use("/api/chats", chatRoutes);
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// In production, serve the built React app from the same server (same origin = no cookie headaches)
const buildDir = path.join(__dirname, "..", "CB_FrontEnd", "build");
if (fs.existsSync(buildDir)) {
  app.use(express.static(buildDir));
  app.use((req, res, next) => {
    if (req.method !== "GET" || req.path.startsWith("/api")) return next();
    res.sendFile(path.join(buildDir, "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Doraemon Chatbot API is running!"));
}

app.use("/api", (req, res) => res.status(404).json({ message: "Not found" }));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (${isProd ? "production" : "development"})`));
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
