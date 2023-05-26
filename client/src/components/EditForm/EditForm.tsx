import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { modifyPost } from "../../api/Posts/modifyPost";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";
import { IComment, IPost } from "../../types";
import { editComment } from "../../api/Comments/editComment";

interface IEditForm {
  body: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  comment?: IComment;
}

const EditForm: React.FC<IEditForm> = ({ body, setEditMode, comment }) => {
  const [content, setContent] = useState(body);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { currentPost, setCurrentPost } = useContext<IPostContext>(PostContext);
  const { execute: modifyPostFn } = useAsyncFn(modifyPost);
  const { execute: modifyCommentFn } = useAsyncFn(editComment);

  // This sets the height of the textarea to the content if it is greater than min-height
  useEffect(() => {
    if (!textareaRef.current) return;
    const { current: textArea } = textareaRef;
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  }, [content]);

  /**
   * Handles Edit Mode on post
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentPost) return;

    if (comment && currentPost.comments) {
      // Modify the comment
      const newComment = await modifyCommentFn(comment._id, content);

      // Get index of old comment
      const oldCommentIdx = currentPost.comments?.findIndex(
        (c) => c._id === comment._id
      );

      // If the comment is not found abort
      if (!oldCommentIdx) return setEditMode(false);

      // Update the comments context
      currentPost.comments[oldCommentIdx] = newComment;
      const updatedComments = currentPost.comments;
      setCurrentPost((prevPost) => {
        return {
          ...prevPost,
          comments: updatedComments,
        };
      });
      setEditMode(false);
      return;
    }

    if (!comment) {
      const updatedPost: IPost = await modifyPostFn(currentPost._id, content);
      setCurrentPost((prevPost: IPost | undefined) => {
        return {
          ...prevPost,
          body: updatedPost.body,
        };
      });
      setEditMode(false);
      return;
    }
  };

  return (
    <styled.EditForm onSubmit={handleSubmit} isComment>
      <textarea
        placeholder="Text (optional)"
        ref={textareaRef}
        onChange={(e) => setContent(e.currentTarget.value)}
        value={content}
      />

      <div className="button-container">
        <button onClick={() => setEditMode(false)}>Cancel</button>
        <button disabled={content === body}>Save</button>
      </div>
    </styled.EditForm>
  );
};

export default EditForm;