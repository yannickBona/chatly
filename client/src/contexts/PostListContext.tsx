import { createContext, ReactNode, useEffect, useState } from "react";
import { getPosts } from "../api/Posts/getPosts";
import { useAsync } from "../hooks/useAsync";
import { IPost } from "../types";
import { IPostListContext } from "./types";

export const PostListContext = createContext<any>({});

export function PostListProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<IPost[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await getPosts();
        if (response.status !== 200)
          return setError(response.details as string);

        setPosts(response.data.posts);
      } catch (err) {
        setError(err as string);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const data: IPostListContext = { postList: posts, setPosts };

  return (
    <PostListContext.Provider value={data}>
      {loading ? <h1>Loading</h1> : error ? <h1>error</h1> : children}
    </PostListContext.Provider>
  );
}
