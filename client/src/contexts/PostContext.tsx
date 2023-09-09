import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../api/Posts/getPost";
import { useParams } from "react-router-dom";
import { IPost } from "../types";
import { IPostContext } from "./types";

export const PostContext = createContext<any>({});

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);
  const { id } = useParams();

  const {
    loading,
    error,
    value: response,
  } = useAsync(() => {
    if (!id) {
      // Return a resolved promise with no data if 'id' is undefined
      return Promise.resolve({ data: null });
    }
    return getPost(id);
  }, [id]);

  const post: IPost | null = response?.data?.post;

  useEffect(() => {
    if (post) {
      setCurrentPost(post);
    }
  }, [post?.comments, post?.likes]);

  const contextData: IPostContext = { currentPost, setCurrentPost };

  return (
    <PostContext.Provider value={contextData}>
      {loading ? <h1>Loading</h1> : error ? <h1>error</h1> : children}
    </PostContext.Provider>
  );
};
