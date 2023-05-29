const router = require('express').Router();

import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import imageRoutes from "./imageRoutes";

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/images', imageRoutes);

export default router;
