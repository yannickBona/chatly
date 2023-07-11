import { IComment, IPost } from "../types";

export interface IPostContext {
  currentPost: IPost | null;
  setCurrentPost: React.Dispatch<React.SetStateAction<IPost | null>>;
}

export interface IPostListContext {
  postList: IPost[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}

export type TUser = {
  username: string;
  name?: string;
  lastName?: string;
  refreshToken: string;
  followed: string[];
  followers: string[];
  postsUploaded: number;
} | null;

export interface IAuthContext {
  user: TUser;
  setUser: React.Dispatch<React.SetStateAction<TUser>>;
}
