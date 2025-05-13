"use client";
import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({
  collapsed: true,
  setCollapsed: (collapsed: boolean) => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
