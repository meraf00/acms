'use client';

import Image from 'next/image';
import Link from 'next/link';

import { BackgroundBeams } from '@/components/ui/background-beams';
import DarkLogo from '@public/logos/acms-high-resolution-logo-white-transparent.svg';
import LightLogo from '@public/logos/acms-high-resolution-logo-transparent.svg';

export default function ForbiddenPage() {
  return (
    <div className="container relative flex flex-col-reverse md:flex-row justify-center h-screen gap-y-16 bg-muted dark:bg-background dark:saturate-200">
      <div className="w-full z-10 p-5 flex justify-center md:w-1/2 md:h-full md:flex-col-reverse md:justify-start">
        <BackgroundBeams />
        <div className="text-sm dark:text-gray-400 z-30">
          Built at{' '}
          <Link
            href="https://a2sv.org/"
            className="font-semibold hover:text-primary dark:hover:text-foreground transition-colors duration-300"
          >
            A2SV
          </Link>
          .
        </div>
      </div>
      <div className="w-full flex flex-col gap-10 justify-center items-center md:w-1/2 z-30">
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
      </div>
    </div>
  );
}
