"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StyledInput } from "./StyledInput";
import { StyledSelect } from "./StyledSelect";
import { StyledTextarea } from "./StyledTextarea";

type CandidateFormData = {
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  currentRole: string;
  currentCompany: string;
  location: string;
  keySkills: string[];
  yearsOfExperience: number;
  source: string;
  status: string;
  notes: string;
  resume: File | null;
};

const initialFormData: CandidateFormData = {
  fullName: "",
  email: "",
  phone: "",
  linkedinUrl: "",
  currentRole: "",
  currentCompany: "",
  location: "",
  keySkills: [],
  yearsOfExperience: 0,
  source: "",
  status: "NEW",
  notes: "",
  resume: null,
};

export default function CandidateForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<CandidateFormData>(initialFormData);
  const [skillsInput, setSkillsInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillsInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && skillsInput.trim()) {
      e.preventDefault();
      if (!formData.keySkills.includes(skillsInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          keySkills: [...prev.keySkills, skillsInput.trim()],
        }));
      }
      setSkillsInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      keySkills: prev.keySkills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (
        file.type !== "application/pdf" &&
        file.type !== "application/msword" &&
        file.type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setError("Please upload a PDF or Word document");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size should be less than 5MB");
        return;
      }
      setFormData((prev) => ({ ...prev, resume: file }));
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // First, create the candidate record
      const candidateResponse = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          yearsOfExperience: formData.yearsOfExperience
            ? Number(formData.yearsOfExperience)
            : 0,
          keySkills: Array.isArray(formData.keySkills)
            ? formData.keySkills
            : typeof formData.keySkills === "string"
            ? (formData.keySkills as string)
                .split(",")
                .map((s: string) => s.trim())
                .filter(Boolean)
            : [],
          status: String(formData.status || "NEW"),
          resume: undefined, // Don't send file in JSON
        }),
      });

      if (!candidateResponse.ok) {
        throw new Error("Failed to create candidate");
      }

      const candidate = await candidateResponse.json();

      // Then, if there's a resume, upload it
      if (formData.resume) {
        const uploadFormData = new FormData();
        uploadFormData.append("resume", formData.resume);
        uploadFormData.append("candidateId", candidate.id);

        const uploadResponse = await fetch("/api/candidates/upload-resume", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload resume");
        }
      }

      router.push("/candidates");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StyledInput
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />

        <StyledInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <StyledInput
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <StyledInput
          label="LinkedIn URL"
          name="linkedinUrl"
          value={formData.linkedinUrl}
          onChange={handleInputChange}
        />

        <StyledInput
          label="Current Role"
          name="currentRole"
          value={formData.currentRole}
          onChange={handleInputChange}
        />

        <StyledInput
          label="Current Company"
          name="currentCompany"
          value={formData.currentCompany}
          onChange={handleInputChange}
        />

        <StyledInput
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />

        <StyledInput
          label="Years of Experience"
          name="yearsOfExperience"
          type="number"
          value={formData.yearsOfExperience}
          onChange={handleInputChange}
        />

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.keySkills.map((skill) => (
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

        <StyledSelect
          label="Source"
          name="source"
          value={formData.source}
          onChange={handleInputChange}
        >
          <option value="">Select Source</option>
          <option value="LINKEDIN">LinkedIn</option>
          <option value="REFERRAL">Referral</option>
          <option value="JOB_BOARD">Job Board</option>
          <option value="DIRECT">Direct</option>
          <option value="OTHER">Other</option>
        </StyledSelect>

        <StyledSelect
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="SCREENED">Screened</option>
          <option value="INTERVIEWING">Interviewing</option>
          <option value="OFFERED">Offered</option>
          <option value="HIRED">Hired</option>
          <option value="REJECTED">Rejected</option>
          <option value="WITHDRAWN">Withdrawn</option>
        </StyledSelect>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume (PDF or Word)
          </label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">
            Maximum file size: 5MB. Accepted formats: PDF, DOC, DOCX
          </p>
        </div>

        <div className="md:col-span-2">
          <StyledTextarea
            label="Notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save Candidate"}
        </button>
      </div>
    </form>
  );
}
