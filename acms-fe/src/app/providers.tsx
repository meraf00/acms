'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/components/theme-provider';
import StreamProvider from '@/lib/features/recording/components/stream-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AppStore, makeStore } from '@/store/store';
import AuthProvider from '@/components/auth/auth-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const storeRef = useRef<AppStore>();

  useEffect(() => {
    if (!storeRef.current) {
      storeRef.current = makeStore();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={makeStore()}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <StreamProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </StreamProvider>
          </ThemeProvider>
        </AuthProvider>
      </Provider>
    </QueryClientProvider>
  );
}
