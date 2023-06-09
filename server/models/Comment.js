const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  message: String,
  userId: String,
  postId: String,
  images: Array,
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;


// import { model } from "mongoose";

// const Comment = model("Comment", {
//   message: String,
//   userId: String,
//   postId: String,
//   images: Array,
// });

// export { Comment };
