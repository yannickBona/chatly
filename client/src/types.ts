export interface IPost {
  _id?: string;
  title?: string;
  body?: string;
  comments?: IComment[] | [];
  likes?: ILike[] | [];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IComment {
  _id: string;
  content: string;
  userId: string;
  postId: string;
  parentId: string;
  children: string[];
  likes: ILike[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ILike {
  userid: string;
  postId?: string;
  commentId: string;
}

export interface IPostComponent extends IPost {
  isHomePage?: boolean;
}

export type ReqMethods = "GET" | "POST" | "PUT" | "DELETE";
