export interface IPost {
  _id?: string;
  title: string | undefined;
  body: string | undefined;
  comments?: IComment[] | null;
}

export interface IComment {
  _id: string;
  content: string;
  userId: string;
  postId: string;
  parentId: string;
  children: string[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostComponent extends IPost {
  isHomePage?: boolean;
}

export type ReqMethods = "GET" | "POST" | "PUT" | "DELETE";
