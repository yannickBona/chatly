import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentForm from "../../components/CommentForm/CommentForm";
import Post from "../../components/Post/Post";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";
import { manageLikeOnComment } from "../../api/likes/manageLikeOnComment";

import styled from "./styled";
import { $ResponseData, IComment, ILike, IPost } from "../../types";
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
import EditForm from "../../components/EditForm/EditForm";

const PostPage: React.FC = () => {
  const { currentPost, setCurrentPost } = useContext<IPostContext>(PostContext);
  const { execute: manageCommentFn } = useAsyncFn(manageLikeOnComment);
  const { execute: deleteCommentFn } = useAsyncFn(deleteComment);
  const { id: userId } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");

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

    const isLiked = comment.likes.some((like) => like === userId);

    if (!isLiked) {
      const response: $ResponseData = await manageCommentFn(
        comment._id,
        currentPost._id,
        "POST"
      );

      if (response.status !== 200) return;

      const newLike: ILike = response.data.like;
      const newLikes = [...(comment.likes ?? []), newLike.userId];

      const updatedComments = [...currentPost?.comments];
      updatedComments[idx] = { ...updatedComments[idx], likes: newLikes };

      setCurrentPost((prevPost: IPost | undefined) => {
        return {
          ...prevPost,
          comments: updatedComments,
        };
      });
    }

    if (isLiked) {
      const response: $ResponseData = await manageCommentFn(
        comment._id,
        currentPost._id,
        "DELETE"
      );

      if (response.status !== 200) return;
      const removedLike: ILike = response.data.like;
      const newLikes = comment.likes?.filter(
        (like: string) => like !== removedLike.userId
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

  const handleCommentEdit = (id: string) => {
    setEditMode((prev) => !prev);
    setSelectedComment(id);
  };

  return (
    <styled.Container>
      <Link to="/" className="back-button">
        ⬅️
      </Link>
      <Post onDelete={() => null} {...currentPost} key={currentPost?._id} />
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

              {editMode && selectedComment === comment._id ? (
                <EditForm
                  body={comment.content}
                  setEditMode={setEditMode}
                  comment={comment}
                />
              ) : (
                <p>{comment.content}</p>
              )}

              <styled.commentActionsContainer>
                <span className="likes">
                  {comment.likes.some((like) => like === userId) ? (
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

                <AiOutlineEdit onClick={() => handleCommentEdit(comment._id)} />
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
