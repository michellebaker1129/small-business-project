import mongoose from "mongoose";

const Post = mongoose.model("Post", {
  message: String,
  senderId: String,
  senderFullname: String,
  receiverId: String,
  receiverFullname: String,
  createdAt: Date,
});

export { Post };
