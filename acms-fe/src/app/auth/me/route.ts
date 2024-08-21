'use server';

import { appCookies } from '@/lib/core/config';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return Response.json({
    token: cookies().get(appCookies.accessToken)?.value,
  });
}
