const router = require('express').Router();

import { getImagesByUserId, getAllUsers, getSingleUser, createUser, updateUser, deleteUser } from '../../controllers/userController';

router.route("/").get(getAllUsers).post(createUser)
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser)

export default router;
