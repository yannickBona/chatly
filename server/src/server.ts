import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Controllers
import { getPostsController } from "./controller/posts/getPostsController";
import { createPostController } from "./controller/posts/createPostController";
import { getSinglePostController } from "./controller/posts/getSinglePostController";
import { deletePostController } from "./controller/posts/deletePostController";
import { createCommentController } from "./controller/comments/createCommentController";

dotenv.config();

// Server setup
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL!, "http://localhost:5173"],
    credentials: true,
  })
);

mongoose.set("strictQuery", false);

// Endpoints
app.get("/posts", getPostsController);
app.get("/posts/:id", getSinglePostController);
app.delete("/posts", deletePostController);
app.post("/createPost", createPostController);
app.post("/createComment", createCommentController);

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
