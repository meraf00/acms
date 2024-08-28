import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={cn(inter.className, 'relative')}>
        <Providers>
          <div className="fixed bottom-5 right-3 z-50">
            <ModeToggle />
          </div>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
