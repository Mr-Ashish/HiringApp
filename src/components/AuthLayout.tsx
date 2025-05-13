"use client";
import { usePathname } from "next/navigation";
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
  const isAuthPage = pathname === "/login" || pathname === "/register";
  return (
    <SidebarProvider>
      {session && !isAuthPage && <Sidebar />}
      <MainContent isAuthPage={isAuthPage}>{children}</MainContent>
    </SidebarProvider>
  );
}
