import { createContext, ReactNode, useEffect, useState } from "react";
import { getPosts } from "../api/Posts/getPosts";
import { useAsync } from "../hooks/useAsync";
import { IPost } from "../types";
import { IMainContext } from "./types";

export const MainContext = createContext<any>({});

export function MainContextProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<IPost[] | undefined>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await getPosts();
      if (response.status !== 200) return setError(response.details as string);

      setPosts(response.data.posts);
    } catch (err) {
      setError(err as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const data: IMainContext = { postList: posts, setPosts };

  return (
    <MainContext.Provider value={data}>
      {loading ? <h1>Loading</h1> : error ? <h1>error</h1> : children}
    </MainContext.Provider>
  );
}
