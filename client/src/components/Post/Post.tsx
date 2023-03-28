import React from "react";

import { IPost } from "../../types";
import styled from "./styled";

const Post: React.FC<IPost> = ({ body, title, _id }) => {
  return (
    <styled.Container key={_id}>
      <h1>{title}</h1>
      <p>{body}</p>
    </styled.Container>
  );
};

export default Post;
