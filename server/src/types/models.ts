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
  likes: ILike[];
  createdAt: NativeDate;
  updatedAt: NativeDate;
}

export interface $UserSchemaInterface {
  name: string;
  lastname: string;
  username: string;
  password: string;
  getPublicData: () => { username: string };
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
