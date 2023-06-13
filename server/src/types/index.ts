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
  comments: $PublicComment[];
  createdAt: Date;
  updatedAt: Date;
  owner: string;
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

export interface $PublicComment {
  _id: mongoose.Types.ObjectId;
  content: string;
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  parentId: mongoose.Types.ObjectId;
  children: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  createdAt: NativeDate;
  updatedAt: NativeDate;
  owner: string | null;
}
