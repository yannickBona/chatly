import { ReactNode, createContext, useEffect, useState } from "react";
import { IAuthContext, TUser } from "./types";
import { useAsyncFn } from "../hooks/useAsync";
import { checkSession } from "../api/User/sessionCheck";
export const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const contextData: IAuthContext = { user, setUser };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
