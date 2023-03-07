import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Controllers
import { getPostsController } from "./controller/posts/getPostsController";
import { createPostController } from "./controller/posts/createPostController";

const app = express();
app.use(express.json());

// Setup
app.use(cors());
mongoose.set("strictQuery", false);
dotenv.config();

// Endpoints
app.get("/", getPostsController);
app.post("/createPost", createPostController);

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
