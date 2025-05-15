import CandidateForm from "@/components/forms/CandidateForm";

export default function NewCandidatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Add New Candidate</h1>
        <CandidateForm />
      </div>
    </div>
  );
}
