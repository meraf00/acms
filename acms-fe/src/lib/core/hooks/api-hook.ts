'use client';

import { useEffect } from 'react';
import { siteConfig } from '../config';
import axios from 'axios';
import { useAppSelector } from './state-hooks';

export const useApi = () => {
  const api = axios.create({
    baseURL: siteConfig.api.baseUrl,
  });

  const user = useAppSelector((state) => state.auth.user);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      };
    } else {
      axios.defaults.headers.common = {};
    }

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // window.location.href = '/auth/login';
        }
      }
    );
  }, [api, user]);

  return api;
};
