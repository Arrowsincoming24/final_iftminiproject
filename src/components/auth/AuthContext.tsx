
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AuthService, { JwtResponse } from '../../services/AuthService';

interface AuthContextProps {
  isAuthenticated: boolean;
  user: JwtResponse | null;
  isParent: boolean;
  isChild: boolean;
  login: (username: string, password: string) => Promise<JwtResponse>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  isParent: false,
  isChild: false,
  login: () => Promise.reject(),
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<JwtResponse | null>(null);
  const [isParent, setIsParent] = useState<boolean>(false);
  const [isChild, setIsChild] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = AuthService.isLoggedIn();
      setIsAuthenticated(isLoggedIn);
      
      if (isLoggedIn) {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
        setIsParent(AuthService.isParent());
        setIsChild(AuthService.isChild());
      } else {
        setUser(null);
        setIsParent(false);
        setIsChild(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);
    setIsAuthenticated(true);
    setUser(response);
    setIsParent(response.roles.includes('ROLE_PARENT'));
    setIsChild(response.roles.includes('ROLE_CHILD'));
    return response;
  };

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    setIsParent(false);
    setIsChild(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isParent, isChild, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
