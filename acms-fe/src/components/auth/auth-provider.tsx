'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useGetUserQuery } from '@/store/auth/api';
import { setToken, setUser } from '@/store/auth/slice';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  const { data: user, error } = useGetUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (error) {
      dispatch(setToken(null));
    }

    if (user) {
      dispatch(setUser(user));
    }
  }, [user, error, dispatch]);

  useEffect(() => {
    if (!user)
      fetch('/auth/me', {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          dispatch(setToken(data.token));
        });
  }, [dispatch, user]);

  return children;
}
