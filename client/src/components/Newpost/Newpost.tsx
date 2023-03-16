import React from "react";
import styled from "./styled";

const Newpost = () => {
  return (
    <styled.Container>
      <h2>Create Post</h2>
      <input type="text" placeholder="Title" />
      <textarea placeholder="Text (optional)" />
      <button>Post</button>
    </styled.Container>
  );
};

export default Newpost;
