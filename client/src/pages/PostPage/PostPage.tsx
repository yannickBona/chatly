import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";

import styled from "./styled";

const PostPage: React.FC = () => {
  const { post } = useContext<IPostContext>(PostContext);

  return (
    <styled.Container>
      <Post title={post?.title!} body={post?.body!} key={post?._id} />
      <Link to="/" className="back-button">
        ⬅️
      </Link>
    </styled.Container>
  );
};

export default PostPage;
