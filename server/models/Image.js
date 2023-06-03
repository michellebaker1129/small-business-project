const mongoose = require("mongoose");

const Image = mongoose.model("Image", {
  url: String,
  userId: String,
});

module.exports = { Image };
