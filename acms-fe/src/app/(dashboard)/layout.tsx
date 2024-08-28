import { auth } from '@/actions/auth';
import AuthGuard from '@/components/auth/auth-guard';
import { Sidebar } from '@/components/dashboard/side-bar';
import { UserNav } from '@/components/dashboard/user-nav';


async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let session = await auth();

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div
        className="sticky h-screen top-0 w-fit lg:w-1/5 
      dark:border-r dark:border-gray-600/25 border-r 
      border-gray-600/25 border-dashed 
      bg-opacity-5 dark:bg-opacity-5 dark:bg-black"
      >
        <Sidebar className="mr-15" />
      </div>

      <div
        className="flex absolute right-0 top-0 pt-7 px-4  z-10 h-screen bg-opacity-70 backdrop-blur-sm dark:bg-[#171C23] dark:bg-opacity-70 dark:backdrop-blur-sm 
        dark:border-l dark:border-gray-600/25 border-l border-gray-600/25 border-dashed"
      >
        {session && session.user && (
          <UserNav
            email={session?.user.email}
            name={session?.user.name}
            avatarImage={session?.user.picture}
          />
        )}
      </div>

      <div className="relative w-full h-screen overflow-x-hidden overflow-y-auto dark:bg-opacity-5 dark:bg-black no-scrollbar">
        <main className="pl-16 py-6 mt-14 mr-10 w-full overflow-clip">{children}</main>
      </div>
    </div>
  );
}

export default AuthGuard({ Component: DashboardLayout });
