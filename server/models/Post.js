const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
  message: String,
  senderId: String,
  receiverId: String,
  comments: Array,
  images: Array,
  createdAt: Date,
});

module.exports = { Post };
