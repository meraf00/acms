import { appCookies, siteConfig } from '@/lib/core/config';
import { Session } from '@/lib/features/auth/types/session';

export async function auth(): Promise<Session | null> {
  const cookies = require('next/headers').cookies;

  const response = await fetch(`${siteConfig.api.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get(appCookies.accessToken)?.value}`,
    },
  });

  if (response.ok) {
    return { user: (await response.json()).data };
  }

  return null;
}
