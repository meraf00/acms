'use client';

import { useAppDispatch, useAppSelector } from '@/lib/core/hooks';
import { login, logout } from '@/lib/features/auth/store/slice';
import { redirect, useSearchParams } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { BackgroundBeams } from '@/components/ui/background-beams';
import Image from 'next/image';

export default function Auth() {
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const token = params.get('t');

  useEffect(() => {
    if (!token) return;

    dispatch(logout());

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

  if (user) return redirect('/');

  return (
    <div className=" flex flex-col justify-center items-center h-screen w-full relative">
      <BackgroundBeams />
      <Image
        className="animate-pulse"
        src="/logos/acms-high-resolution-logo-white-transparent.svg"
        width={200}
        height={200}
        alt="ACMS logo"
      />
      <span className="animate-pulse">Logging in</span>
    </div>
  );
}
