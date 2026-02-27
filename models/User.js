const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    validate: {
      validator: (v) => v.length >= 8,
      message: "Password must be 8 characters or more.",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
