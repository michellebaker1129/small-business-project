import { model } from "mongoose";

const Image = model("Image", {
  url: String,
  userId: String,
});

export { Image };
