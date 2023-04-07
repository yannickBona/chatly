import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Comment",
  },
});

// On Cascade Deletion Middleware
// LikeSchema.pre("remove", async function (next) {
//   await this.model("Like").deleteMany({ user: this._id });
//   next();
// });

const postModel = mongoose.model("Post", PostSchema);

export default postModel;
