import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import database from "./database";
import { logger } from "./utils";

// Controllers
import {
  createCommentController,
  deleteCommentController,
  editCommentController,
  getPostCommentsController,
} from "./controllers/comments";

import {
  createLikeOnCommentController,
  createLikeOnPostController,
  removeLikeOnPostController,
  removeLikeOnCommentController,
} from "./controllers/likes";

import {
  createPostController,
  deletePostController,
  getPostsController,
  modifyPostController,
  getSinglePostController,
} from "./controllers/posts";

import {
  createUserController,
  loginUserController,
  sessionController,
  generateTokenController,
} from "./controllers/users";

// Middlewares
import { isAuthenticated } from "./middlewares/isAuthenticated";

dotenv.config();

// Server setup
const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  cors({
    origin: [process.env.CLIENT_URL!, "http://localhost:5173"],
    credentials: true,
  })
);

mongoose.set("strictQuery", false);

// Endpoints
app.get("/posts", isAuthenticated, getPostsController);
app.get("/posts/:id", getSinglePostController);
app.put("/posts/:id", modifyPostController);
app.delete("/posts", deletePostController);
app.post("/createPost", createPostController);
app.post("/createComment", createCommentController);
app.get("/posts/:id/comments", getPostCommentsController);
app.post("/post/:id/like", createLikeOnPostController);
app.delete("/post/:id/like", removeLikeOnPostController);
app.post(
  "/posts/:postId/comments/:commentId/like",
  createLikeOnCommentController
);
app.delete(
  "/posts/:postId/comments/:commentId/like",
  removeLikeOnCommentController
);
app.delete("/comment", deleteCommentController);
app.put("/comment", editCommentController);

app.post("/user/create", createUserController);
app.post("/user/login", loginUserController);
app.get("/user/session", isAuthenticated, sessionController);
app.post("/user/token", generateTokenController);

// MONGO
logger.info("Connecting to the db...");
database
  .connect()
  .then(() => {
    logger.info("DB Ready");
    app.listen(process.env.PORT, () => {
      logger.info(
        `Server listening on  >${process.env.API_URL}:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    logger.error(`Failed to connect to the DB: ${err}`);
  });
