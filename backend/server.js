const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// Import Routes
const authRoutes = require("./routes/authRoutes");
const pgRoutes = require("./routes/pgRoutes");
const roomRoutes = require("./routes/roomRoutes");
const residentRoutes = require("./routes/residentRoutes");


// Route Middlewares
app.use("/api/auth", authRoutes);
app.use("/api/pgs", pgRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/residents", residentRoutes);


// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/roomroster")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// Test Route
app.get("/", (req, res) => {
  res.send("RoomRoster API Running");
});


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});