require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

// Middleware
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: corsOptions,
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    if (userData && userData._id) {
      socket.join(userData._id);
      socket.emit("connected");
    }
  });

  socket.on("new message", (newMessageReceived) => {
    let chatUserId = newMessageReceived.receiverId;
    if (!chatUserId) return;
    socket.in(chatUserId).emit("message received", newMessageReceived);
  });
});

app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.get("/api/health", (req, res) => res.status(200).json({ status: "ok" }));
app.get("/", (req, res) =>
  res.status(200).json({
    message: "Room Roster backend is running",
    health: "/api/health",
  })
);
app.use("/api", (req, res) => {
  res.status(404).json({ message: "API route not found" });
});

// Port
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    server.listen(PORT, () => {
      console.log("Server running on port " + PORT + " 🚀");
    });
  })
  .catch((err) => {
    console.error("MongoDB Error ❌:", err);
    throw err; // Let it crash naturally to ensure the error log is flushed to Render
  });