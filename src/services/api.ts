import axios from 'axios';
import { API_AUTH_URL, API_ACTIONS_URL, ROUTES } from '../utils/constants';
import { storage } from '../utils/storage';

export const authApi = axios.create({
  baseURL: API_AUTH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const actionsApi = axios.create({
  baseURL: API_ACTIONS_URL,
});

actionsApi.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = Bearer ${token};
    }
    return config;
  },
  (error) => Promise.reject(error)
);

actionsApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.removeToken();
      window.location.href = ROUTES.LOGIN;
    }
    return Promise.reject(error);
  }
);