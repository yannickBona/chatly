import React from "react";
import { useAsyncFn } from "../../hooks/useAsync";
import { logoutUser } from "../../api/User/logoutUser";
import styled from "./styled";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { execute: logoutUserFn } = useAsyncFn(logoutUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutUserFn();
    if (response.status !== 200) return;

    localStorage.removeItem("token");
    navigate("/login");
  };

  return <styled.Button onClick={() => handleLogout()}>Logout</styled.Button>;
};

export default LogoutButton;