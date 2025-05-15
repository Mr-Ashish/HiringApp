"use client";

import { ReactNode } from "react";

/**
 * PageContainer is a reusable layout wrapper for centering content and controlling max width.
 * Usage: <PageContainer>...</PageContainer>
 * By default: full width on mobile, max-w-6xl and centered on large screens.
 * Ensures content hugs the sidebar and avoids excessive left margin.
 */
interface PageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string; // e.g., 'max-w-2xl', 'max-w-5xl', 'max-w-7xl', 'max-w-full'
}

export default function PageContainer({
  children,
  className = "",
  maxWidth = "max-w-full lg:max-w-6xl",
}: PageContainerProps) {
  return (
    <div className={`w-full ${maxWidth} mx-auto p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}
