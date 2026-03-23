require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Debug (optional)
console.log("ENV CHECK:", process.env.MONGO_URI);

// Middleware
app.use(cors({
  origin: "*"
}));

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

// Port
const PORT = process.env.PORT || 5000;

// MongoDB Connection + Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    ```
app.listen(PORT, () => {
  console.log(`Server running on port ${ PORT } 🚀`);
});
```

  })
  .catch((err) => {
    console.error("MongoDB Error ❌:", err);
    process.exit(1);
  });
