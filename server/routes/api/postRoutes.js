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

module.exports = router;