import { POST } from '@/app/hooks/useFetchData';
import { ApiErrorResponse, ApiResponse, LoginResponse, RegisterResponse } from '@/app/types/api';
import { getToken, removeToken, saveToken } from '@/app/utils/secureStore';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthProps {
  authState?: {token: string | null, authenticated: boolean | null},
  loading?: boolean | null,
  onRegister?: ({name, email, password, confirmPassword}: 
    {name: string, email: string, password: string, confirmPassword: string}) => Promise<ApiResponse<RegisterResponse>>;
  onLogin?: (email: string, password: string) => Promise<ApiResponse<LoginResponse>>;
  onLogut?: () => {}
}

const AuthContext = createContext<AuthProps>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null,
    authenticated: boolean | null
  }>({
    token: null,
     authenticated: null
  });
  const [loading, setLoading] = useState(true);

  // load token at first access page if have
  useEffect(() => {
    const loadToken = async () => {
      const token = await getToken();
      if(token) {
        setAuthState({
          token,
          authenticated: true
        })
      }
      setLoading(false);
    }
    loadToken();
  }, [])

  const login = async (email: string, password: string) => {
    const res = await POST<LoginResponse>(
      '/user/sign-in', 
      '', // Token (if applicable)
      {
        email: email,
        password: password,
      }
    );
    if(res.status && res.data.access_token) {
      setAuthState({
        token: res.data.access_token,
        authenticated: true
      })
      await saveToken(res.data.access_token);
    }
    return res;
  }

  const register = async ({name, email, password, confirmPassword}: 
    {name: string, email: string, password: string, confirmPassword: string}) => {
    const res = await POST<RegisterResponse>(
      '/user/sign-up', 
      '',
      {
        "name": name,
        "email": email,
        "password": password,
        "confirmPassword": confirmPassword,
        "phone": "234343434"
      }
    );
    
    return res;
  }

  const logout = async () => {
    await removeToken();
    setAuthState({
      token: null,
      authenticated: false
    })
  }

  const authContext: AuthProps = {
    authState,
    loading,
    onLogin: login,
    onRegister: register,
    onLogut: logout
  };
  
  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};