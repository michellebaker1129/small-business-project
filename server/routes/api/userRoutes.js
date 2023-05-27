// TODO: old code

const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

router.route("/").get(getAllUsers).post(createUser)
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser)

module.exports = router;