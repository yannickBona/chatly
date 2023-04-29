import React, { useEffect, useRef, useState } from "react";
import styled from "./styled";

interface IEditForm {
  body: string;
}

const EditForm: React.FC<IEditForm> = ({ body }) => {
  const [content, setContent] = useState(body);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // This sets the height of the textarea to the content if it is greater than min-height
  useEffect(() => {
    if (!textareaRef.current) return;
    const { current: textArea } = textareaRef;
    textArea.style.height = "auto";
    textArea.style.height = `${textArea.scrollHeight}px`;
  }, [content]);

  return (
    <styled.EditForm>
      <textarea
        placeholder="Text (optional)"
        ref={textareaRef}
        onChange={(e) => setContent(e.currentTarget.value)}
        value={content}
      />
    </styled.EditForm>
  );
};

export default EditForm;
