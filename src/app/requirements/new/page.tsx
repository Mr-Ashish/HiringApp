"use client";
import { useState, useEffect } from "react";
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

export default function NewRequirementPage() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<any[]>([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsError, setClientsError] = useState<string | null>(null);
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
      const res = await fetch("/api/requirements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to create requirement");
      router.push("/requirements");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchClients() {
      setClientsLoading(true);
      setClientsError(null);
      try {
        const res = await fetch("/api/clients");
        if (!res.ok) throw new Error("Failed to fetch clients");
        const data = await res.json();
        setClients(data);
      } catch (err) {
        setClientsError(
          err instanceof Error ? err.message : "Failed to load clients"
        );
      } finally {
        setClientsLoading(false);
      }
    }
    fetchClients();
  }, []);

  return (
    <DashboardLayout title="New Requirement">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="mb-6">
          <div className="flex space-x-4 border-b">
            {TABS.map((tabName, index) => (
              <button
                key={tabName}
                onClick={() => setTab(index)}
                className={`px-4 py-2 font-medium text-sm ${
                  tab === index
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tabName}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Requirements Tab */}
          {tab === 0 && (
            <div className="space-y-4">
              <StyledInput
                label="Title"
                name="title"
                value={form.title || ""}
                onChange={handleChange}
                required
              />
              <StyledSelect
                label="Client"
                name="clientId"
                value={form.clientId || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Client</option>
                {clientsLoading && <option disabled>Loading clients...</option>}
                {clientsError && <option disabled>{clientsError}</option>}
                {!clientsLoading &&
                  !clientsError &&
                  clients.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
              </StyledSelect>
              <StyledSelect
                label="Priority"
                name="priority"
                value={form.priority || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Priority</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </StyledSelect>
              <StyledSelect
                label="Status"
                name="status"
                value={form.status || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="CLOSED">Closed</option>
              </StyledSelect>
              <StyledInput
                label="Date Opened"
                name="dateOpened"
                type="date"
                value={form.dateOpened || ""}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Role Context Tab */}
          {tab === 1 && (
            <div className="space-y-4">
              <StyledInput
                label="Reporting Lines"
                name="reportingLines"
                value={form.reportingLines || ""}
                onChange={handleChange}
                required
              />
              <StyledInput
                label="Location"
                name="location"
                value={form.location || ""}
                onChange={handleChange}
                required
              />
              <StyledSelect
                label="Employment Type"
                name="employmentType"
                value={form.employmentType || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="PART_TIME">Part Time</option>
                <option value="CONTRACT">Contract</option>
              </StyledSelect>
              <StyledTextarea
                label="Job Description"
                name="jobDescription"
                value={form.jobDescription || ""}
                onChange={handleChange}
                rows={6}
                required
              />
            </div>
          )}

          {/* Compensation Tab */}
          {tab === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <StyledInput
                  label="Minimum Salary"
                  name="salaryMin"
                  type="number"
                  value={form.salaryMin || ""}
                  onChange={handleChange}
                  required
                />
                <StyledInput
                  label="Maximum Salary"
                  name="salaryMax"
                  type="number"
                  value={form.salaryMax || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <StyledInput
                label="Bonus Structure"
                name="bonusStructure"
                value={form.bonusStructure || ""}
                onChange={handleChange}
              />
              <StyledInput
                label="Equity Details"
                name="equityDetails"
                value={form.equityDetails || ""}
                onChange={handleChange}
              />
              <StyledTextarea
                label="Benefits"
                name="benefits"
                value={form.benefits || ""}
                onChange={handleChange}
                rows={4}
              />
              <StyledInput
                label="Fee Percentage"
                name="feePercentage"
                type="number"
                value={form.feePercentage || ""}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Timeline Tab */}
          {tab === 3 && (
            <div className="space-y-4">
              <StyledInput
                label="Target Sourcing SLA"
                name="targetSourcingSLA"
                type="date"
                value={form.targetSourcingSLA || ""}
                onChange={handleChange}
                required
              />
              <StyledInput
                label="Target Offer Date"
                name="targetOfferDate"
                type="date"
                value={form.targetOfferDate || ""}
                onChange={handleChange}
                required
              />
              <StyledInput
                label="Target Close Date"
                name="targetCloseDate"
                type="date"
                value={form.targetCloseDate || ""}
                onChange={handleChange}
                required
              />
              <StyledTextarea
                label="Key Milestones"
                name="keyMilestones"
                value={form.keyMilestones || ""}
                onChange={handleChange}
                rows={4}
              />
            </div>
          )}

          {/* Candidate Persona Tab */}
          {tab === 4 && (
            <div className="space-y-4">
              <StyledTextarea
                label="Ideal Profile"
                name="idealProfile"
                value={form.idealProfile || ""}
                onChange={handleChange}
                rows={4}
                required
              />
              <StyledInput
                label="Target Industries"
                name="targetIndustries"
                value={form.targetIndustries || ""}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <StyledInput
                  label="Minimum Experience (years)"
                  name="experienceMin"
                  type="number"
                  value={form.experienceMin || ""}
                  onChange={handleChange}
                  required
                />
                <StyledInput
                  label="Maximum Experience (years)"
                  name="experienceMax"
                  type="number"
                  value={form.experienceMax || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <StyledInput
                label="Education"
                name="education"
                value={form.education || ""}
                onChange={handleChange}
              />
              <StyledTextarea
                label="Soft Skills"
                name="softSkills"
                value={form.softSkills || ""}
                onChange={handleChange}
                rows={4}
              />
              <StyledTextarea
                label="Persona Notes"
                name="personaNotes"
                value={form.personaNotes || ""}
                onChange={handleChange}
                rows={4}
              />
            </div>
          )}

          {/* Sourcing Tab */}
          {tab === 5 && (
            <div className="space-y-4">
              <StyledInput
                label="Sourcing Channels"
                name="sourcingChannels"
                value={form.sourcingChannels || ""}
                onChange={handleChange}
              />
              <StyledTextarea
                label="Target Companies"
                name="targetCompanies"
                value={form.targetCompanies || ""}
                onChange={handleChange}
                rows={4}
              />
              <StyledInput
                label="Keywords"
                name="keywords"
                value={form.keywords || ""}
                onChange={handleChange}
              />
              <StyledTextarea
                label="Do Not Approach"
                name="doNotApproach"
                value={form.doNotApproach || ""}
                onChange={handleChange}
                rows={4}
              />
              <StyledTextarea
                label="Sourcing Notes"
                name="sourcingNotes"
                value={form.sourcingNotes || ""}
                onChange={handleChange}
                rows={4}
              />
            </div>
          )}

          {/* Qualification Tab */}
          {tab === 6 && (
            <div className="space-y-4">
              <StyledInput
                label="Client Engagement Score"
                name="clientEngagementScore"
                type="number"
                min="1"
                max="10"
                value={form.clientEngagementScore || ""}
                onChange={handleChange}
                required
              />
              <StyledInput
                label="Role Complexity Score"
                name="roleComplexityScore"
                type="number"
                min="1"
                max="10"
                value={form.roleComplexityScore || ""}
                onChange={handleChange}
                required
              />
              <StyledTextarea
                label="Brand Notes"
                name="brandNotes"
                value={form.brandNotes || ""}
                onChange={handleChange}
                rows={4}
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pricingThresholdMet"
                  name="pricingThresholdMet"
                  checked={form.pricingThresholdMet || false}
                  onChange={(e) =>
                    setForm({ ...form, pricingThresholdMet: e.target.checked })
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="pricingThresholdMet"
                  className="text-sm font-medium text-gray-700"
                >
                  Pricing Threshold Met
                </label>
              </div>
              <StyledSelect
                label="Internal Decision"
                name="internalDecision"
                value={form.internalDecision || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Decision</option>
                <option value="APPROVED">Approved</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
              </StyledSelect>
              <StyledTextarea
                label="Decision Justification"
                name="decisionJustification"
                value={form.decisionJustification || ""}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>
          )}

          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Requirement"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
