const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
  message: String,
  userId: String,
  postId: String,
  images: Array,
});

module.exports = { Comment };
