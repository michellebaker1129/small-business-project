const mongoose = require("mongoose");

const Post = mongoose.model("Post", {
  message: String,
  userId: String,
  comments: Array,
  images: Array,
});

module.exports = { Post };
