import { ReactNode, createContext, useEffect, useState } from "react";
import { IAuthContext, TUser } from "./types";
import { checkSession } from "../api/User/sessionCheck";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext<any>({});

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
      {loadingUser ? <h1>Loading</h1> : children}
    </AuthContext.Provider>
  );
};
