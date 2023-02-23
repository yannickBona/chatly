import mongoose from "mongoose";

const { Schema } = mongoose;

const LikeSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const likeModel = mongoose.model("Like", LikeSchema);

export default likeModel;
