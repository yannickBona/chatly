import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { MainContextProvider } from "../../contexts/MainContext";
import Navbar from "../../layout/Navbar";
import DeletePostModal from "../DeletePostModal";
import { SinglePostProvider } from "../../contexts/SinglePostContext";
import Footer from "../../layout/Footer";

const RequireAuth = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  const isAuthorized = !!user;

  return isAuthorized ? (
    <SinglePostProvider>
      <MainContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
        <DeletePostModal />
      </MainContextProvider>
    </SinglePostProvider>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
