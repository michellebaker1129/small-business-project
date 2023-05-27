// TODO: old code

const router = require("express").Router();

const {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  addReaction,
  deleteReaction,
} = require("../../controllers/postController");

router.route("/").get(getAllPosts).post(createPost)
router.route("/:postId").get(getSinglePost).put(updatePost).delete(deletePost)
router.route("/:postId/reactions").post(addReaction)
router.route("/:postId/reactions/:reactionId").delete(deleteReaction)

module.exports = router;