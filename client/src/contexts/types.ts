import { IPost } from "../types";

export interface IPostContext {
  post: IPost | undefined;
}

export interface IPostListContext {
  postList: IPost[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
}
