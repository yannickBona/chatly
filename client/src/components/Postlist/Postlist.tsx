import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../../api/Posts/deletePost";
import { getPosts } from "../../api/Posts/getPosts";
import { PostListContext } from "../../contexts/PostListContext";
import { IPostListContext } from "../../contexts/types";
import { useAsync } from "../../hooks/useAsync";
import { IPost } from "../../types";
import Post from "../Post/Post";
import styled from "./styled";

const Postlist: React.FC = () => {
  const { postList, setPosts } = useContext<IPostListContext>(PostListContext);

  const handleDelete = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const response = await deletePost(id);
    const newPosts = postList?.filter((post) => post._id !== response._id);
    setPosts(newPosts);
  };

  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error!</h1>;
  console.log(postList);

  return (
    <styled.Container>
      {postList?.map((post: IPost) => (
        <Link key={post._id} className="post-card" to={`/post/${post._id}`}>
          <Post isHomePage={true} key={post?._id} {...post} />
          <span
            className="delete-post"
            onClick={(e) => handleDelete(e, post._id!)}
          >
            ❌
          </span>
        </Link>
      ))}
    </styled.Container>
  );
};

export default Postlist;
