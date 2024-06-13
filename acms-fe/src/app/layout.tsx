import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/core/utils';

const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ACMS',
  description: 'A2SV contest monitoring system',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(quicksand.className, 'relative')}>
        <Providers>
          <div className="fixed bottom-5 right-5 z-50">
            <ModeToggle />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
