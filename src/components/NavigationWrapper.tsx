"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();
  const isAuthPage = ["/login", "/register", "/"].includes(pathname);

  if (isAuthPage) {
    return null;
  }

  return <Navigation />;
}
