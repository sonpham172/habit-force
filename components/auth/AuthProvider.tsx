import React, { createContext, useContext } from 'react';

const AuthContext = createContext<string | null>(null);

export const AuthProvider = ({ children, token }: { children: React.ReactNode; token: string }) => {
  return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};