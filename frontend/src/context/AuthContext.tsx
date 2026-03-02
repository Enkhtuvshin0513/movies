import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./useAuth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("auth_token")
  );
  const [email, setEmail] = useState<string | null>(() =>
    localStorage.getItem("auth_email")
  );

  const login = (t: string, e: string) => {
    localStorage.setItem("auth_token", t);
    localStorage.setItem("auth_email", e);
    setToken(t);
    setEmail(e);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_email");
    setToken(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider value={{ token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
