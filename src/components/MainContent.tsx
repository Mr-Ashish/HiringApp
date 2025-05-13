"use client";
import { useSidebar } from "./SidebarContext";

export default function MainContent({
  children,
  isAuthPage = false,
}: {
  children: React.ReactNode;
  isAuthPage?: boolean;
}) {
  const { collapsed } = useSidebar();
  return (
    <main
      className={
        !isAuthPage
          ? collapsed
            ? "ml-20 transition-all duration-200"
            : "ml-72 transition-all duration-200"
          : ""
      }
    >
      {children}
    </main>
  );
}
