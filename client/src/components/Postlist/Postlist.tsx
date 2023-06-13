import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePost } from "../../api/Posts/deletePost";
import { PostListContext } from "../../contexts/PostListContext";
import { IPostListContext } from "../../contexts/types";
import { IPost } from "../../types";
import Post from "../Post/Post";
import styled from "./styled";

const Postlist: React.FC = () => {
  const { postList, setPosts } = useContext<IPostListContext>(PostListContext);

  const handleDelete = async (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const response = await deletePost(id);
    if (response.status !== 200) return;

    const newPosts = postList?.filter(
      (post) => post._id !== response.data.post._id
    );
    setPosts(newPosts);
  };

  // if (loading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error!</h1>;

  return (
    <styled.Container>
      {postList && postList.length > 0 ? (
        postList?.map((post: IPost) => (
          <Link key={post._id} className="post-card" to={`/post/${post._id}`}>
            <Post
              onDelete={handleDelete}
              isHomePage={true}
              key={post?._id}
              {...post}
            />
          </Link>
        ))
      ) : (
        <div>No posts found!</div>
      )}
    </styled.Container>
  );
};

export default Postlist;
