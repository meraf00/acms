import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/lib/core/config';
import { cn } from '@/lib/core/utils';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { BackgroundBeams } from '@/components/ui/background-beams';

export default function LoginPage() {
  return (
    <div className="container relative flex flex-col-reverse md:flex-row justify-center h-screen gap-y-16">
      <div className="w-full -z-10 p-5 flex justify-center md:w-1/2 md:h-full md:flex-col-reverse md:justify-start">
        <BackgroundBeams />
        <div className="text-sm text-gray-400">Powered by A2SV.</div>
      </div>
      <div className="w-full flex flex-col gap-10 justify-center items-center md:w-1/2">
        <Image
          src={'/logos/acms-high-resolution-logo-white-transparent.svg'}
          width={200}
          height={200}
          alt="ACMS logo"
        ></Image>
        <Link
          href={siteConfig.links.google ?? ''}
          className={cn(buttonVariants({ variant: 'outline' }))}
        >
          <Icons.google className="h-4 w-4 mr-5" /> Continue with A2SV email
        </Link>
      </div>
    </div>
  );
}
