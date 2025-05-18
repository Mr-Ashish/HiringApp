"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import PageContainer from "@/components/layouts/PageContainer";
import PageHeader from "@/components/layouts/PageHeader";
import { StyledInput } from "@/components/forms/StyledInput";
import { StyledSelect } from "@/components/forms/StyledSelect";
import { StyledTextarea } from "@/components/forms/StyledTextarea";

// Candidate type definition (align with model)
type Candidate = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  currentRole?: string;
  currentCompany?: string;
  location?: string;
  keySkills: string[];
  yearsOfExperience?: number;
  resumeUrl?: string;
  source?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

const statusOptions = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "SCREENED", label: "Screened" },
  { value: "INTERVIEWING", label: "Interviewing" },
  { value: "OFFERED", label: "Offered" },
  { value: "HIRED", label: "Hired" },
  { value: "REJECTED", label: "Rejected" },
  { value: "WITHDRAWN", label: "Withdrawn" },
];

export default function CandidateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const candidateId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Candidate>>({});
  const [skillsInput, setSkillsInput] = useState("");

  useEffect(() => {
    async function fetchCandidate() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/candidates/${candidateId}`);
        if (!res.ok) throw new Error("Failed to fetch candidate");
        const data = await res.json();
        setForm({ ...data, keySkills: data.keySkills || [] });
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    if (candidateId) fetchCandidate();
  }, [candidateId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: Partial<Candidate>) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev: Partial<Candidate>) => ({ ...prev, [name]: value }));
  };

  const handleSkillsInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && skillsInput.trim()) {
      e.preventDefault();
      if (!form.keySkills?.includes(skillsInput.trim())) {
        setForm((prev: Partial<Candidate>) => ({
          ...prev,
          keySkills: [...(prev.keySkills || []), skillsInput.trim()],
        }));
      }
      setSkillsInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setForm((prev: Partial<Candidate>) => ({
      ...prev,
      keySkills: (prev.keySkills || []).filter(
        (skill) => skill !== skillToRemove
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/candidates/${candidateId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to update candidate");
      // Optionally, refresh or show a success message
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageContainer maxWidth="max-w-2xl">
        <div className="p-8 text-center text-gray-500">Loading...</div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer maxWidth="max-w-2xl">
        <div className="p-8 text-center text-red-500">{error}</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="max-w-2xl">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        ← Back
      </button>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Candidate</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-4"
      >
        <StyledInput
          label="Full Name"
          name="fullName"
          value={form.fullName || ""}
          onChange={handleChange}
          required
        />
        <StyledInput
          label="Email"
          name="email"
          type="email"
          value={form.email || ""}
          onChange={handleChange}
          required
        />
        <StyledInput
          label="Phone"
          name="phone"
          value={form.phone || ""}
          onChange={handleChange}
        />
        <StyledInput
          label="LinkedIn URL"
          name="linkedinUrl"
          value={form.linkedinUrl || ""}
          onChange={handleChange}
        />
        <StyledInput
          label="Current Role"
          name="currentRole"
          value={form.currentRole || ""}
          onChange={handleChange}
        />
        <StyledInput
          label="Current Company"
          name="currentCompany"
          value={form.currentCompany || ""}
          onChange={handleChange}
        />
        <StyledInput
          label="Location"
          name="location"
          value={form.location || ""}
          onChange={handleChange}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(form.keySkills || []).map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            onKeyDown={handleSkillsInputKeyDown}
            placeholder="Type a skill and press Enter"
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <StyledInput
          label="Years of Experience"
          name="yearsOfExperience"
          type="number"
          value={form.yearsOfExperience || ""}
          onChange={handleChange}
        />
        <StyledSelect
          label="Status"
          name="status"
          value={form.status || "NEW"}
          onChange={handleSelectChange}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </StyledSelect>
        <StyledTextarea
          label="Notes"
          name="notes"
          value={form.notes || ""}
          onChange={handleChange}
        />
        {form.resumeUrl && (
          <div>
            <span className="font-semibold">Resume:</span>{" "}
            <a
              href={form.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 underline"
            >
              Download
            </a>
          </div>
        )}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            disabled={loading}
          >
            Save Changes
          </button>
        </div>
      </form>
    </PageContainer>
  );
}
