import { Router } from "express";
import {
  createCommentController,
  deleteCommentController,
  editCommentController,
  getPostCommentsController,
} from "../controllers/comments";

const commentRoutes = Router();

commentRoutes.delete("/", deleteCommentController);
commentRoutes.put("/", editCommentController);
commentRoutes.post("/", createCommentController);
commentRoutes.get("/post/:id", getPostCommentsController);

export { commentRoutes };
