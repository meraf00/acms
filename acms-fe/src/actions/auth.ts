'use server';

import { appCookies, siteConfig } from '@/lib/config';
import { Session } from '@/store/auth/types';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function auth(): Promise<Session | null> {
  const response = await fetch(`${siteConfig.api.baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${cookies().get(appCookies.accessToken)?.value}`,
    },
  });

  if (response.ok) {
    return {
      user: (await response.json()).data,
      token: cookies().get(appCookies.accessToken)?.value,
    };
  }

  return null;
}

export async function getAccessToken(): Promise<string | null> {
  return cookies().get(appCookies.accessToken)?.value ?? null;
}

export async function logout(): Promise<void> {
  for (const cookie of cookies().getAll()) {
    cookies().delete(cookie.name);
  }

  revalidatePath('/');
}
