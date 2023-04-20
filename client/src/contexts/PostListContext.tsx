import { createContext, ReactNode, useEffect, useState } from "react";
import { getPosts } from "../api/Posts/getPosts";
import { useAsync } from "../hooks/useAsync";
import { IPost } from "../types";
import { IPostListContext } from "./types";

export const PostListContext = createContext<any>({});

export function PostListProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<IPost[] | undefined>();
  const { error, loading, value } = useAsync(getPosts, [posts]);
  const postList: IPost[] | undefined = value;

  const data: IPostListContext = { postList, setPosts };

  return (
    <PostListContext.Provider value={data}>
      {loading ? <h1>Loading</h1> : error ? <h1>error</h1> : children}
    </PostListContext.Provider>
  );
}
