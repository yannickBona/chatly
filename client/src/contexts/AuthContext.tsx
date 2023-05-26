import { ReactNode, createContext, useState } from "react";
import { IAuthContext, TUser } from "./types";

export const AuthContext = createContext<any>({});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);

  const contextData: IAuthContext = { user, setUser };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
