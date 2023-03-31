import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../../components/CommentForm/CommentForm";
import Post from "../../components/Post/Post";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";

import styled from "./styled";

const PostPage: React.FC = () => {
  const { post } = useContext<IPostContext>(PostContext);

  return (
    <styled.Container>
      <Link to="/" className="back-button">
        ⬅️
      </Link>
      <Post title={post?.title!} body={post?.body!} key={post?._id} />
      <styled.CommentsSection>
        <CommentForm />
      </styled.CommentsSection>
    </styled.Container>
  );
};

export default PostPage;
