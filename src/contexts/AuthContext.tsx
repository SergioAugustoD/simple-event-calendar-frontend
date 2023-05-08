import React, { createContext, useState, useContext, useEffect } from "react";

interface User {
  id: string;
  name: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string) => {
    const newUser: User = {
      id: "1",
      name: name,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => useContext(AuthContext);

export { AuthProvider, useAuth };
