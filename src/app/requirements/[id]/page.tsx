import { notFound } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";

async function getRequirement(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/requirements/${id}`
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function RequirementDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const requirement = await getRequirement(params.id);
  if (!requirement) return notFound();

  return (
    <DashboardLayout title="Requirement Details">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold mb-4">{requirement.title}</h1>
        <div className="mb-2">
          <span className="font-semibold">Client:</span>{" "}
          {requirement.client?.name}{" "}
          <span className="font-semibold ml-4">Recruiter:</span>{" "}
          {requirement.recruiter?.name}
        </div>
        {/* Requirement & Client Details */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Requirement & Client Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Priority:</span>{" "}
              {requirement.priority}
            </div>
            <div>
              <span className="font-medium">Status:</span> {requirement.status}
            </div>
            <div>
              <span className="font-medium">Date Opened:</span>{" "}
              {requirement.dateOpened
                ? new Date(requirement.dateOpened).toLocaleDateString()
                : "-"}
            </div>
          </div>
        </section>
        {/* Role Context & Specifications */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Role Context & Specifications
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Reporting Lines:</span>{" "}
              {requirement.reportingLines}
            </div>
            <div>
              <span className="font-medium">Location:</span>{" "}
              {requirement.location}
            </div>
            <div>
              <span className="font-medium">Employment Type:</span>{" "}
              {requirement.employmentType}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Job Description:</span>
              <div className="whitespace-pre-line text-gray-700 mt-1">
                {requirement.jobDescription}
              </div>
            </div>
          </div>
        </section>
        {/* Compensation & Commercials */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">
            Compensation & Commercials
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Salary Range:</span>{" "}
              {requirement.salaryMin} - {requirement.salaryMax}
            </div>
            <div>
              <span className="font-medium">Bonus Structure:</span>{" "}
              {requirement.bonusStructure}
            </div>
            <div>
              <span className="font-medium">Equity Details:</span>{" "}
              {requirement.equityDetails}
            </div>
            <div>
              <span className="font-medium">Benefits:</span>{" "}
              {requirement.benefits}
            </div>
            <div>
              <span className="font-medium">Fee Percentage:</span>{" "}
              {requirement.feePercentage}
            </div>
          </div>
        </section>
        {/* Timeline & Process */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Timeline & Process</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Target Sourcing SLA:</span>{" "}
              {requirement.targetSourcingSLA
                ? new Date(requirement.targetSourcingSLA).toLocaleDateString()
                : "-"}
            </div>
            <div>
              <span className="font-medium">Target Offer Date:</span>{" "}
              {requirement.targetOfferDate
                ? new Date(requirement.targetOfferDate).toLocaleDateString()
                : "-"}
            </div>
            <div>
              <span className="font-medium">Target Close Date:</span>{" "}
              {requirement.targetCloseDate
                ? new Date(requirement.targetCloseDate).toLocaleDateString()
                : "-"}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Key Milestones:</span>{" "}
              {requirement.keyMilestones}
            </div>
          </div>
        </section>
        {/* Candidate Persona */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Candidate Persona</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Ideal Profile:</span>{" "}
              {requirement.idealProfile}
            </div>
            <div>
              <span className="font-medium">Target Industries:</span>{" "}
              {requirement.targetIndustries}
            </div>
            <div>
              <span className="font-medium">Experience:</span>{" "}
              {requirement.experienceMin} - {requirement.experienceMax}
            </div>
            <div>
              <span className="font-medium">Education:</span>{" "}
              {requirement.education}
            </div>
            <div>
              <span className="font-medium">Soft Skills:</span>{" "}
              {requirement.softSkills}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Persona Notes:</span>{" "}
              {requirement.personaNotes}
            </div>
          </div>
        </section>
        {/* Sourcing Strategy */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Sourcing Strategy</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Sourcing Channels:</span>{" "}
              {requirement.sourcingChannels}
            </div>
            <div>
              <span className="font-medium">Target Companies:</span>{" "}
              {requirement.targetCompanies}
            </div>
            <div>
              <span className="font-medium">Keywords:</span>{" "}
              {requirement.keywords}
            </div>
            <div>
              <span className="font-medium">Do Not Approach:</span>{" "}
              {requirement.doNotApproach}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Sourcing Notes:</span>{" "}
              {requirement.sourcingNotes}
            </div>
          </div>
        </section>
        {/* Qualification */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Qualification</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Client Engagement Score:</span>{" "}
              {requirement.clientEngagementScore}
            </div>
            <div>
              <span className="font-medium">Role Complexity Score:</span>{" "}
              {requirement.roleComplexityScore}
            </div>
            <div>
              <span className="font-medium">Brand Notes:</span>{" "}
              {requirement.brandNotes}
            </div>
            <div>
              <span className="font-medium">Pricing Threshold Met:</span>{" "}
              {requirement.pricingThresholdMet ? "Yes" : "No"}
            </div>
            <div>
              <span className="font-medium">Internal Decision:</span>{" "}
              {requirement.internalDecision}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Decision Justification:</span>{" "}
              {requirement.decisionJustification}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
