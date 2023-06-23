export interface IPost {
  _id?: string;
  title?: string;
  body?: string;
  comments?: IComment[] | [];
  likes?: string[] | [];
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
  likes: string[];
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
  onDelete: (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => Promise<void> | null;
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
