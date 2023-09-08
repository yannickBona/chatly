import { useContext } from "react";
import { IAuthContext } from "../../contexts/types";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PostListContextProvider } from "../../contexts/PostListContext";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal";

const RequireAuth = () => {
  const { user } = useContext<IAuthContext>(AuthContext);
  const location = useLocation();

  const isAuthorized = !!user;

  return isAuthorized ? (
    <PostListContextProvider>
      <Navbar />
      <Outlet />
      <Modal />
    </PostListContextProvider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
