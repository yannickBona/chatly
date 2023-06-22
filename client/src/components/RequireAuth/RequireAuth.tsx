import React, { useContext, useEffect, useState } from "react";
import { IAuthContext } from "../../contexts/types";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAsyncFn } from "../../hooks/useAsync";
import { checkSession } from "../../api/User/sessionCheck";
import { PostListProvider } from "../../contexts/PostListContext";
import LogoutButton from "../LogoutButton/LogoutButton";

const RequireAuth = () => {
  const { user } = useContext<IAuthContext>(AuthContext);
  const location = useLocation();

  const isAuthorized = !!user;

  return isAuthorized ? (
    <PostListProvider>
      <Outlet />
      <LogoutButton />
    </PostListProvider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
