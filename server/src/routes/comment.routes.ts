import { Router } from "express";
import {
  createCommentController,
  deleteCommentController,
  editCommentController,
  getPostCommentsController,
} from "../controllers/comments";
import { requiresAuth } from "../middlewares/requiresAuth";

const commentRoutes = Router();

commentRoutes.use(requiresAuth);

commentRoutes.delete("/", deleteCommentController);
commentRoutes.put("/", editCommentController);
commentRoutes.post("/", createCommentController);
commentRoutes.get("/post/:id", getPostCommentsController);

export { commentRoutes };
