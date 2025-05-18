"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/DashboardLayout";
import StyledInput from "@/components/StyledInput";
import FormPageHeader from "@/components/layouts/FormPageHeader";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    location: "",
    website: "",
    contactPerson: "",
    contactEmail: "",
    contactPhone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate website URL
    let website = formData.website;
    if (
      website &&
      !website.startsWith("http://") &&
      !website.startsWith("https://")
    ) {
      website = `https://${website}`;
    }

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, website }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to create client");
      }

      router.push("/clients");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Add New Client">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <FormPageHeader title="Add New Client" />
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <StyledInput
            label="Company Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <StyledInput
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          />

          <StyledInput
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <StyledInput
            label="Website"
            name="website"
            type="text"
            value={formData.website}
            onChange={handleChange}
            placeholder="example.com"
            required
          />

          <StyledInput
            label="Contact Person"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
          />

          <StyledInput
            label="Contact Email"
            name="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={handleChange}
          />

          <StyledInput
            label="Contact Phone"
            name="contactPhone"
            type="tel"
            value={formData.contactPhone}
            onChange={handleChange}
          />

          <div className="flex justify-end space-x-4">
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
              {loading ? "Creating..." : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
