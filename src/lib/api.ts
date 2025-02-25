
import axios from 'axios';
import { useAuthStore } from './store';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await api.post('/auth/forgot-password', { email });
    return true;
  } catch (error) {
    throw new Error('Failed to process request');
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    await api.post('/auth/reset-password', { token, password });
    return true;
  } catch (error) {
    throw new Error('Failed to reset password');
  }
};

export const updateProfile = async (data: any) => {
  try {
    const response = await api.put('/users/profile', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update profile');
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch users');
  }
};

export default api;
