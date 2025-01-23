import express from 'express';
import { createPost,deletePost,commentOnPost,likeUnlikePost } from '../controllers/post.contorller.js';
import { protectRoute } from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/create",protectRoute,createPost);
router.post("/like/:id",protectRoute,likeUnlikePost);
router.post("/comment/:id",protectRoute,commentOnPost);
router.delete('/:id',protectRoute,deletePost);

export default router;