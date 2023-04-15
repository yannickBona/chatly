import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../../components/CommentForm/CommentForm";
import Post from "../../components/Post/Post";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";

import styled from "./styled";
import { IComment } from "../../types";
import { formatDate } from "../../helpers/dateFormat";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";

const PostPage: React.FC = () => {
  const { currentPost } = useContext<IPostContext>(PostContext);

  return (
    <styled.Container>
      <Link to="/" className="back-button">
        ⬅️
      </Link>
      <Post
        comments={currentPost?.comments}
        likes={currentPost?.likes}
        title={currentPost?.title}
        body={currentPost?.body}
        key={currentPost?._id}
      />
      <styled.CommentsSection>
        <CommentForm />
        {currentPost?.comments?.length === 0 && (
          <span className="no-comments">No comments here. Be the first!</span>
        )}
        {currentPost?.comments
          ?.map((comment: IComment) => (
            <div className="comment" key={comment._id}>
              <div>
                <span className="comment__user-avatar">
                  <AiOutlineUser />
                </span>
                <b>{comment.userId}</b> ·{" "}
                <span className="comment__date">
                  {formatDate(comment.createdAt.toString())}
                </span>
              </div>
              <p>{comment.content}</p>

              <styled.commentActionsContainer>
                <AiOutlineHeart onClick={() => null} />
                <AiOutlineEdit onClick={() => null} />
                <AiOutlineDelete onClick={() => null} />
                <AiOutlineComment onClick={() => null} />
              </styled.commentActionsContainer>
            </div>
          ))
          .reverse()}
      </styled.CommentsSection>
    </styled.Container>
  );
};

export default PostPage;
