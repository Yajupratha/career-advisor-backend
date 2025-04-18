const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json()); // Parse JSON requests

const userRoutes = require("./routes/userRoutes");
const careerRoutes = require("./routes/careerRoutes");

app.use("/api/users", userRoutes);
app.use("/api/careers", careerRoutes);

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected Successfully");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop the server if MongoDB fails
  }
};
connectDB();

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Career Advisor API!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
