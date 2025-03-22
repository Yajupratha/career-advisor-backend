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

module.exports = router;
