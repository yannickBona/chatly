import mongoose, { Error, Schema } from "mongoose";
import { FilterQuery } from "mongoose";
import { $LikeSchemaInterface } from "../types";
import { Post, Comment, Like } from "../models";

const LikeSchema = new Schema<$LikeSchemaInterface>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
});

/**
 * Middleware that adds the like to the post/comment
 */
LikeSchema.pre("save", async function (next) {
  if (!this.postId && !this.commentId) {
    const err = new Error("A postId or commentId is required to save a like.");
    return next(err);
  }

  if (this.postId) {
    const post = await Post.findById(this.postId);
    post?.likes.push(this.userId);
    await post?.save({ timestamps: false });
  }

  if (this.commentId) {
    const comment = await Comment.findById(this.commentId);
    comment?.likes.push(this.userId!);
    await comment?.save({ timestamps: false });
  }

  next();
});

/**
 * Middleware that deletes the like to the post/comment
 * this is done before deleting the actual like
 */
LikeSchema.pre(
  "findOneAndRemove",
  async function (this: FilterQuery<$LikeSchemaInterface>, next) {
    const { userId, postId } = this._conditions;
    const commentId = this.getQuery()["commentId"];

    if (postId) {
      const post = await Post.findById(postId);
      if (!post) return next(); // Check if post exists

      post.likes = post.likes.filter(
        (like) => like.toString() !== userId._id.toString()
      );
      await post.save({ timestamps: false });
    }

    if (commentId) {
      const comment = await Comment.findById(commentId);
      if (!comment) return next(); // Check if comment exists
      comment.likes = comment.likes.filter(
        (like) => like.toString() !== userId._id.toString()
      );
      await comment.save({ timestamps: false });
    }

    next();
  }
);

LikeSchema.methods.getPublicData = function (this: $LikeSchemaInterface) {
  return {
    userId: this.userId,
    commentId: this.commentId,
    postId: this.postId,
  };
};

export default LikeSchema;
