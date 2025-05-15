"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { SidebarProvider } from "./SidebarContext";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { isPublicRoute } from "@/lib/auth-config";

export default function AuthLayout({
  session,
  children,
}: {
  session: any;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = isPublicRoute(pathname);
  const sidebarVisible = !!session && !isAuthPage;

  useEffect(() => {
    // Only redirect if we have a session and we're on an auth page
    if (session && isAuthPage && pathname !== "/") {
      router.replace("/dashboard");
    }
  }, [session, isAuthPage, router, pathname]);

  return (
    <SidebarProvider>
      {sidebarVisible && <Sidebar />}
      <MainContent isAuthPage={isAuthPage} sidebarVisible={sidebarVisible}>
        {children}
      </MainContent>
    </SidebarProvider>
  );
}
