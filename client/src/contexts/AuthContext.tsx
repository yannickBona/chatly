import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IAuthContext, TUser } from "./types";
import {
  checkSession,
  generateAccessToken,
} from "../services/api/User/sessionCheck";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { getCookie } from "../utils/helpers/http";

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
  const [tokenUpdate, setTokenUpdate] = useState(false);

  const contextData: IAuthContext = { user, setUser };
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location?.state?.from.pathname;

  const token = localStorage.getItem("token");
  const refreshToken = getCookie("refreshToken");

  const generateNewToken = async () => {
    const response = await generateAccessToken();

    if (response.status !== 200 || response.statusText !== "Ok")
      return setUser(null);

    const { token: newToken } = response.data;
    localStorage.setItem("token", newToken);
    setTokenUpdate(true); // Triggers the useEffect to check the session
  };

  /**
   * Token check
   */
  useEffect(() => {
    (async () => {
      if ((!user && token) || refreshToken) {
        setLoadingUser(true);
        const sessionResponse = await checkSession();
        setLoadingUser(false);

        console.log(sessionResponse);
        // Expired token
        if (sessionResponse.status === "Forbidden") {
          const response = await generateNewToken();
        }

        if (sessionResponse.status !== 200) {
          setUser(null);
          return;
        }

        setUser(sessionResponse.data.user);
        navigate(redirectTo);
      }
    })();
  }, [tokenUpdate]);

  return (
    <AuthContext.Provider value={contextData}>
      {loadingUser && <Loader />}
      {children}
    </AuthContext.Provider>
  );
};
