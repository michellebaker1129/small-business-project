const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  message: String,
  senderId: String,
  senderFullname: String,
  receiverId: String,
  receiverFullname: String,
  createdAt: Date,
});

const Post = model('Post', postSchema);

module.exports = Post;



// import mongoose from "mongoose";

// const Post = mongoose.model("Post", {
//   message: String,
//   senderId: String,
//   senderFullname: String,
//   receiverId: String,
//   receiverFullname: String,
//   createdAt: Date,
// });

// export { Post };
