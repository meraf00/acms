'use client';

import { useAppDispatch, useAppSelector } from '@/lib/core/hooks';
import React, { useEffect } from 'react';
import { setToken, setUser } from '../store/slice';
import { useGetUserQuery } from '../store/api';

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
    fetch('/auth/me', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setToken(data.token));
      });
  }, [dispatch]);

  return children;
}
