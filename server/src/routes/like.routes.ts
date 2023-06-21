import { Router } from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {
  createLikeOnCommentController,
  createLikeOnPostController,
  removeLikeOnPostController,
  removeLikeOnCommentController,
} from "../controllers/likes";

const likeRoutes = Router();

likeRoutes.post(
  "/post/:postId/comment/:commentId/",
  createLikeOnCommentController
);
likeRoutes.delete(
  "/post/:postId/comment/:commentId",
  removeLikeOnCommentController
);
likeRoutes.post("/post/:id", createLikeOnPostController);
likeRoutes.delete("/post/:id", removeLikeOnPostController);

export { likeRoutes };
