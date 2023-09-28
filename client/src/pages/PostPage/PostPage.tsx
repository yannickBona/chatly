import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CommentForm from "../../components/CommentForm";
import Post from "../../components/Post";
import { useSinglePostContext } from "../../contexts/SinglePostContext";
import { manageLikeOnComment } from "../../services/api/likes/manageLikeOnComment";

import styled from "./styled";
import { $ResponseData, IComment, ILike } from "../../types";
import { formatDate } from "../../utils/dateFormat";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineComment,
  AiOutlineHeart,
  AiOutlineUser,
  AiFillHeart,
} from "react-icons/ai";
import { useAsyncFn } from "../../utils/hooks/useAsync";
import { deleteComment } from "../../services/api/Comments/deleteComment";
import EditForm from "../../components/EditForm";
import { useAuthContext } from "../../contexts/AuthContext";
import { useMainContext } from "../../contexts/MainContext";
import DeleteCommentModal from "../../components/DeleteCommentModal";

const PostPage: React.FC = () => {
  const { currentPost, setCurrentPost } = useSinglePostContext();
  const { user } = useAuthContext();
  const { setOpenModal, setSelectedComment } = useMainContext();
  const { execute: manageCommentFn } = useAsyncFn(manageLikeOnComment);
  const { execute: deleteCommentFn } = useAsyncFn(deleteComment);
  const [editMode, setEditMode] = useState(false);
  const [editingComment, setEditingComment] = useState("");
  const navigate = useNavigate();

  const handleLikeOnComment = async (comment: IComment) => {
    if (!comment || !currentPost?.comments) return;
    const idx = currentPost.comments.findIndex(
      (comm) => comm._id === comment._id
    );

    const isLiked = comment.likes.some((like) => like === user?.username);
    if (!isLiked) {
      const response: $ResponseData = await manageCommentFn(
        comment._id,
        currentPost._id,
        "POST"
      );

      if (response.status !== 200) return;

      const newLikes = [...(comment.likes ?? []), user?.username] as string[];

      const updatedComments = [...currentPost?.comments];
      updatedComments[idx] = {
        ...updatedComments[idx],
        likes: newLikes,
      };

      setCurrentPost((prevPost) => {
        return prevPost
          ? {
              ...prevPost,
              comments: updatedComments,
            }
          : null;
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
        (like: string) => like !== user?.username
      );

      const updatedComments = [...currentPost?.comments];
      updatedComments[idx] = {
        ...updatedComments[idx],
        likes: newLikes,
      };

      setCurrentPost((prevPost) => {
        return prevPost
          ? {
              ...prevPost,
              comments: updatedComments,
            }
          : null;
      });
    }
  };

  const handleCommentEdit = (id: string) => {
    setEditMode((prev) => !prev);
    setEditingComment(id);
  };

  return currentPost ? (
    <styled.Container>
      <Post {...currentPost} key={currentPost?._id} />
      <styled.CommentsSection>
        <CommentForm />
        {currentPost.comments.length === 0 && (
          <span className="no-comments">No comments here. Be the first!</span>
        )}
        {currentPost.comments
          .map((comment: IComment) => (
            <div className="comment" key={comment._id}>
              <div>
                <span className="comment__user-avatar">
                  {comment.owner ? (
                    <Link to={`/profile/${comment.owner}`}>
                      <AiOutlineUser />
                    </Link>
                  ) : (
                    <AiOutlineUser />
                  )}
                </span>
                <b>
                  {comment.owner ? (
                    <Link
                      className="profile-link"
                      to={`/profile/${comment.owner}`}
                    >
                      {comment.owner}
                    </Link>
                  ) : (
                    "Anonymous User"
                  )}
                </b>
                {comment.owner === currentPost?.owner && " (Post Owner)"}
                <span className="comment__date">
                  {" "}
                  {formatDate(comment.createdAt.toString())}
                </span>
              </div>

              {editMode && editingComment === comment._id ? (
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
                  {comment.likes.some((like) => like === user?.username) ? (
                    <AiFillHeart
                      className="filled"
                      onClick={() => handleLikeOnComment(comment)}
                    />
                  ) : (
                    <AiOutlineHeart
                      onClick={() => handleLikeOnComment(comment)}
                    />
                  )}

                  {comment.likes.length}
                </span>

                {comment.owner === user?.username && (
                  <>
                    <AiOutlineEdit
                      onClick={() => handleCommentEdit(comment._id)}
                    />
                    <AiOutlineDelete
                      onClick={() => {
                        setSelectedComment(comment);
                        setOpenModal("delete-comment");
                      }}
                    />
                  </>
                )}

                <AiOutlineComment onClick={() => null} />
              </styled.commentActionsContainer>
            </div>
          ))
          .reverse()}
      </styled.CommentsSection>
      <span onClick={() => navigate(-1)} className="back-button">
        ⬅️
      </span>
      <DeleteCommentModal />
    </styled.Container>
  ) : (
    <div>Post not found</div>
  );
};

export default PostPage;
