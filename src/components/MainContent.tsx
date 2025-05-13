"use client";
import { useSidebar } from "./SidebarContext";

export default function MainContent({
  children,
  isAuthPage = false,
  sidebarVisible = false,
}: {
  children: React.ReactNode;
  isAuthPage?: boolean;
  sidebarVisible?: boolean;
}) {
  const { collapsed } = useSidebar();
  return (
    <main
      className={
        !isAuthPage && sidebarVisible
          ? `${
              collapsed ? "ml-20" : "ml-72"
            } transition-all duration-200 bg-gray-100 min-h-screen p-6`
          : ""
      }
    >
      {children}
    </main>
  );
}
