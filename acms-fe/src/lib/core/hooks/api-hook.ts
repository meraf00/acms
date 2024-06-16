import { siteConfig } from '../config';
import axios from 'axios';

export const useApi = () => {
  const api = axios.create({
    baseURL: siteConfig.api.baseUrl,
  });

  axios.defaults.withCredentials = true;

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        window.location.href = '/auth/login';
      }
    }
  );

  return api;
};
