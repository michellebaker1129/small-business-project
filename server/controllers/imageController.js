import { Image } from "../models";

export function getImagesByUserId(req, res) {
  Image.find({ userId: req.params.userId })
    .then((dbImageData) => res.json(dbImageData))
    .catch((err) => {
      res.status(500).json(err);
    });
}
export function getImagesByPostId(req, res) {
  Image.find({ postId: req.params.postId })
    .then((dbImageData) => res.json(dbImageData))
    .catch((err) => {
      res.status(500).json(err);
    });
}
export function getImageById(req, res) {
  Image.findById(req.params.imageId)
    .then((dbImageData) => res.json(dbImageData))
    .catch((err) => {
      res.status(500).json(err);
    });
}
export function createImage(req, res) {
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
}
export function deleteImage(req, res) {
  Image.findByIdAndDelete(req.params.imageId)
    .then(() => res.json({ message: "Image deleted successfully" }))
    .catch((err) => {
      res.status(500).json(err);
    });
}
