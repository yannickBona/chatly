import { createContext, ReactNode, useContext } from "react";
import { useAsync } from "../hooks/useAsync";
import { getPost } from "../api/Posts/getPost";
import { useParams } from "react-router-dom";
import { IPost } from "../types";
import { IPostContext } from "./types";

export const PostContext = createContext<IPostContext>({ post: undefined });

export const PostProvider = ({ children }: { children: JSX.Element }) => {
  const { id } = useParams();

  const { loading, error, value } = useAsync(() => getPost(id!), [id]);
  const post: IPost = value;

  console.log(post);
  return (
    <PostContext.Provider
      value={{
        post: post,
      }}
    >
      {loading ? <h1>Loading</h1> : error ? <h1>error</h1> : children}
    </PostContext.Provider>
  );
};
