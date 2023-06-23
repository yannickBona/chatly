import { Router } from "express";
import { requiresAuth } from "../middlewares/requiresAuth";
import {
  createLikeOnCommentController,
  createLikeOnPostController,
  removeLikeOnPostController,
  removeLikeOnCommentController,
} from "../controllers/likes";

const likeRoutes = Router();

likeRoutes.use(requiresAuth);

likeRoutes.post("/post/:postId/comment/:id/", createLikeOnCommentController);
likeRoutes.delete("/post/:postId/comment/:id", removeLikeOnCommentController);
likeRoutes.post("/post/:id", createLikeOnPostController);
likeRoutes.delete("/post/:id", removeLikeOnPostController);

export { likeRoutes };
