'use client';

import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/lib/store/auth/slice';
import { redirect, useSearchParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

export default function Auth() {
  const params = useSearchParams();
  const dispatch = useAppDispatch();

  const token = params.get('t');

  useEffect(() => {
    if (!token) return;

    const decoded: any = jwtDecode(token);

    dispatch(
      login({
        token,
        user: {
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture,
          role: decoded.role,
        },
      })
    );
  }, [dispatch, token]);

  if (!token) return redirect('/auth/login');

  return redirect('/');
}
