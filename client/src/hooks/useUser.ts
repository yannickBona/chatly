import { useContext } from "react";
import { IAuthContext } from "../contexts/types";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function useUser() {
  const { user, setUser } = useContext<IAuthContext>(AuthContext);

  return { user, setUser };
}
