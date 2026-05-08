/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('aegis_token');
      if (savedToken) {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.data.user); // Contains user + role
        } catch (error) {
          console.warn("Session expired or invalid token", error);
          localStorage.removeItem('aegis_token');
          localStorage.removeItem('aegis_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { email, password });
      const { user, session, role } = response.data.data;
      
      const userData = { ...user, role };
      setUser(userData);
      
      localStorage.setItem('aegis_token', session.access_token);
      localStorage.setItem('aegis_user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, firstName, lastName, role = 'donor') => {
    try {
      setLoading(true);
      const response = await api.post('/auth/register', { 
        email, 
        password, 
        first_name: firstName, 
        last_name: lastName, 
        role 
      });
      const { user, session } = response.data.data;
      
      // We assume newly registered users are donors by default.
      const userData = { ...user, role: role };
      setUser(userData);
      
      localStorage.setItem('aegis_token', session.access_token);
      localStorage.setItem('aegis_user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aegis_token');
    localStorage.removeItem('aegis_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

