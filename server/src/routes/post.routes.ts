import { Router } from "express";
import controller from "../controllers/posts";
import { requiresAuth } from "../middlewares/requiresAuth";

const postRoutes = Router();

postRoutes.use(requiresAuth);

postRoutes.get("/all", controller.getPosts);
postRoutes.get("/all/random", controller.getRandomPosts);
postRoutes.get("/:id", controller.getSinglePost);

postRoutes.post("/", controller.createPost);

postRoutes.put("/:id", controller.modifyPost);

postRoutes.delete("/", controller.deletePost);

export { postRoutes };
