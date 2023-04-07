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
import { IComment, IPost } from "../types";
import { IPostContext } from "./types";

export const PostContext = createContext<any>({});

export const PostProvider = ({ children }: { children: ReactNode }) => {
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(false)
  const [currentPost, setCurrentPost] = useState<IPost | undefined>();
  const { id } = useParams();

  const { loading, error, value } = useAsync(() => getPost(id!), [id]);
  const post: IPost | undefined = value;

  useEffect(() => {
    if (post) {
      setCurrentPost(post);
    }
  }, [post?.comments]);

  const contextData: IPostContext = { currentPost, setCurrentPost };

  return (
    <PostContext.Provider value={contextData}>
      {loading ? <h1>Loading</h1> : error ? <h1>error</h1> : children}
    </PostContext.Provider>
  );
};
