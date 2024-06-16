'use client';

import { BackgroundBeams } from '@/components/ui/background-beams';
import Image from 'next/image';
import { useUser } from '@/lib/features/auth/hooks/useUser';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function AuthSuccess() {
  const user = useUser();

  useEffect(() => {
    if (user) {
      redirect('/');
    }
  }, [user]);

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
