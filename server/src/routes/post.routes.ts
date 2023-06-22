import { Router } from "express";
import {
  getPostsController,
  getSinglePostController,
  modifyPostController,
  deletePostController,
  createPostController,
} from "../controllers/posts";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const postRoutes = Router();

postRoutes.delete("/", deletePostController);
postRoutes.post("/", createPostController);
postRoutes.get("/all", getPostsController);
postRoutes.get("/:id", getSinglePostController);
postRoutes.put("/:id", modifyPostController);

export { postRoutes };
