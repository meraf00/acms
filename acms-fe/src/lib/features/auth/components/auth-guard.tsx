import { redirect } from 'next/navigation';
import { auth } from '../utils';

export interface AuthGuardProps {
  Component: React.JSXElementConstructor<any>;
  allowedRoles?: string[];
}

export default function AuthGuard({ Component, allowedRoles }: AuthGuardProps) {
  return async function IsAuth(props: any) {
    const session = await auth();

    if (!session) {
      redirect('/auth/login');
    }

    if (allowedRoles && !allowedRoles.includes(session.user.role)) {
      redirect('/auth/forbidden');
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  };
}
