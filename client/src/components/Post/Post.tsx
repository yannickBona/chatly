import React, { useContext } from "react";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineHeart,
  AiOutlineComment,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { IPostComponent } from "../../types";
import styled from "./styled";

const Post: React.FC<IPostComponent> = ({
  body,
  title,
  _id,
  comments,
  isHomePage,
}) => {
  return (
    <styled.Container key={_id}>
      <i>r/Yannickbona</i>
      <h1>{title}</h1>
      <p>{body}</p>

      <styled.PostActionsContainer>
        <AiOutlineHeart onClick={() => null} />
        <AiOutlineComment onClick={() => null} />
        {isHomePage && (
          <>
            <AiFillEdit onClick={() => null} />
            <AiFillDelete onClick={() => null} />
          </>
        )}
      </styled.PostActionsContainer>
    </styled.Container>
  );
};

export default Post;
