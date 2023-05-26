import { IComment, IPost } from "../types";

export interface IPostContext {
  currentPost: IPost | undefined;
  setCurrentPost: React.Dispatch<React.SetStateAction<IPost | undefined>>;
}

export interface IPostListContext {
  postList: IPost[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

export type TUser = { username: string };
export interface IAuthContext {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}
