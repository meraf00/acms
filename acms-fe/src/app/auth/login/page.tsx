'use client';

import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/lib/core/config';
import { cn } from '@/lib/core/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { useTheme } from 'next-themes';
import DarkLogo from '@public/logos/acms-high-resolution-logo-white-transparent.svg';
import LightLogo from '@public/logos/acms-high-resolution-logo-transparent.svg';
import { useState } from 'react';
import { LoginForm } from '@/lib/features/auth/components/login-form';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function LoginPage() {
  const theme = useTheme();

  const [page, setPage] = useState(false);

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

        <div className="flex flex-col gap-5 lg:w-[18rem]">
          {!page ? (
            <Link
              href={siteConfig.links.google ?? ''}
              className={cn(buttonVariants({ variant: 'outline' }))}
            >
              <Icons.google className="h-4 w-4 mr-5" /> Continue with A2SV
              account
            </Link>
          ) : (
            <LoginForm />
          )}
        </div>

        <Button
          onClick={() => setPage((page) => !page)}
          variant="outline"
          className="rounded-full gap-2"
        >
          {!page ? (
            <>
              <span>Get login link with email</span>
              <ChevronsRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Continue with A2SV account</span>
              <ChevronsLeft className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
