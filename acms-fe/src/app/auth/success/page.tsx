'use server';

import { cookies } from 'next/headers';
import Success from '@/components/success';
import { siteConfig } from '@/lib/core/config';
import { redirect } from 'next/navigation';

async function setAccessTokenCookie(authToken: string) {
  'use server';

  cookies().set({
    name: 'access_token',
    value: authToken,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: siteConfig.api.cookieMaxAge,
    path: '/',
  });

  redirect('/');
}

export default async function AuthSuccess() {
  return <Success setAccessTokenCookie={setAccessTokenCookie} />;
}
