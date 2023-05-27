// TODO: old code

const router = require('express').Router();

const {
  getImagesByUserId,
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

router.route("/").get(getAllUsers).post(createUser)
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser)
router.route("/:userId/images").get(getImagesByUserId); //get all images by user id

module.exports = router;