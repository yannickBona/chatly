import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Like } from "../models";
import { logger } from "../../utils/helpers";
import { $CommentSchemaInterface } from "../types";

const { Schema } = mongoose;

const CommentSchema = new Schema<$CommentSchemaInterface>(
  {
    content: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    timestamps: {
      currentTime: () => Date.now() + 2 * 60 * 60 * 1000,
    }, // add createdAt and updatedAt fields and set them automatically
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

export default CommentSchema;
