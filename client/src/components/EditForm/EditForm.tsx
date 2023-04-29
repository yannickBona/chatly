import React, { useEffect, useRef, useState } from "react";
import styled from "./styled";

interface IEditForm {
  body: string;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditForm: React.FC<IEditForm> = ({ body, setEditMode }) => {
  const [content, setContent] = useState(body);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: add logics to modify comment
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
