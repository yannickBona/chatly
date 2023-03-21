import React, { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";

const Post = () => {
  const { post } = useContext<IPostContext>(PostContext);
  return (
    <>
      <h1>{post?.title}</h1>
      <p>{post?.body}</p>
    </>
  );
};

export default Post;
