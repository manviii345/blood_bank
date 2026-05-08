import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bloodbank-1-jayb.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor to inject auth token in the future
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aegis_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
