-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'RECRUITER');

-- CreateEnum
CREATE TYPE "ClientStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('NEW', 'CONTACTED', 'SCREENED', 'INTERVIEWING', 'OFFERED', 'HIRED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "CandidateMandateStatus" AS ENUM ('NEW', 'SHORTLISTED', 'INTERVIEWING', 'OFFERED', 'HIRED', 'REJECTED', 'WITHDRAWN');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "MandateStatus" AS ENUM ('NEW', 'OPEN', 'SOURCING', 'INTERVIEWING', 'OFFER', 'FILLED', 'ON_HOLD', 'CLOSED');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('FULL_TIME', 'CONTRACT');

-- CreateEnum
CREATE TYPE "InternalDecision" AS ENUM ('PRIORITIZE', 'DEPRIORITIZE', 'REJECT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'RECRUITER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "contactPerson" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "industry" TEXT,
    "status" "ClientStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "linkedinUrl" TEXT,
    "currentRole" TEXT,
    "currentCompany" TEXT,
    "location" TEXT,
    "keySkills" TEXT[],
    "yearsOfExperience" INTEGER,
    "resumeUrl" TEXT,
    "source" TEXT,
    "status" "CandidateStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidatesOnMandates" (
    "candidateId" TEXT NOT NULL,
    "mandateId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "CandidateMandateStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,

    CONSTRAINT "CandidatesOnMandates_pkey" PRIMARY KEY ("candidateId","mandateId")
);

-- CreateTable
CREATE TABLE "Mandate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "recruiterId" TEXT NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'MEDIUM',
    "status" "MandateStatus" NOT NULL DEFAULT 'NEW',
    "dateOpened" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportingLines" TEXT,
    "location" TEXT,
    "employmentType" "EmploymentType",
    "jobDescription" TEXT,
    "keyCompetencies" TEXT,
    "jobsToBeDone" TEXT,
    "orgCulture" TEXT,
    "performanceExpectations" TEXT,
    "salaryMin" DOUBLE PRECISION,
    "salaryMax" DOUBLE PRECISION,
    "bonusStructure" TEXT,
    "equityDetails" TEXT,
    "benefits" TEXT,
    "clientAgreement" TEXT,
    "feePercentage" DOUBLE PRECISION,
    "targetSourcingSLA" TIMESTAMP(3),
    "targetOfferDate" TIMESTAMP(3),
    "targetCloseDate" TIMESTAMP(3),
    "keyMilestones" TEXT,
    "idealProfile" TEXT,
    "targetIndustries" TEXT,
    "experienceMin" INTEGER,
    "experienceMax" INTEGER,
    "education" TEXT,
    "softSkills" TEXT,
    "personaNotes" TEXT,
    "sourcingChannels" TEXT,
    "targetCompanies" TEXT,
    "keywords" TEXT,
    "doNotApproach" TEXT,
    "sourcingNotes" TEXT,
    "clientEngagementScore" INTEGER,
    "roleComplexityScore" INTEGER,
    "brandNotes" TEXT,
    "pricingThresholdMet" BOOLEAN,
    "internalDecision" "InternalDecision",
    "decisionJustification" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mandate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");

-- AddForeignKey
ALTER TABLE "CandidatesOnMandates" ADD CONSTRAINT "CandidatesOnMandates_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidatesOnMandates" ADD CONSTRAINT "CandidatesOnMandates_mandateId_fkey" FOREIGN KEY ("mandateId") REFERENCES "Mandate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mandate" ADD CONSTRAINT "Mandate_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mandate" ADD CONSTRAINT "Mandate_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
