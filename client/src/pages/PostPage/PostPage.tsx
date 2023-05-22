import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../../components/CommentForm/CommentForm";
import Post from "../../components/Post/Post";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";
import { manageLikeOnComment } from "../../api/likes/manageLikeOnComment";

import styled from "./styled";
import { IComment, ILike, IPost } from "../../types";
import { formatDate } from "../../helpers/dateFormat";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineUser,
  AiFillHeart,
} from "react-icons/ai";
import { useAsyncFn } from "../../hooks/useAsync";
import { useUser } from "../../hooks/useUser";
import { deleteComment } from "../../api/Comments/deleteComment";

const PostPage: React.FC = () => {
  const { currentPost, setCurrentPost } = useContext<IPostContext>(PostContext);
  const { execute: manageCommentFn } = useAsyncFn(manageLikeOnComment);
  const { execute: deleteCommentFn } = useAsyncFn(deleteComment);
  const { id: userId } = useUser();

  /**
   * Deletes a comment given its ID
   * @param id commentId
   * @returns
   */
  const handleCommentDelete = async (id: string) => {
    if (!id) return;

    const deletedComment = await deleteCommentFn(id);

    setCurrentPost((prevPost) => ({
      ...prevPost,
      comments: prevPost?.comments?.filter((c) => c._id !== id),
    }));
  };

  const handleLikeOnComment = async (comment: IComment) => {
    if (!comment || !currentPost?.comments) return;
    const idx = currentPost.comments.findIndex(
      (comm) => comm._id === comment._id
    );

    if (!comment.likes.some((like: ILike) => like.postId === userId)) {
      const newLike: ILike = await manageCommentFn(
        comment._id,
        currentPost._id,
        "POST"
      );
      const newLikes = [...(comment.likes ?? []), newLike];

      const updatedComments = [...currentPost?.comments];
      updatedComments[idx] = { ...updatedComments[idx], likes: newLikes };

      setCurrentPost((prevPost: IPost | undefined) => {
        return {
          ...prevPost,
          comments: updatedComments,
        };
      });
    }

    if (comment.likes.some((like: ILike) => like.postId === userId)) {
      const removedLike: ILike = await manageCommentFn(
        comment._id,
        currentPost._id,
        "DELETE"
      );
      const newLikes = comment.likes?.filter(
        (like: ILike) => like.userid !== removedLike.userid
      );

      const updatedComments = [...currentPost?.comments];
      updatedComments[idx] = { ...updatedComments[idx], likes: newLikes };

      setCurrentPost((prevPost: IPost | undefined) => {
        return {
          ...prevPost,
          comments: updatedComments,
        };
      });
    }
  };

  return (
    <styled.Container>
      <Link to="/" className="back-button">
        ⬅️
      </Link>
      <Post {...currentPost} key={currentPost?._id} />
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
                <span className="likes">
                  {comment.likes.some((like) => like.userid === userId) ? (
                    <AiFillHeart
                      className="filled"
                      onClick={() => handleLikeOnComment(comment)}
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => handleLikeOnComment(comment)}
                    />
                  )}

                  {comment?.likes.length}
                </span>

                <AiOutlineEdit onClick={() => null} />
                <AiOutlineDelete
                  onClick={() => handleCommentDelete(comment._id.toString())}
                />

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
