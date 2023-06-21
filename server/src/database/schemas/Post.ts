import mongoose from "mongoose";
import Comments from "./Comment";
import { logger } from "../../utils";
import { Post, Comment, Like } from "../models";

import { $PostSchemaInterface } from "../types";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    title: String,
    body: String,
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Like",
    },
    comments: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Comment",
    },
  },
  {
    timestamps: true, // add createdAt and updatedAt fields and set them automatically
  }
);

// Middleware to delete all comments and likes related to the post before deleting the actual post
PostSchema.pre("findOneAndDelete", async function (next) {
  try {
    const postId = this.getQuery()["_id"];
    const postComments = await Comment.deleteMany({ postId });
    const postLikes = await Like.deleteMany({ postId });

    logger.info(
      `Deleted ${postLikes.deletedCount} likes related to post ${postId}`
    );

    logger.info(
      `Deleted ${postComments.deletedCount} comments related to post ${postId}`
    );
  } catch (err) {
    logger.error(`No comments found`, err);
  }
  next();
});

export default PostSchema;
