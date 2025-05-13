"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import StyledInput, {
  StyledSelect,
  StyledTextarea,
} from "@/components/StyledInput";

const TABS = [
  "Requirements",
  "Role Context",
  "Compensation",
  "Timeline",
  "Candidate Persona",
  "Sourcing",
  "Qualification",
];

export default function NewMandatePage() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/mandates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create mandate");
      router.push("/mandates");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="New Mandate">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">New Mandate</h1>
        <div className="w-full max-w-full overflow-x-auto mb-8">
          <div className="flex flex-nowrap space-x-2">
            {TABS.map((t, i) => (
              <button
                key={t}
                className={`px-4 py-2 rounded-t font-semibold text-sm focus:outline-none transition-colors ${
                  tab === i
                    ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-600"
                    : "bg-gray-50 text-gray-500 hover:bg-indigo-50"
                }`}
                onClick={() => setTab(i)}
                type="button"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {/* Tab 0: Requirements */}
          {tab === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <StyledInput name="title" required onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client ID *
                </label>
                <StyledInput name="clientId" required onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Recruiter ID *
                </label>
                <StyledInput
                  name="recruiterId"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <StyledSelect name="priority" onChange={handleChange}>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="LOW">Low</option>
                </StyledSelect>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <StyledSelect name="status" onChange={handleChange}>
                  <option value="NEW">New</option>
                  <option value="OPEN">Open</option>
                  <option value="SOURCING">Sourcing</option>
                  <option value="INTERVIEWING">Interviewing</option>
                  <option value="OFFER">Offer</option>
                  <option value="FILLED">Filled</option>
                  <option value="ON_HOLD">On Hold</option>
                  <option value="CLOSED">Closed</option>
                </StyledSelect>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date Opened
                </label>
                <StyledInput
                  type="date"
                  name="dateOpened"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {/* Tab 1: Role Context */}
          {tab === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reporting Lines
                </label>
                <StyledInput name="reportingLines" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <StyledInput name="location" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employment Type
                </label>
                <StyledSelect name="employmentType" onChange={handleChange}>
                  <option value="FULL_TIME">Full Time</option>
                  <option value="CONTRACT">Contract</option>
                </StyledSelect>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Description
                </label>
                <StyledTextarea
                  name="jobDescription"
                  rows={3}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {/* Tab 2: Compensation */}
          {tab === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary Min
                </label>
                <StyledInput
                  type="number"
                  name="salaryMin"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary Max
                </label>
                <StyledInput
                  type="number"
                  name="salaryMax"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bonus Structure
                </label>
                <StyledInput name="bonusStructure" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Equity Details
                </label>
                <StyledInput name="equityDetails" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Benefits
                </label>
                <StyledInput name="benefits" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fee Percentage
                </label>
                <StyledInput
                  type="number"
                  name="feePercentage"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {/* Tab 3: Timeline */}
          {tab === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Sourcing SLA
                </label>
                <StyledInput
                  type="date"
                  name="targetSourcingSLA"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Offer Date
                </label>
                <StyledInput
                  type="date"
                  name="targetOfferDate"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Close Date
                </label>
                <StyledInput
                  type="date"
                  name="targetCloseDate"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Key Milestones
                </label>
                <StyledTextarea
                  name="keyMilestones"
                  rows={2}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {/* Tab 4: Candidate Persona */}
          {tab === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ideal Profile
                </label>
                <StyledTextarea
                  name="idealProfile"
                  rows={2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Industries
                </label>
                <StyledInput name="targetIndustries" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience Min
                </label>
                <StyledInput
                  type="number"
                  name="experienceMin"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Experience Max
                </label>
                <StyledInput
                  type="number"
                  name="experienceMax"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Education
                </label>
                <StyledInput name="education" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Soft Skills
                </label>
                <StyledInput name="softSkills" onChange={handleChange} />
              </div>
            </div>
          )}
          {/* Tab 5: Sourcing */}
          {tab === 5 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sourcing Channels
                </label>
                <StyledInput name="sourcingChannels" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Target Companies
                </label>
                <StyledInput name="targetCompanies" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Keywords
                </label>
                <StyledInput name="keywords" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Do Not Approach
                </label>
                <StyledInput name="doNotApproach" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sourcing Notes
                </label>
                <StyledTextarea
                  name="sourcingNotes"
                  rows={2}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {/* Tab 6: Qualification */}
          {tab === 6 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Client Engagement Score
                </label>
                <StyledInput
                  type="number"
                  name="clientEngagementScore"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role Complexity Score
                </label>
                <StyledInput
                  type="number"
                  name="roleComplexityScore"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Brand Notes
                </label>
                <StyledInput name="brandNotes" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pricing Threshold Met
                </label>
                <StyledSelect
                  name="pricingThresholdMet"
                  onChange={handleChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </StyledSelect>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Internal Decision
                </label>
                <StyledInput name="internalDecision" onChange={handleChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Decision Justification
                </label>
                <StyledTextarea
                  name="decisionJustification"
                  rows={2}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
              onClick={() => setTab((t) => Math.max(0, t - 1))}
              disabled={tab === 0}
            >
              Previous
            </button>
            {tab < TABS.length - 1 ? (
              <button
                type="button"
                className="px-4 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
                onClick={() => setTab((t) => Math.min(TABS.length - 1, t + 1))}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Mandate"}
              </button>
            )}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
