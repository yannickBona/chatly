import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../../api/Posts/getPosts";
import { useAsync } from "../../hooks/useAsync";
import { IPost } from "../../types";

const Postlist = () => {
  const { loading, error, value } = useAsync(() => getPosts());
  const posts: IPost[] = value;

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error!</h1>;

  return (
    <div>
      {posts.map((post: IPost) => (
        <div key={post._id}>
          <Link to={`/post/${post._id}`}>{post.title}</Link>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Postlist;
