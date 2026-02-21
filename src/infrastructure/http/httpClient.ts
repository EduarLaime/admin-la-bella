import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add auth token
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    // Si el token ya tiene 'Bearer ', lo usamos tal cual, si no lo agregamos.
    config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  }
  return config;
});

export default httpClient;
