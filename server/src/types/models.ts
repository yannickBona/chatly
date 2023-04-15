import { Date, ObjectId } from "mongoose";

export interface IPost {
  _id: string;
  title: string;
  body: string;
  likes: ObjectId[] | [];
  comments: IComment[] | [];
}
export interface ILike {
  _id: string;
  userId: string;
  postId?: string;
  commentId?: string;
}

export interface IComment {
  content: string;
  userId: ObjectId;
  postId: ObjectId;
  parentId: ObjectId;
  children: ObjectId[];
  likes: ObjectId[];
  createdAt: NativeDate;
  updatedAt: NativeDate;
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
