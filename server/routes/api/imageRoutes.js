// TODO import User, Post controllers
const router = require("express").Router();
const {
    getImageById,
} = require("../../controllers/postController");


// create a route to get all images by user id




// TODO get image by id
// GET /api/images/:imageId
router.route("/images/imageId").get(getImageById);