"use client";

import { useAppSelector } from "@/lib/core/hooks";
import AuthGuard from "@/lib/features/auth/components/auth-guard";
import { Sidebar } from "@/lib/features/dashboard/components/side-bar";
import { UserNav } from "@/lib/features/dashboard/components/user-nav";
import { ScrollArea } from "@radix-ui/react-scroll-area";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAppSelector((state) => state.auth.user);

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
        className="flex absolute right-4 top-0 pt-7 px-4  z-10 h-screen bg-opacity-70 backdrop-blur-sm dark:bg-[#171C23] dark:bg-opacity-70 dark:backdrop-blur-sm 
        dark:border-l dark:border-gray-600/25 border-l border-gray-600/25 border-dashed"
      >
        {user && (
          <UserNav
            email={user!.email}
            name={user!.name}
            avatarImage={user!.picture}
          />
        )}
      </div>

      <ScrollArea className="relative w-full lg:w-4/5 h-screen overflow-auto dark:bg-opacity-5 dark:bg-black">
        <main className="pl-16 py-6 mt-14">{children}</main>
      </ScrollArea>
    </div>
  );
}

export default AuthGuard({ Component: DashboardLayout });
