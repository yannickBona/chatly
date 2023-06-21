import React, { useContext, useEffect, useState } from "react";
import { IAuthContext } from "../../contexts/types";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAsyncFn } from "../../hooks/useAsync";
import { checkSession } from "../../api/User/sessionCheck";

const RequireAuth = () => {
  const { user, setUser } = useContext<IAuthContext>(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(!!user);
  const location = useLocation();

  const { execute: checkUserSessionFn } = useAsyncFn(checkSession);
  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      if (!user && token) {
        const sessionResponse = await checkUserSessionFn(token);
        if (sessionResponse.status !== "ok") {
          setUser(null);
          return;
        }

        setUser(sessionResponse.user);
        console.log("here", user, token);
      }
    })();
  }, [user]);

  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
