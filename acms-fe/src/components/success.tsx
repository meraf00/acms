'use client';

import React, { useEffect, useRef } from 'react';
import { BackgroundBeams } from './ui/background-beams';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button, buttonVariants } from './ui/button';
import DarkLogo from '@public/logos/acms-high-resolution-logo-white-transparent.svg';
import LightLogo from '@public/logos/acms-high-resolution-logo-transparent.svg';
import { cn } from '@/lib/core/utils';
import { redirect } from 'next/navigation';
import { useAppDispatch } from '@/lib/core/hooks';

export default function Success({ setAccessTokenCookie }: any) {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const ref = useRef<any>(null);

  const [show, setShow] = React.useState(false);

  return (
    <div className=" flex flex-col justify-center items-center h-screen w-full relative gap-4">
      <BackgroundBeams className="-z-10" />

      <Image
        className="block dark:hidden"
        src={LightLogo}
        width={200}
        height={200}
        alt="ACMS logo"
      />
      <Image
        className="hidden dark:block"
        src={DarkLogo}
        width={200}
        height={200}
        alt="ACMS logo"
      />

      <form
        action={() => setAccessTokenCookie(searchParams.get('t')!)}
        className="flex flex-col items-center justify-center "
      >
        <span className="text-foreground text-sm animate-pulse">
          Logging in you will be automatically redirected
        </span>

        <Button
          ref={ref}
          type="submit"
          variant={'ghost'}
          className={cn('mt-5', show ? '' : 'hidden')}
          onClick={() => redirect('/')}
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
