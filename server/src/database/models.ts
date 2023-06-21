import mongoose from "mongoose";
import UserSchema from "./schemas/User.schema";
import PostSchema from "./schemas/Post.schema";
import CommentSchema from "./schemas/Comment.schema";
import LikeSchema from "./schemas/Like.schema";
import {
  $CommentSchemaInterface,
  $LikeSchemaInterface,
  $PostSchemaInterface,
  $UserSchemaInterface,
} from "./types";

/** Define all models with typing */
export const User = mongoose.model<$UserSchemaInterface>("User", UserSchema);
export const Post = mongoose.model<$PostSchemaInterface>("Post", PostSchema);
export const Comment = mongoose.model<$CommentSchemaInterface>(
  "Comment",
  CommentSchema
);
export const Like = mongoose.model<$LikeSchemaInterface>("Like", LikeSchema);
