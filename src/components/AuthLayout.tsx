"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarProvider } from "./SidebarContext";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

export default function AuthLayout({
  session,
  children,
}: {
  session: any;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage =
    pathname === "/login" || pathname === "/register" || pathname === "/";
  const sidebarVisible = !!session && !isAuthPage;

  useEffect(() => {
    if (session && isAuthPage) {
      router.replace("/dashboard");
    }
  }, [session, isAuthPage, router]);

  return (
    <SidebarProvider>
      {sidebarVisible && <Sidebar />}
      <MainContent isAuthPage={isAuthPage} sidebarVisible={sidebarVisible}>
        {children}
      </MainContent>
    </SidebarProvider>
  );
}
