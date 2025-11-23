// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const os = require("os");
const path = require("path");

// Load .env
dotenv.config();

// MongoDB connection
const connectDB = require("./config/db");

// Express App
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "../FrontendTripzo")));

// Request logger
app.use((req, res, next) => {
  console.log(`➡ ${req.method} ${req.originalUrl}`);
  next();
});

// Routes Import
const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otpRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const tripRoutes = require("./routes/tripRoutes");
const distanceRoute = require("./routes/distanceRoute");
const weatherRoute = require("./routes/weatherRoute");
const chatRoute = require("./routes/chatRoute");
const contactRoute = require("./routes/contactRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api", weatherRoute);
app.use("/api", distanceRoute);
app.use("/api/chat", chatRoute);
app.use("/api/contacts", contactRoute);

// Health Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Root
app.get("/", (req, res) => {
  res.json({
    msg: "Tripzo Backend API Running 🚀",
    time: new Date().toISOString()
  });
});

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Utility to get local network IP
function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name in nets) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
}

// Start Server
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  const ip = getLocalIp();

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log("\n===============================");
    console.log("🚀 Tripzo Backend Server Running");
    console.log(`➡ Local:   http://localhost:${PORT}`);
    console.log(`➡ Network: http://${ip}:${PORT}`);
    console.log("===============================\n");
  });

  // Graceful Shutdown
  process.on("SIGTERM", () => {
    console.log("👋 SIGTERM received");
    server.close(() => console.log("Server closed gracefully"));
  });

  process.on("SIGINT", () => {
    console.log("👋 SIGINT received");
    server.close(() => console.log("Server closed gracefully"));
  });
});

module.exports = app;