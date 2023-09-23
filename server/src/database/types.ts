import mongoose, { ObjectId } from "mongoose";
import {
  $PublicComment,
  $PublicLike,
  $PublicPost,
  $PublicUser,
} from "../types";

export interface $PostSchemaInterface {
  _id: ObjectId;
  title: string;
  body: string;
  user: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  comments: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  getPublicData: () => Promise<$PublicPost>;
}
export interface $LikeSchemaInterface {
  _id: ObjectId;
  userId: mongoose.Types.ObjectId;
  postId?: mongoose.Types.ObjectId;
  commentId?: string;

  getPublicData: () => $PublicLike;
}

export interface $CommentSchemaInterface {
  _id: ObjectId;
  content: string;
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  parentId: mongoose.Types.ObjectId;
  children: mongoose.Types.ObjectId[];
  likes: mongoose.Types.ObjectId[];
  createdAt: NativeDate;
  updatedAt: NativeDate;
  getPublicData: () => Promise<$PublicComment>;
}

export interface $UserSchemaInterface {
  _id: ObjectId;
  name: string;
  lastName: string;
  username: string;
  password: string;
  followers: string[];
  followed: string[];
  refreshToken: string | null;
  getPublicData: (showRefreshToken?: boolean) => Promise<$PublicUser>;
}
