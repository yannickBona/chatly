import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../../components/CommentForm/CommentForm";
import Post from "../../components/Post/Post";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";

import styled from "./styled";
import { IComment } from "../../types";

const PostPage: React.FC = () => {
  const { currentPost } = useContext<IPostContext>(PostContext);

  return (
    <styled.Container>
      <Link to="/" className="back-button">
        ⬅️
      </Link>
      <Post
        comments={currentPost?.comments!}
        title={currentPost?.title!}
        body={currentPost?.body!}
        key={currentPost?._id}
      />
      <styled.CommentsSection>
        <CommentForm />
      </styled.CommentsSection>
      {currentPost?.comments
        ?.map((comment: IComment) => (
          <div className="comment" key={comment._id}>
            {/* <span>{comment.userId}</span> */}
            <p>{comment.content}</p>
            <span>{comment.createdAt.toString()}</span>
          </div>
        ))
        .reverse()}
    </styled.Container>
  );
};

export default PostPage;
