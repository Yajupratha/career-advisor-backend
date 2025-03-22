const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String], // Array of skills
  interests: [String], // Array of interests
});

module.exports = mongoose.model("User", UserSchema);
