"use client";

import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

export default function DashboardPage() {
  return (
    <DashboardLayout title="Overview">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p className="text-gray-600">
          This is your main workspace. Use the sidebar to navigate through the
          platform features.
        </p>
      </div>
    </DashboardLayout>
  );
}
