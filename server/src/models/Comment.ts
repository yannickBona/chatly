import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Like from "./Like";
import { logger } from "../utils/general";

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    content: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      default: null,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    children: { type: [String], default: null },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
        default: [],
      },
    ],
  },
  {
    timestamps: true, // add createdAt and updatedAt fields and set them automatically
  }
);

/**
 * This deletes all likes associated to the comments
 */
CommentSchema.pre("deleteMany", async function (next) {
  const postId = this.getQuery()["postId"]; // Get the IDs of the comments being deleted
  const deletedComments = await this.model.find({ postId });

  // Delete all likes associated with the comments.
  const deletedCommentIds = deletedComments.map((comment) => comment._id);
  const commentLikes = await Like.deleteMany({
    commentId: { $in: deletedCommentIds },
  });

  logger.info(
    `Deleted ${commentLikes.deletedCount} likes related to comments ${deletedCommentIds}`
  );
  next();
});

/**
 * This deletes all likes associated to the comment
 */
CommentSchema.pre("deleteOne", async function (next) {
  const commentId = this.getQuery()["_id"];
  await Like.deleteMany({ commentId: commentId });
  next();
});

const commentModel = mongoose.model("Comment", CommentSchema);

export default commentModel;
