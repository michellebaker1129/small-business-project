// TODO: old code

const router = require("express").Router();

const {
  getImagesByPostId,
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} = require("../../controllers/postController");

router.route("/").get(getAllPosts).post(createPost)
router.route("/:postId").get(getSinglePost).put(updatePost).delete(deletePost)
router.route("/:postId/images").get(getImagesByPostId); //get all images by post id

module.exports = router;