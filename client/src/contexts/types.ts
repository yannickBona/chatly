import { IComment, IPost } from "../types";

export interface IPostContext {
  currentPost: IPost | null;
  setCurrentPost: React.Dispatch<React.SetStateAction<IPost | null>>;
}

export type ModalTypes = "delete-post" | "delete-comment";
export interface IMainContext {
  postList: IPost[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  openModal: ModalTypes | null;
  setOpenModal: React.Dispatch<React.SetStateAction<ModalTypes | null>>;
  selectedPost: IPost | null;
  selectedComment: IComment | null;
  setSelectedPost: React.Dispatch<React.SetStateAction<IPost | null>>;
  setSelectedComment: React.Dispatch<React.SetStateAction<IComment | null>>;
  handlePostDelete: (id: string) => Promise<void>;
  handleCommentDelete: (commentId: string, postId: string) => Promise<void>;
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
