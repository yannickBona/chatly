import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/Posts/getPosts";
import { useAsync } from "../../hooks/useAsync";
import { IPost } from "../../types";

interface IPostList {
  // setPosts: React.Dispatch<React.SetStateAction<IPost[] | undefined>>;
  // posts: IPost[] | undefined;
  newPost: boolean;
}

const Postlist: React.FC<IPostList> = ({ newPost }) => {
  const { loading, error, value } = useAsync(() => getPosts(), [newPost]);
  const postList: IPost[] | undefined = value;

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error!</h1>;
  return (
    <div>
      {postList?.map((post: IPost) => (
        <div key={post._id}>
          <Link to={`/post/${post._id}`}>{post.title}</Link>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Postlist;
