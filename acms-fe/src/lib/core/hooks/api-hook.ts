'use client';

import { useEffect } from 'react';
import { siteConfig } from '../config';
import axios from 'axios';

export const useApi = () => {
  const api = axios.create({
    baseURL: siteConfig.api.baseUrl,
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    };
  }, [api]);

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // window.location.href = '/auth/login';
        console.log('Unauthorized');
      }
    }
  );

  return api;
};
