import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import User from "./models/User";

// Controllers
import { getPostsController } from "./controller/posts/getPostsController";
import { createPostController } from "./controller/posts/createPostController";
import { getSinglePostController } from "./controller/posts/getSinglePostController";
import { deletePostController } from "./controller/posts/deletePostController";
import { createCommentController } from "./controller/comments/createCommentController";
import { getPostCommentsController } from "./controller/comments/getPostCommentsController";
import { createLikeOnPostController } from "./controller/likes/createLikeOnPostController";
import { removeLikeOnPostController } from "./controller/likes/removeLikeOnPostController";

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

/**
 * Cookie middleware, forces the cookie to the selected user before any request
 * This "fakes" an auth system
 */
let CURRENT_USER_ID: string;
(async () => {
  const response = await User.findOne({ username: "yan" });
  CURRENT_USER_ID = response?._id.toString() ?? "1";
})();

app.use((req, res, next) => {
  console.log(req.cookies.userId);
  if (req.cookies.userId !== CURRENT_USER_ID) {
    req.cookies.userId = CURRENT_USER_ID;
    res.clearCookie("userId");
    console.log(`Auth cookie set to ${CURRENT_USER_ID}`);
    res.cookie("userId", CURRENT_USER_ID, {
      maxAge: 3600000000,
      sameSite: "none",
      secure: true,
    });
  }

  next();
});

mongoose.set("strictQuery", false);

// Endpoints
app.get("/posts", getPostsController);
app.get("/posts/:id", getSinglePostController);
app.delete("/posts", deletePostController);
app.post("/createPost", createPostController);
app.post("/createComment", createCommentController);
app.get("/posts/:id/comments", getPostCommentsController);
app.post("/post/:id/like", createLikeOnPostController);
app.delete("/post/:id/like", removeLikeOnPostController);

// MONGO
console.log("Connecting to the db...");
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("connected to the DB");
    app.listen(process.env.PORT, () => {
      console.log(`listening on port ${process.env.PORT}..`);
    });
  })
  .catch((err) => {
    console.log(`Failed to connect to the DB: ${err}`);
  });
