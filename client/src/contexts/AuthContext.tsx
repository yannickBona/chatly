import { ReactNode, createContext, useEffect, useState } from "react";
import { IAuthContext, TUser } from "./types";
import { checkSession } from "../api/User/sessionCheck";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);

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
        const sessionResponse = await checkSession();
        if (sessionResponse.status !== 200) {
          setUser(null);
          return;
        }

        setUser(sessionResponse.data.user);
        navigate(redirectTo);
      }
    })();
  }, []);

  console.log(user);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
