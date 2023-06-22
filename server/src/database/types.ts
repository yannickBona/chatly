import mongoose, { ObjectId } from "mongoose";

export interface $PostSchemaInterface {
  _id: ObjectId;
  title: string;
  body: string;
  likes: mongoose.Types.ObjectId[];
  comments: ObjectId[];
}
export interface $LikeSchemaInterface {
  _id: ObjectId;
  userId: mongoose.Types.ObjectId;
  postId?: mongoose.Types.ObjectId;
  commentId?: string;
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
}

export interface $UserSchemaInterface {
  _id: ObjectId;
  name: string;
  lastName: string;
  username: string;
  password: string;
  refreshToken: string | null;
  getPublicData: () => {
    username: string;
    refreshToken: string;
    lastName: string;
    name: string;
  };
}

/**
 * createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    children: string[];
    like: Types.ObjectId[];
    content?: string | undefined;
    parentId?: string | undefined;
    userId?: Types.ObjectId | undefined;
    postId?: Types.ObjectId | undefined;
 */
