"use client";

import { useState, useEffect, ChangeEvent } from "react";
import Link from "next/link";
import { CandidateStatus } from "@prisma/client";
import TableContainer from "@/components/layouts/TableContainer";
import PageContainer from "@/components/layouts/PageContainer";
import PageHeader from "@/components/layouts/PageHeader";
import { StyledInput } from "@/components/forms/StyledInput";
import { StyledSelect } from "@/components/forms/StyledSelect";

type Candidate = {
  id: string;
  fullName: string;
  email: string;
  currentRole: string | null;
  currentCompany: string | null;
  status: CandidateStatus;
  source: string | null;
  createdAt: string;
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<CandidateStatus | "">("");
  const [sourceFilter, setSourceFilter] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCandidates();
    }, 400);
    return () => clearTimeout(handler);
  }, [search, statusFilter, sourceFilter]);

  const fetchCandidates = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (statusFilter) params.append("status", statusFilter);
      if (sourceFilter) params.append("source", sourceFilter);

      const response = await fetch(`/api/candidates?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch candidates");

      const data = await response.json();
      setCandidates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer maxWidth="max-w-7xl">
      <PageHeader
        title="Candidates"
        action={{
          label: "Add Candidate",
          href: "/candidates/new",
        }}
      />

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StyledInput
            label="Search"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name, email, role..."
          />

          <StyledSelect
            label="Status"
            value={statusFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setStatusFilter(e.target.value as CandidateStatus | "")
            }
          >
            <option value="">All Statuses</option>
            {Object.values(CandidateStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </StyledSelect>

          <StyledSelect
            label="Source"
            value={sourceFilter}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSourceFilter(e.target.value)
            }
          >
            <option value="">All Sources</option>
            <option value="LINKEDIN">LinkedIn</option>
            <option value="REFERRAL">Referral</option>
            <option value="JOB_BOARD">Job Board</option>
            <option value="DIRECT">Direct</option>
            <option value="OTHER">Other</option>
          </StyledSelect>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md mb-6">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : candidates.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No candidates found
        </div>
      ) : (
        <TableContainer>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Added
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {candidate.fullName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candidate.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {candidate.currentRole}
                    </div>
                    <div className="text-sm text-gray-500">
                      {candidate.currentCompany}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        candidate.status === "NEW"
                          ? "bg-blue-100 text-blue-800"
                          : candidate.status === "CONTACTED"
                          ? "bg-yellow-100 text-yellow-800"
                          : candidate.status === "SCREENED"
                          ? "bg-purple-100 text-purple-800"
                          : candidate.status === "INTERVIEWING"
                          ? "bg-indigo-100 text-indigo-800"
                          : candidate.status === "OFFERED"
                          ? "bg-green-100 text-green-800"
                          : candidate.status === "HIRED"
                          ? "bg-green-100 text-green-800"
                          : candidate.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {candidate.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(candidate.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      href={`/candidates/${candidate.id}`}
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
      )}
    </PageContainer>
  );
}
