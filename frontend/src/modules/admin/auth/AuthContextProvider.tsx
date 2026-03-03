import { AuthContext } from "./useAuthContext";
import { useState } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./hooks/useUser";

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth-token")
  );

  const { data, isLoading } = useUser(!!token);

  const login = (id: string) => {
    localStorage.setItem("auth-token", id);
    localStorage.setItem("auth-user-id", id);
    setToken(id);
    navigate("/admin/create-movie");
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user-id");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user: data || null, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
