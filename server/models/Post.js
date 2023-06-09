import mongoose from "mongoose";

const Post = mongoose.model("Post", {
  message: String,
  senderId: String,
  receiverId: String,
  createdAt: Date,
});

export { Post };
