const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a new user
router.post("/register", async (req, res) => {
  try {
    const { name, email, skills, interests } = req.body;
    const user = new User({ name, email, skills, interests });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Login user
router.post("/login", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
