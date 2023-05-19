import { useContext } from "react";
import { IAuthContext } from "../contexts/types";
import { AuthContext } from "../contexts/AuthContext";

export function useUser() {
  const { user, setUser } = useContext<IAuthContext>(AuthContext);

  return { user, setUser };
}
