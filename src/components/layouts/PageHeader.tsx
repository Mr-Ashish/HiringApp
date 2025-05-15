"use client";

import { ReactNode } from "react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  action?: {
    label: string;
    href: string;
  };
  children?: ReactNode;
}

export default function PageHeader({
  title,
  action,
  children,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        {children}
        {action && (
          <Link
            href={action.href}
            className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-center"
          >
            {action.label}
          </Link>
        )}
      </div>
    </div>
  );
}
