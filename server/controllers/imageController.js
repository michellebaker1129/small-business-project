const { Image } = require("../models");

module.exports = {
  // get images by user id
  // GET /api/images/user/:userId
  getImagesByUserId(req, res) {
    Image.find({ userId: req.params.userId })
      .then((dbImageData) => res.json(dbImageData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // get images by post id
  // GET /api/images/post/:postId
  getImagesByPostId(req, res) {
    Image.find({ postId: req.params.postId })
      .then((dbImageData) => res.json(dbImageData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // get image by id
  // GET /api/images/image/:imageId
  getImageById(req, res) {
    Image.findById(req.params.imageId)
      .then((dbImageData) => res.json(dbImageData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // post new image
  // POST /api/images/image
  createImage(req, res) {
    try {
      const imagesArray = [];
      req.images.forEach((file) => {
        const image = {
          userId: req.params.userId,
          postId: req.params.postId,
          imagePath: file.path
        };
        imagesArray.push(image);
      });

      Image.insertMany(imagesArray);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // delete image
  // DELETE /api/images/image/:imageId
  deleteImage(req, res) {
    Image.findByIdAndDelete(req.params.imageId)
      .then(() => res.json({ message: "Image deleted successfully" }))
      .catch((err) => {
        res.status(500).json(err);
      });
  }
};
