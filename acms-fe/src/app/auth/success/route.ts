import { appCookies, siteConfig } from '@/lib/core/config';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const authToken = searchParams.get('t');
  const redirectTo = searchParams.get('redirect');

  if (!authToken) {
    return redirect('/auth/login');
  }

  cookies().set({
    name: appCookies.accessToken,
    value: authToken,
    httpOnly: true,
    secure: siteConfig.isProduction,
    maxAge: siteConfig.api.cookieMaxAge,
    sameSite: 'strict',
    path: '/',
  });

  return redirect(redirectTo ?? '/');
}
