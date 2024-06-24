'use client';

import { BackgroundBeams } from '@/components/ui/background-beams';
import Image from 'next/image';
import { useEffect } from 'react';
import { redirect, useParams } from 'next/navigation';
import { siteConfig } from '@/lib/core/config';

export default function OTP() {
  
  const params = useParams();

  const token = params['token'] as string;

  useEffect(() => {
    if (token) {
      redirect(`${siteConfig.links.otp}/${token}`);
    }
  }, [token]);

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
      <span className="animate-pulse">Wait a moment...</span>
    </div>
  );
}
