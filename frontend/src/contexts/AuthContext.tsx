import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// Define the shape of the user object
interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Define the shape of the authentication context
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => {},
  logout: () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth object available to any child component that calls useAuth()
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Configure axios
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add token to requests if available
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Function to fetch user data
  const fetchUserData = async () => {
    if (!token) return;

    try {
      setIsLoading(true);
      const response = await api.get('/api/auth/me');
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      // If token is invalid, clear it
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch user data when token changes
  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]);

  // Login function
  const login = async (usernameOrEmail: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await api.post('/api/auth/login/json', {
        email: usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
        username: !usernameOrEmail.includes('@') ? usernameOrEmail : undefined,
        password,
      });

      const { access_token } = response.data;
      
      // Save token to localStorage
      localStorage.setItem('token', access_token);
      setToken(access_token);
    } catch (err) {
      console.error('Login error:', err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.detail || 'An error occurred during login');
      } else {
        setError('An unexpected error occurred');
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Create the value object
  const value = {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};