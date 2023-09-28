import React, { useEffect, useRef, useState } from "react";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { modifyPost } from "../../api/Posts/modifyPost";
import { useSinglePostContext } from "../../contexts/SinglePostContext";
import { $ResponseData, IComment } from "../../types";
import { editComment } from "../../api/Comments/editComment";
import { useMainContext } from "../../contexts/MainContext";
import Button from "../Button";

interface IEditForm {
  body: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  comment?: IComment;
  postId?: string;
}

const EditForm: React.FC<IEditForm> = ({
  body,
  setEditMode,
  comment,
  postId,
}) => {
  const [content, setContent] = useState(body);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { currentPost, setCurrentPost } = useSinglePostContext();
  const { postList, setPosts } = useMainContext();
  const { execute: modifyPostFn } = useAsyncFn(modifyPost);
  const { execute: modifyCommentFn } = useAsyncFn(editComment);

  // This sets the height of the textarea to the content if it is greater than min-height
  useEffect(() => {
    if (!textareaRef.current) return;
    const { current: textArea } = textareaRef;
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
    textArea.focus();
    textArea.value = content; // this makes the cursor go to the end of the line
  }, [content]);

  /**
   * Handles Edit Mode on post
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPost) return;

    if (comment && currentPost.comments) {
      // Modify the comment
      const response: $ResponseData = await modifyCommentFn(
        comment._id,
        content
      );

      if (response.status !== 200) return;
      const newComment = response.data.comment;

      // Get index of old comment
      const oldCommentIdx = currentPost.comments.findIndex(
        (c) => c._id === comment._id
      );

      // If the comment is not found abort
      if (oldCommentIdx === -1) return setEditMode(false);

      // Update the comments context
      currentPost.comments[oldCommentIdx] = newComment;
      const updatedComments = currentPost.comments;
      setCurrentPost((prevPost) =>
        prevPost
          ? {
              ...prevPost,
              comments: updatedComments,
            }
          : null
      );
      setEditMode(false);
      return;
    }

    if (!comment) {
      const response: $ResponseData = await modifyPostFn(postId, content);
      if (response.status !== 200) return;
      const updatedList = [...postList!];
      const postIdx = updatedList.findIndex(
        (post) => post._id === currentPost._id
      );
      const updatedPost = response.data.post;

      updatedList[postIdx] = updatedPost;
      setPosts(updatedList);

      setCurrentPost((prevPost) => ({
        ...prevPost!,
        body: updatedPost.body,
      }));
      setEditMode(false);
    }
  };

  return (
    <styled.EditForm onSubmit={handleSubmit} isComment>
      <textarea
        placeholder={comment ? "" : "Text (optional)"}
        ref={textareaRef}
        onChange={(e) => setContent(e.currentTarget.value)}
      />

      <div className="button-container">
        <button onClick={() => setEditMode(false)}>Cancel</button>
        <Button text="Save" disabled={content === body} />
      </div>
    </styled.EditForm>
  );
};

export default EditForm;
