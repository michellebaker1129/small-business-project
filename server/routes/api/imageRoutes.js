const router = require("express").Router();
import multer from 'multer';
const upload = multer({ dest: '../../uploads/' })

import { MAX_ALLOWED_PHOTOS_TO_UPLOAD } from "../../utils/constants";

import { getImagesByUserId, getImagesByPostId, getImageById, createImage, deleteImage } from "../../controllers/imageController";

router.route("/image/:imageId").get(getImageById);
router.route("/user/:userId").get(getImagesByUserId);
router.route("/post/:postId").get(getImagesByPostId);
router.post("/image/user/:userId/post/:postId", upload.array('images', MAX_ALLOWED_PHOTOS_TO_UPLOAD), createImage);

// router.route("/images/image/").all((req, res, next) => {
//     if (req.method !== "POST") {
//         next();
//     }

//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).json({
//             msg: "No file was uploaded."
//         });
//     }

//     // upload images from req.images
//     upload.array('images', MAX_ALLOWED_PHOTOS_TO_UPLOAD)
//         .then(() => {
//             next();
//         })
//         .catch(err => {
//             res.status(500).json({
//                 msg: "Error uploading files."
//             });
//         });
// }).post(createImage)
router.route("/image/:imageId").delete(deleteImage);

export default router;
