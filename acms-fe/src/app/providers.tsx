'use client';

import { AppStore, makeStore } from '@/lib/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';

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
      <Provider store={makeStore()}>{children}</Provider>
    </QueryClientProvider>
  );
}
