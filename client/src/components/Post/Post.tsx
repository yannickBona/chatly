import React, { useContext } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
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
        <span className="comment">
          <AiOutlineComment onClick={() => null} /> {comments?.length}
        </span>
        {isHomePage && (
          <>
            <AiOutlineEdit onClick={() => null} />
            <AiOutlineDelete onClick={() => null} />
          </>
        )}
      </styled.PostActionsContainer>
    </styled.Container>
  );
};

export default Post;
