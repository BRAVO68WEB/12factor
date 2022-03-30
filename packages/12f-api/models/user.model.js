const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  Name: {
    First: { type: String, required: true },
    Last: { type: String, required: true },
  },
  ProfileType: {
    type: String,
    enum: ["Author", "Viewer", "Admin"],
    default: "Viewer",
  },
  ProfileImage: { type: String },
  Email: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    require: true,
  },
  salt: { type: String },
  hash: { type: String },
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

module.exports = mongoose.model("User", userSchema);
