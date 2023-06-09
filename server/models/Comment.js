import { model } from "mongoose";

const Comment = model("Comment", {
  message: String,
  userId: String,
  postId: String,
  images: Array,
});

export { Comment };
