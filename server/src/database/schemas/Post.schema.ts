import mongoose from "mongoose";
import Comments from "./Comment.schema";
import { logger } from "../../utils/helpers";
import { Post, Comment, Like, User } from "../models";

import { $PostSchemaInterface } from "../types";

const { Schema } = mongoose;

const PostSchema = new Schema<$PostSchemaInterface>(
  {
    title: String,
    body: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
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
    timestamps: {
      currentTime: () => Date.now() + 2 * 60 * 60 * 1000,
    }, // add createdAt and updatedAt fields and set them automatically
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

PostSchema.methods.getPublicData = async function (this: $PostSchemaInterface) {
  const user = await User.findById(this.user);

  return {
    _id: this._id,
    title: this.title,
    body: this.body,
    likes: this.likes,
    comments: this.comments,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    owner: user ? user.username : null,
  };
};

export default PostSchema;
