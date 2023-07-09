import React from "react";
import styled from "./styled";
import { AiOutlineUser } from "react-icons/ai";

const ProfileCard = () => {
  return (
    <styled.Container>
      <span className="avatar">
        <AiOutlineUser />
      </span>
      <p>yannickbona</p>
      <button>+ Follow </button>
    </styled.Container>
  );
};

export default ProfileCard;
