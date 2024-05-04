const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../Utils/userRoles");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "filed must be a valid email"],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.admin, userRoles.user, userRoles.guest],
    default: userRoles.user,
  },
  avatar: {
    type: String,
    default: "uploads/avatar.jpej",
  },
});

module.exports = mongoose.model("User", userSchema);
