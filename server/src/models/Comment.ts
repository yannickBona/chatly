import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Post from "./Post";

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

const commentModel = mongoose.model("Comment", CommentSchema);

export default commentModel;
