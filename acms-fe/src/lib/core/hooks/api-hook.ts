'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '../config';
import { useAppSelector } from './state-hooks';
import axios from 'axios';

export const useApi = () => {
  const token = useAppSelector((state) => state.auth.token);
  const api = axios.create({
    baseURL: siteConfig.api.baseUrl,
  });

  api.defaults.headers['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }, [api.defaults.headers, token]);

  return api;
};
