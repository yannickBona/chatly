import React, { useState } from "react";
import styled from "./styled";
import { useAsyncFn } from "../../utils/hooks/useAsync";
import { createComment } from "../../services/api/Comments/createComment";
import { useParams } from "react-router-dom";
import { useSinglePostContext } from "../../contexts/SinglePostContext";
import { $ResponseData, IPost } from "../../types";
import { useMainContext } from "../../contexts/MainContext";

const CommentForm = () => {
  const [comment, setComment] = useState("");
  const { execute: createCommentFn } = useAsyncFn(createComment);
  const { id: postId } = useParams();
  const { setCurrentPost, currentPost } = useSinglePostContext();
  const { postList, setPosts } = useMainContext();

  /**
   * Creates a new comment for a specific post
   * @param e form event
   */
  const handleCommentCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPost) return;

    const response: $ResponseData = await createCommentFn(comment, postId);
    if (response.status !== 200) return;

    const newComment = response.data.comment;
    const updatedPosts = [...postList!];

    const postIdx = updatedPosts.findIndex(
      (post) => post._id === currentPost?._id
    );

    const newComments = [...(currentPost?.comments ?? []), newComment];
    const newPost: IPost = {
      ...currentPost,
      comments: newComments,
    };

    updatedPosts[postIdx] = newPost;
    setCurrentPost(newPost);
    setPosts(updatedPosts);
    setComment("");
  };
  return (
    <styled.Container onSubmit={(e) => handleCommentCreate(e)}>
      <textarea
        onChange={(e) => setComment(e.currentTarget.value)}
        value={comment}
        placeholder="What are your thoughts?"
      />
      <button disabled={!comment}>Comment</button>
    </styled.Container>
  );
};

export default CommentForm;
