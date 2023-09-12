import React, { useState } from "react";
import { TUser } from "../../contexts/types";
import { StyledResultCard } from "./styled";
import { useUser } from "../../utils/hooks/useUser";
import Button from "../Button";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ResultCard: React.FC<TUser> = ({ username }) => {
  const navigate = useNavigate();

  return (
    <StyledResultCard
      onClick={() => navigate(`/profile/${username}?canGoBack=y`)}
    >
      <span className="avatar">
        <AiOutlineUser />
      </span>
      <p>{username}</p>
    </StyledResultCard>
  );
};

export default ResultCard;
