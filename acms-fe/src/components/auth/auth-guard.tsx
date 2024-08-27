import { auth } from '@/actions/auth';
import { redirect } from 'next/navigation';

export interface AuthGuardProps {
  Component: React.JSXElementConstructor<any>;
  allowedRoles?: string[];
}

export default function AuthGuard({ Component, allowedRoles }: AuthGuardProps) {
  return async function IsAuth(props: any) {
    const session = await auth();

    if (!session || !session.user) {
      redirect('/auth/login');
    }

    if (allowedRoles && !allowedRoles.includes(session!.user.role)) {
      redirect('/auth/forbidden');
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  };
}
