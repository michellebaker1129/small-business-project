const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  url: String,
  userId: String,
});

const Image = model('Image', imageSchema);

module.exports = Image;


// import { model } from "mongoose";

// const Image = model("Image", {
//   url: String,
//   userId: String,
// });

// export { Image };
