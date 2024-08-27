import { siteConfig } from '@/lib/config';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  // const searchParams = request.nextUrl.searchParams;
  // const authToken = searchParams.get('token');

  if (!params.token) {
    return redirect('/auth/login');
  }

  return redirect(`${siteConfig.links.otp}/${params.token}`);
}
