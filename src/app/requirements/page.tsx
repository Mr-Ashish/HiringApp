"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import PageContainer from "@/components/layouts/PageContainer";
import PageHeader from "@/components/layouts/PageHeader";
import TableContainer from "@/components/layouts/TableContainer";
import { CandidateStatus } from "@prisma/client";

interface Requirement {
  id: string;
  title: string;
  client: {
    name: string;
  };
  priority: string;
  status: string;
  dateOpened: string;
  createdAt: string;
}

export default function RequirementsPage() {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchRequirements();
    }, 400);
    return () => clearTimeout(handler);
  }, [search, statusFilter, priorityFilter]);

  const fetchRequirements = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      if (statusFilter) queryParams.append("status", statusFilter);
      if (priorityFilter) queryParams.append("priority", priorityFilter);

      const response = await fetch(`/api/requirements?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch requirements");
      const data = await response.json();
      setRequirements(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout title="Requirements">
        <PageContainer>
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Loading...</div>
          </div>
        </PageContainer>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Requirements">
      <PageContainer>
        <PageHeader
          title="Requirements"
          action={{
            label: "Add New Requirement",
            href: "/requirements/new",
          }}
        />

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search requirements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="CLOSED">Closed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <TableContainer>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Opened
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requirements.map((requirement) => (
                <tr key={requirement.id}>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {requirement.title}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {requirement.client.name}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        requirement.priority === "HIGH"
                          ? "bg-red-100 text-red-800"
                          : requirement.priority === "MEDIUM"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {requirement.priority}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        requirement.status === "OPEN"
                          ? "bg-green-100 text-green-800"
                          : requirement.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {requirement.status}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(requirement.dateOpened).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/requirements/${requirement.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </PageContainer>
    </DashboardLayout>
  );
}
