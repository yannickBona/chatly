import React, { useContext, useState } from "react";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { createComment } from "../../api/Comments/createComment";
import { useParams } from "react-router-dom";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";
import { $ResponseData, IPost } from "../../types";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const { execute: createCommentFn } = useAsyncFn(createComment);
  const { id: postId } = useParams();
  const { setCurrentPost, currentPost } = useContext<IPostContext>(PostContext);

  /**
   * Creates a new comment for a specific post
   * @param e form event
   */
  const handleCommentCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response: $ResponseData = await createCommentFn(comment, postId);
    if (response.status !== 200) return;

    const newComment = response.data.comment;

    const newComments = [...(currentPost?.comments ?? []), newComment];

    if (!currentPost) return;
    const newPost: IPost = {
      ...currentPost,
      comments: newComments,
    };
    setCurrentPost(newPost);
    setComment("");
  };
  return (
    <styled.Container onSubmit={(e) => handleCommentCreate(e)}>
      <textarea
        onChange={(e) => setComment(e.currentTarget.value)}
        value={comment}
        placeholder="What are your thoughts?"
      ></textarea>
      <button>Comment</button>
    </styled.Container>
  );
};

export default CommentForm;
