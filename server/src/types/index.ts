import { JwtPayload } from "jsonwebtoken";
import { $CommentSchemaInterface } from "../database/types";
import mongoose from "mongoose";

export interface $JwtBody extends JwtPayload {
  username: string;
}

export interface $PublicPost {
  title: string;
  body: string;
  user: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  comments: $CommentSchemaInterface[];
  createdAt: Date;
}
export interface $PublicLike {
  userId: mongoose.Types.ObjectId;
  commentId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
}

export interface $PublicUser {
  username: string;
  refreshToken: string;
  lastName: string;
  name: string;
}
