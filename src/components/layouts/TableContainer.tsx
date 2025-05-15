"use client";

import { ReactNode } from "react";

interface TableContainerProps {
  children: ReactNode;
  className?: string;
}

export default function TableContainer({
  children,
  className = "",
}: TableContainerProps) {
  return (
    <div className={`bg-white shadow rounded-lg overflow-hidden ${className}`}>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}
