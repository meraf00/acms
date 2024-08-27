import AuthGuard from "@/components/auth/auth-guard";

function ContestsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}

export default AuthGuard({
  Component: ContestsLayout,
  allowedRoles: ['hoe', 'hoa', 'acms'],
});
