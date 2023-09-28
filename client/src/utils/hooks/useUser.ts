import { useAuthContext } from "../../contexts/AuthContext";

export function useUser() {
  const { user, setUser } = useAuthContext();

  return { user, setUser };
}
