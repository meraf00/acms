import AuthGuard from "@/components/auth/auth-guard";

function HeadsContestViewLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return children;
}

export default AuthGuard({
    Component: HeadsContestViewLayout,
    allowedRoles: ['hoe', 'hoa', 'acms'],
});

