"use client";

import { useRouter } from "next/navigation";

export default function FormPageHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center mb-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="mr-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
    </div>
  );
}
