import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "./styled";
import { useAsyncFn } from "../../hooks/useAsync";
import { modifyPost } from "../../api/Posts/modifyPost";
import { PostContext } from "../../contexts/PostContext";
import { IPostContext } from "../../contexts/types";
import { IPost } from "../../types";

interface IEditForm {
  body: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditForm: React.FC<IEditForm> = ({ body, setEditMode }) => {
  const [content, setContent] = useState(body);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { currentPost, setCurrentPost } = useContext<IPostContext>(PostContext);
  const { execute: modifyPostFn } = useAsyncFn(modifyPost);

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

    // TODO: add logics to modify comment
    const updatedPost: IPost = await modifyPostFn(currentPost._id, content);
    setCurrentPost((prevPost: IPost | undefined) => {
      return {
        ...prevPost,
        body: updatedPost.body,
      };
    });
    setEditMode(false);
  };

  return (
    <styled.EditForm onSubmit={handleSubmit}>
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
