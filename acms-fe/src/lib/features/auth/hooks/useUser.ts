'use client';

import { useApi, useAppDispatch, useAppSelector } from '@/lib/core/hooks';
import { loaded, login } from '../store/slice';
import { useEffect } from 'react';

export const useUser = () => {
  const client = useApi();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);
  const userLoaded = useAppSelector((state) => state.auth.loaded);

  useEffect(() => {
    if (currentUser) return;

    const getMe = async () => {
      const response = await client.get('/users/me');

      if (response && response.status === 200) {
        const user = response.data.data;

        dispatch(login({ user }));
        dispatch(loaded());
      } else {
        dispatch(login({ user: null }));
        dispatch(loaded());
      }
    };

    getMe();
  }, [client, currentUser, dispatch]);

  return { currentUser, userLoaded };
};
