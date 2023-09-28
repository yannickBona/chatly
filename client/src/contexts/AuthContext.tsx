import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthContext, TUser } from "./types";
import { checkSession } from "../services/api/User/sessionCheck";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export const AuthContext = createContext<IAuthContext | null>(null);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext)
    throw new Error(
      "useAuthContext must be used inside its AuthContextProvider"
    );

  return authContext;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);

  const contextData: IAuthContext = { user, setUser };
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location?.state?.from.pathname;

  const token = localStorage.getItem("token");

  /**
   * Token check
   */
  useEffect(() => {
    (async () => {
      if (!user && token) {
        setLoadingUser(true);
        const sessionResponse = await checkSession();
        setLoadingUser(false);

        if (sessionResponse.status !== 200) {
          setUser(null);
          return;
        }

        setUser(sessionResponse.data.user);
        navigate(redirectTo);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={contextData}>
      {loadingUser && <Loader />}
      {children}
    </AuthContext.Provider>
  );
};
