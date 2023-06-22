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

  const token = localStorage.getItem("token");

  /**
   * Token check
   */
  useEffect(() => {
    if (location.pathname !== "/login")
      (async () => {
        if (!user && token) {
          const sessionResponse = await checkSession();
          if (sessionResponse.status !== 200) {
            setUser(null);
            return;
          }

          setUser(sessionResponse.data.user);
          navigate("/");
        }
      })();
  }, [user]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
