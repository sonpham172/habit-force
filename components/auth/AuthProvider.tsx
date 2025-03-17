import { POST } from '@/app/hooks/useFetchData';
import { getToken, removeToken, saveToken } from '@/app/utils/secureStore';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthProps {
  authState?: {token: string | null, authenticated: boolean | null},
  loading?: boolean | null,
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogut?: () => Promise<any>
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
    try {
      const res = await POST(
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
    } catch (error) {
      console.error('Error in handleSignIn:', error);
    }
  }

  const register = async () => {
    try {
      const res = await POST(
        '/user/sign-up', 
        '',
        {
          "name": "nhi2",
          "email": "nhi2@gmail.com",
          "password": "12345678",
          "confirmPassword": "12345678",
          "phone": "234343434"
        }
      );
      
      return res;
    } catch (error) {
      console.error('Error in handleSignUp:', error);
    }
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