const mongoose = require("mongoose");

const User = mongoose.model("User", {
  fullname: { type: String },
  email: { type: String, unique: true },
  phoneNumber: { type: String },
  address: { type: String },
  address2: { type: String, default: "" },
  city: { type: String },
  state: { type: String },
  zip: { type: String },
  country: { type: String },
  role: { type: String },
  password: { type: String },
  token: { type: String },
  createdAt: { type: String },
  updatedAt: { type: String },
});

module.exports = { User };
