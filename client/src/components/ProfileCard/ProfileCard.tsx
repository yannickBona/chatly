import React from "react";
import styled from "./styled";
import { AiOutlineUser } from "react-icons/ai";

const ProfileCard: React.FC<{ username: string }> = ({ username }) => {
  return (
    <styled.Container>
      <span className="avatar">
        <AiOutlineUser />
      </span>
      <p>{username}</p>
      <button>+ Follow </button>
    </styled.Container>
  );
};

export default ProfileCard;
