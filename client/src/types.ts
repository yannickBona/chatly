export interface IPost {
  _id: string;
  title: string;
  body: string;
  comments: IComment[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
  owner: string | null;
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
  owner: string | null;
}

export interface ILike {
  userId: string;
  postId?: string;
  commentId: string;
}

export interface IPostComponent extends IPost {
  isHomePage?: boolean;
  suggestedPosts?: IPost[];
  setSuggestedPosts?: React.Dispatch<React.SetStateAction<IPost[]>>;
}

export type ReqMethods = "GET" | "POST" | "PUT" | "DELETE";

/**
 * APIs
 */
export type $ResponseData<T = any> = {
  status: number;
  statusText: string;
  data?: T;
  details?: string;
};
