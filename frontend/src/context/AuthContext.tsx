'use client';

import React, { createContext, useEffect, useState } from 'react';
import axiosInstance from '@/api/axios';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext<{
  auth: {
    isAuthenticated: boolean;
    user: any;
    token: string | null;
  };
  login: (email: string, password: string) => void;
  signup: (username: string, email: string, password: string) => void;
  logout: () => void;
}>({
  auth: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
  login: async (email: string, password: string) => {},
  signup: async (username: string, email: string, password: string) => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast();
  const [auth, setAuth] = useState<{
    isAuthenticated: boolean;
    user: any;
    token: string | null;
  }>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      setAuth({
        isAuthenticated: true,
        user: null,
        token: window.localStorage.getItem('token'),
      });

      const getUser = async () => {
        try {
          const response = await axiosInstance.get('/auth');

          if (response.status === 200) {
            setAuth({
              isAuthenticated: true,
              user: response.data,
              token: window.localStorage.getItem('token'),
            });
          }
        } catch (error) {
          console.error('Get user error:', error);
        }
      };
      getUser();
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);

      setAuth({ isAuthenticated: true, user: response.data.user, token });

      toast({
        title: 'Logged in.',
        description: 'You have successfully logged in.',
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed.',
        description: 'An error occurred while logging in.',
        variant: 'destructive',
      });
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/signup', {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        const { token, user } = response.data;

        localStorage.setItem('token', token);

        setAuth({ isAuthenticated: true, user: response.data.user, token });
        toast({
          title: 'Account created.',
          description: 'You have successfully created an account.',
          variant: 'default',
        });
      } else {
        console.log(response.data.error);
        toast({
          title: 'Account not created.',
          description: response.data.error,
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Account not created.',
        description:
          'An error occurred while creating an account.\n\n' +
          error.response.data.error,
        variant: 'destructive',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ isAuthenticated: false, user: null, token: null });
    toast({
      title: 'Logged out.',
      description: 'You have successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
