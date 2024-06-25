'use server';

import { cookies } from 'next/headers';

async function setAccessTokenCookie(authToken: string) {
  'use server';
  cookies().set({
    name: 'access_token',
    value: authToken,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
  });
}

async function removeAccessTokenCookie() {
  cookies().set({
    name: 'access_token',
    value: '',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
}

export { setAccessTokenCookie, removeAccessTokenCookie };
