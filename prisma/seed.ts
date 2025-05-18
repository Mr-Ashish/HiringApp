import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create a sample admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create a sample client
  const client = await prisma.client.create({
    data: {
      name: "TechCorp Inc.",
      industry: "Technology",
      contactPerson: "John Smith",
      contactEmail: "john@techcorp.example.com",
      contactPhone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      website: "https://techcorp.example.com",
      status: "ACTIVE",
    },
  });

  // Create a sample mandate
  const mandate = await prisma.mandate.create({
    data: {
      title: "Senior Software Engineer",
      clientId: client.id,
      recruiterId: admin.id,
      priority: "HIGH",
      status: "OPEN",
      reportingLines: "Reports to CTO",
      location: "San Francisco, CA (Hybrid)",
      employmentType: "FULL_TIME",
      jobDescription:
        "We are looking for a Senior Software Engineer to join our growing team...",
      keyCompetencies: "React, Node.js, TypeScript, AWS",
      salaryMin: 150000,
      salaryMax: 200000,
      targetSourcingSLA: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      targetOfferDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
      targetCloseDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      idealProfile: "10+ years of experience in full-stack development...",
      targetIndustries: "Technology, SaaS, FinTech",
      experienceMin: 8,
      experienceMax: 15,
      education: "Bachelor's degree in Computer Science or related field",
      softSkills: "Leadership, Communication, Problem Solving",
      sourcingChannels: "LinkedIn, GitHub, Tech Conferences",
      targetCompanies: "Google, Amazon, Microsoft, Meta",
      keywords: "Senior Engineer, Full Stack, React, Node.js",
      clientEngagementScore: 8,
      roleComplexityScore: 7,
      brandNotes: "Strong employer brand in the tech industry",
      pricingThresholdMet: true,
      internalDecision: "APPROVED",
      decisionJustification:
        "High-value client with clear requirements and good budget",
    },
  });

  // Create demo candidates
  await prisma.candidate.createMany({
    data: [
      {
        fullName: "Alice Johnson",
        email: "alice.johnson@example.com",
        phone: "+1 (555) 234-5678",
        linkedinUrl: "https://linkedin.com/in/alicejohnson",
        currentRole: "Engineering Manager",
        currentCompany: "TechCorp Inc.",
        location: "San Francisco, CA",
        keySkills: ["React", "Node.js", "Leadership"],
        yearsOfExperience: 10,
        resumeUrl: null,
        source: "Referral",
        status: "NEW",
        notes: "Strong technical leader, referred by John Smith.",
      },
      {
        fullName: "Bob Lee",
        email: "bob.lee@example.com",
        phone: "+1 (555) 345-6789",
        linkedinUrl: "https://linkedin.com/in/boblee",
        currentRole: "Senior Backend Engineer",
        currentCompany: "FinTech Solutions",
        location: "New York, NY",
        keySkills: ["Node.js", "TypeScript", "AWS"],
        yearsOfExperience: 8,
        resumeUrl: null,
        source: "LinkedIn",
        status: "SCREENED",
        notes: "Has experience with high-scale systems.",
      },
      {
        fullName: "Carol Smith",
        email: "carol.smith@example.com",
        phone: "+1 (555) 456-7890",
        linkedinUrl: "https://linkedin.com/in/carolsmith",
        currentRole: "Product Manager",
        currentCompany: "SaaSify",
        location: "Remote",
        keySkills: ["Product Management", "Agile", "Communication"],
        yearsOfExperience: 7,
        resumeUrl: null,
        source: "Job Board",
        status: "INTERVIEWING",
        notes: "Strong communicator, remote work experience.",
      },
      {
        fullName: "David Kim",
        email: "david.kim@example.com",
        phone: "+1 (555) 567-8901",
        linkedinUrl: "https://linkedin.com/in/davidkim",
        currentRole: "Frontend Developer",
        currentCompany: "WebWorks",
        location: "Austin, TX",
        keySkills: ["React", "TypeScript", "UI/UX"],
        yearsOfExperience: 5,
        resumeUrl: null,
        source: "Recruiter Outreach",
        status: "OFFERED",
        notes: "Excellent UI skills, offer extended.",
      },
      {
        fullName: "Eva Brown",
        email: "eva.brown@example.com",
        phone: "+1 (555) 678-9012",
        linkedinUrl: "https://linkedin.com/in/evabrown",
        currentRole: "DevOps Engineer",
        currentCompany: "CloudOps",
        location: "Seattle, WA",
        keySkills: ["AWS", "Docker", "CI/CD"],
        yearsOfExperience: 6,
        resumeUrl: null,
        source: "Referral",
        status: "HIRED",
        notes: "Accepted offer, joining next month.",
      },
    ],
  });

  console.log({ admin, client, mandate });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
