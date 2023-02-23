import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    content: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    parentId: String,
    children: [String],
    like: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
  },
  {
    timestamps: true, // add createdAt and updatedAt fields and set them automatically
  }
);

const commentModel = mongoose.model("User", CommentSchema);

export default commentModel;
