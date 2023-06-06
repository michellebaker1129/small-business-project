const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
  message: String,
  senderId: String,
  receiverId: String,
  createdAt: Date,
});

module.exports = { Post };
