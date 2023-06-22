import { Router } from "express";
import {
  getPostsController,
  getSinglePostController,
  modifyPostController,
  deletePostController,
  createPostController,
} from "../controllers/posts";
import { requiresAuth } from "../middlewares/requiresAuth";

const postRoutes = Router();

postRoutes.use(requiresAuth);

postRoutes.delete("/", deletePostController);
postRoutes.post("/", createPostController);
postRoutes.get("/all", getPostsController);
postRoutes.get("/:id", getSinglePostController);
postRoutes.put("/:id", modifyPostController);

export { postRoutes };
