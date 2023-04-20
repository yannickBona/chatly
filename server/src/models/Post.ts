import mongoose from "mongoose";
import Comments from "./Comment";
import { IPost } from "../types/models";
import { logger } from "../utils/general";

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

// Middleware to delete all comments related to the post before deleting the actual post
PostSchema.pre("findOneAndDelete", async function (next) {
  console.log("YO", this.getQuery());
  try {
    const postId = this.getQuery()["_id"];
    const postComments = await Comments.deleteMany({ postId });
    logger.info(
      `Deleted ${postComments.deletedCount} comments related to post ${postId}`
    );
  } catch {
    logger.info(`No comments found`);
  }
  next();
});

const postModel = mongoose.model("Post", PostSchema);

export default postModel;
