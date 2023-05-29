const router = require("express").Router();

import { getImagesByPostId, getAllPosts, getSinglePost, createPost, updatePost, deletePost } from "../../controllers/postController";

router.route("/").get(getAllPosts).post(createPost)
router.route("/:postId").get(getSinglePost).put(updatePost).delete(deletePost)

export default router;
