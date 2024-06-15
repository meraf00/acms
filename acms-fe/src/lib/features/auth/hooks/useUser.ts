'use client';

import { useApi, useAppDispatch, useAppSelector } from '@/lib/core/hooks';
import { login } from '../store/slice';
import { useEffect } from 'react';

export const useUser = () => {
  const client = useApi();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (currentUser) return;

    const getMe = async () => {
      const { data } = await client.get('/auth/me');
      const user = data.data;

      dispatch(login({ user }));
    };

    getMe();
  }, [client, currentUser, dispatch]);

  return currentUser;
};
