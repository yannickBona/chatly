import { useContext } from "react";
import { IAuthContext } from "../../contexts/types";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { MainContextProvider } from "../../contexts/MainContext";
import Navbar from "../Navbar/Navbar";
import DeletePostModal from "../DeletePostModal";
import { PostProvider } from "../../contexts/PostContext";

const RequireAuth = () => {
  const { user } = useContext<IAuthContext>(AuthContext);
  const location = useLocation();

  const isAuthorized = !!user;

  return isAuthorized ? (
    <PostProvider>
      <MainContextProvider>
        <Navbar />
        <Outlet />
        <DeletePostModal />
      </MainContextProvider>
    </PostProvider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
