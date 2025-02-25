
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '../store';

class ApiService {
  private api: AxiosInstance;
  private mockDelay: number = 0;

  constructor() {
    this.api = axios.create({
      baseURL: '/api',
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(response);
          }, this.mockDelay);
        });
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
        }
        return Promise.reject(error);
      }
    );
  }

  setMockDelay(delay: number) {
    this.mockDelay = delay;
  }

  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url);
    return response.data;
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url);
    return response.data;
  }
}

export const apiService = new ApiService();
