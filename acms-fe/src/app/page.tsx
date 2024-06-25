import { Guides } from '@/lib/features/guides/guides';
import Image from 'next/image';
import DarkLogo from '@public/logos/acms-high-resolution-logo-white-transparent.svg';
import LightLogo from '@public/logos/acms-high-resolution-logo-transparent.svg';
import Link from 'next/link';
import { cn } from '@/lib/core/utils';
import { buttonVariants } from '@/components/ui/button';
import { Activity } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col gap-10 flex-wrap px-24 py-16 ">
      <div className="flex justify-between items-center">
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

        <div className="flex mt-10">
          <Link
            href="/contests/ongoing"
            className={cn(
              'w-full',
              'gap-2',
              buttonVariants({ variant: 'link' })
            )}
          >
            <Activity className="w-4 h-4" />
            Ongoing Contests
          </Link>
        </div>
      </div>
      <Guides />
    </div>
  );
}
