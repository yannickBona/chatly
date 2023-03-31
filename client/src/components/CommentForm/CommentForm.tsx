import React from "react";
import styled from "./styled";

const CommentForm = () => {
  return (
    <styled.Container>
      <textarea placeholder="What are yout thoughts?"></textarea>
      <button>Comment</button>
    </styled.Container>
  );
};

export default CommentForm;
