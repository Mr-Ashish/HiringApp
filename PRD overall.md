# Product Requirements Document: LeaderHireAI Platform

**Version:** 1.2
**Date:** May 10, 2025
**Author:** Gemini AI

## 1. Introduction

This document outlines the product requirements for LeaderHireAI, a comprehensive platform designed to streamline the leadership hiring process. It integrates insights from initial process design documents and aims to provide a clear, phase-wise development plan. The platform will support end-to-end candidate management, interactive dashboards, revenue tracking, and AI-powered copilot features. This version reflects an initial setup phase using development tools like Cursor AI and further refines Phase 1 based on detailed requirement gathering form structures.

## 2. Goals and Objectives

- **Primary Goal:** To develop a robust, user-friendly platform that enhances efficiency, improves data management, and provides actionable insights for the leadership hiring lifecycle.
- **Key Objectives:**
  - Digitize and automate key steps of the leadership hiring process.
  - Provide a centralized system for managing job requisitions, candidate data, and client information.
  - Enable effective tracking of progress against Service Level Agreements (SLAs).
  - Offer powerful dashboarding and reporting capabilities for recruiters and leadership.
  - Incorporate AI-driven features to assist recruiters in sourcing and candidate matching.
  - Ensure the platform is maintainable, scalable, and testable.

## 3. Target Users

- **Recruiters:** Primary users responsible for managing the end-to-end hiring process.
- **Hiring Managers/Clients:** Users who initiate hiring requests and participate in the selection process.
- **Leadership/Management:** Users who require oversight of hiring activities, performance metrics, and revenue forecasts.

## 4. Overall Architecture Considerations

- **Frontend:** A modern frontend framework (e.g., React) for a responsive and interactive user interface.
- **Backend:** Robust API services (e.g., Node.js/Express, Python/Django/FastAPI, or other suitable backend technology).
- **Database:** Relational database (e.g., PostgreSQL, MySQL, or similar) for structured data storage.
- **Integrations:** APIs for LinkedIn, other job boards, and potentially internal HR systems.
- **Development Environment:** Utilizing tools such as Cursor AI for development, with standard version control (e.g., Git).

## 5. Phase-Wise Feature Breakdown and Task Distribution

This section details the features and tasks distributed across various phases.

---

### Phase 1: Initial Setup & Core Requirement Management

**(Corresponds to PRD Stage 1: PoC & Requirement Gathering and parts of Leadership Hiring Process: A. Qualification & B. Requirement Capture)**

**Objective:** Complete the initial project setup, establish the foundational architecture, and develop the core system for capturing, defining, and managing job requirements, aligning closely with a structured, multi-tab requirement gathering form.

**Key Features & Modules (Requirement Gathering Focus):**

1.  **User Authentication & Authorization:**
    - Secure login for different user roles (Recruiter, Admin, Read-only).
    - Role-based access control to features and data.
2.  **Client Management (Basic):**
    - **Form: Add/Edit Client**
      - Client Name
      - Contact Person
      - Contact Email/Phone
      - Industry
      - Status (Active/Inactive)
    - List view of clients.
3.  **Mandate/Requisition Management (Core of Requirement Definition, structured to mirror tab-based input):**

    - **Form: Create/Edit Mandate (Detailed Requirement Capture)**

      - **Tab/Section 1: Mandate & Client Details**

        - Mandate Title / Role Title (Text Input)
        - Associated Client (Dropdown - from Client Management)
        - Recruiter Assigned (Dropdown - from User list)
        - Mandate Priority (Dropdown: High, Medium, Low)
        - Mandate Status (Dropdown: New, Open, Sourcing, Interviewing, Offer, Filled, On Hold, Closed - auto-set to 'New' initially)
        - Date Opened (Date Picker - auto-filled)

      - **Tab/Section 2: Role Context & Specifications**

        - Reporting Lines (Text Input)
        - Location (Text Input / Multi-select for remote options)
        - Employment Type (Dropdown: Full-time, Contract)
        - Detailed Job Description (Rich Text Editor)
        - Key Competencies/Skills (Tag Input / Text Area)
        - "Jobs To Be Done" (JTBD) (Text Area)
        - Organizational Culture Notes (Text Area)
        - Performance Expectations (Text Area)

      - **Tab/Section 3: Compensation & Commercials**

        - Salary Range (Min/Max Number Inputs, Currency)
        - Bonus Structure (Text Area, optional)
        - Equity/Stock Options (Text Area, optional)
        - Other Benefits (Text Area, optional)
        - Client Agreement Details (Reference to Client record or specific terms for this mandate - Text Area)
        - Fee Percentage (Number Input, linked to client or overridden)

      - **Tab/Section 4: Timeline & Process**

        - Target Sourcing SLA (e.g., 3 weeks - Date Picker or calculated from Date Opened)
        - Target Offer Date (Date Picker)
        - Target Close Date / Candidate Start Date (Date Picker)
        - Key Milestones/Process Notes (Text Area - e.g., specific interview stages agreed with client)

      - **Tab/Section 5: Candidate Persona**

        - Ideal Candidate Profile Summary (Text Area)
        - Target Industries/Companies (Text Area / Tag Input)
        - Years of Experience (Min/Max Number Input)
        - Educational Requirements (Text Area)
        - Key Personality Traits/Soft Skills (Text Area / Tag Input)
        - System-suggested questions based on role type (e.g., for CFO: operator vs. investor-facing) - _Future AI enhancement, for now, a checklist or notes field._
        - Key Persona Archetype Notes (Text Area)

      - **Tab/Section 6: Sourcing Strategy (Initial)**

        - Primary Sourcing Channels (Multi-select: LinkedIn, Referrals, Internal Database, Job Boards, etc.)
        - Target Companies List (Text Area)
        - Keywords for Searching (Text Area / Tag Input)
        - "Do Not Approach" List (Text Area, optional)
        - Initial Sourcing Notes/Strategy (Text Area)

      - **Tab/Section 7: Qualification (Internal Assessment)**

        - Client Engagement Score (e.g., 1-5, based on responsiveness)
        - Role Complexity Score (e.g., 1-5, based on Seniority, Skill Rarity)
        - Client Brand & Reputation Notes (Text Area)
        - Pricing Threshold Met (Checkbox, e.g., based on Fee Percentage in Commercials section)
        - Internal Decision (Dropdown: Prioritize, Deprioritize, Reject)
        - Justification for Internal Decision (Text Area)

      - **Tab/Section 8: Attachments**
        - Upload Job Description Document (File Upload)
        - Upload Client Agreement (File Upload, if specific to mandate)
        - Other Relevant Documents (File Upload)

    - **Functionality:**
      - Save mandate data to database, linked to client.
      - View, filter (by client, status, recruiter), and search mandates.
      - Audit trail for changes to mandate records.
      - File uploads for mandate-related documents.

4.  **Basic Requirement Dashboard (Initial View):**
    - View, filter, and search requirements/mandates.
    - Basic analytics: Counts by role, status, client.

**Tasks for Phase 1:**

- **Initial Project Setup:**
  - Establish version control (e.g., Git repository setup).
  - Configure development environment (IDE setup like Cursor AI, linters, code formatters).
  - Define project structure for frontend and backend.
  - Initialize dependency management (e.g., npm/yarn for frontend, pip/poetry for backend).
  - Setup development, staging, and (plan for) production environments.
- **Backend Development:**
  - Design database schema for Users, Clients, Mandates (with all new fields), Attachments.
  - Develop APIs for CRUD operations on Users, Clients, Mandates.
  - Implement authentication and authorization logic.
  - Implement file upload and storage mechanism.
- **Frontend Development:**
  - Develop login/registration UI.
  - Develop Client Management forms and list view.
  - Develop Mandate/Requisition creation and editing forms, potentially using a tabbed interface or sequential sections to mirror the "Requirement Gathering Form" structure (Mandate & Client, Role Context, Compensation & Commercials, Timeline, Candidate Persona, Sourcing Strategy, Qualification).
  - Develop Mandate list view with filtering and search.
  - Develop basic Requirement Dashboard UI.
- **General & Process:**
  - Finalize detailed data models based on the structured requirement gathering form.
  - Implement basic form validation (required fields, data types) for all mandate fields.
  - Write unit tests for backend APIs and frontend components.
  - Initial documentation for APIs, codebase structure, and setup procedures.

---

### Phase 2: Sourcing & Candidate Management

**(Corresponds to Leadership Hiring Process: C. Sourcing & Screening and parts of PRD Stage 4: Recruiter Copilot - basic search)**

**Objective:** Enable efficient sourcing, resume management, and initial candidate screening, building upon the detailed requirements and sourcing strategy defined in Phase 1.

**Key Features & Modules:**

1.  **Candidate Database:**
    - **Form: Add/Edit Candidate**
      - Full Name (Text Input)
      - Email (Email Input)
      - Phone Number (Phone Input)
      - LinkedIn Profile URL (URL Input)
      - Current Role/Company (Text Input)
      - Location (Text Input)
      - Key Skills (Tag Input - can be pre-populated/suggested from Mandate skills)
      - Years of Experience (Number Input)
      - Resume/CV (File Upload - PDF, DOCX)
      - Source (Dropdown: LinkedIn, Referral, Database, Job Board, etc. - align with Sourcing Strategy from Mandate)
      - Candidate Status (Dropdown: New, Contacted, Screened, Qualified, Rejected)
      - Notes/Screening Comments (Text Area)
      - Link Candidate to Mandate(s) (Multi-select from open Mandates)
    - **Functionality:**
      - Store and tag resumes for future use.
      - Parse basic information from resumes (Name, Email, Phone) - _Advanced feature, initial can be manual entry._
      - Search and filter candidates (by skills, experience, status, etc.).
      - View candidate profiles.
2.  **Sourcing Tracking (within Mandate View):**
    - Track progress against sourcing timeline (e.g., 3-week, 6-week, 9-week milestones defined in Mandate's Timeline section).
    - Field to log number of qualified profiles delivered by a certain date.
    - Visual indicator for SLA progress (e.g., color coding on mandate list).
    - "Notes/More Notes" fields for recruiter updates on sourcing progress (per mandate).
3.  **Basic AI Copilot - Candidate Search Enhancement (PRD Stage 4 - initial):**
    - Semantic search within internal candidate database based on mandate criteria (skills, experience, persona from Phase 1).
    - Suggest potentially matching candidates from the database for a new mandate.

**Tasks for Phase 2:**

- **Backend:**
  - Design database schema for Candidates, CandidateSkills, CandidateApplications (linking to Mandates).
  - Develop APIs for CRUD operations on Candidates.
  - Implement resume parsing (basic, if feasible, or plan for future).
  - Develop search algorithms for candidate database.
  - API endpoints for linking candidates to mandates.
- **Frontend:**
  - Develop Candidate Add/Edit forms.
  - Develop Candidate list view with advanced search and filtering.
  - Develop Candidate profile view.
  - Integrate sourcing tracking fields and visuals into Mandate detail view, referencing timeline data from Phase 1.
  - UI for AI-assisted candidate search results.
- **General:**
  - Integrate candidate data with mandate views.
  - Testing for search functionality and data integrity.

---

### Phase 3: Interview, Assessment & Offer Management

**(Corresponds to Leadership Hiring Process: D. Interview & Assessment and E. Offer & Onboarding - initial parts)**

**Objective:** Streamline the interview scheduling, feedback collection, and offer management process.

**Key Features & Modules:**

1.  **Interview Management:**
    - **Form: Schedule/Log Interview**
      - Associated Mandate (Read-only, from context)
      - Associated Candidate (Read-only, from context)
      - Interview Stage (Dropdown: 1st Round, 2nd Round, Final, Client Interview - can be pre-defined by Mandate's Process Notes)
      - Interviewers (Multi-select from Users/Contacts)
      - Date & Time (Date/Time Picker)
      - Mode (Dropdown: Virtual, On-site)
      - Meeting Link (URL Input, if virtual)
      - Status (Dropdown: Scheduled, Completed, Cancelled, Rescheduled)
    - **Form: Log Interview Feedback**
      - Interviewer (Read-only)
      - Overall Rating (e.g., 1-5 stars, or Strong Hire, Hire, No Hire)
      - Feedback Notes (Rich Text Editor - against competencies from Mandate)
      - Strengths (Text Area)
      - Areas for Development (Text Area)
      - Attach Feedback Document (File Upload)
    - **Functionality:**
      - Track interview progress per candidate, per mandate.
      - View consolidated feedback for a candidate.
      - Calendar view of scheduled interviews (future enhancement).
2.  **Offer Management (Basic):**
    - **Form: Log Offer Details**
      - Candidate Name (Read-only)
      - Mandate (Read-only)
      - Offer Date (Date Picker)
      - Offered Salary/Compensation Package (Text Area or structured fields - can pre-fill from Mandate's Compensation section)
      - Joining Date (Date Picker)
      - Offer Status (Dropdown: Extended, Accepted, Declined, Renegotiating)
      - Notes (Text Area)
    - Track offer status.

**Tasks for Phase 3:**

- **Backend:**
  - Design database schema for Interviews, InterviewFeedback, Offers.
  - Develop APIs for CRUD operations on Interviews, Feedback, and Offers.
  - Logic for associating feedback and offers with candidates and mandates.
- **Frontend:**
  - Develop UI for scheduling/logging interviews.
  - Develop UI for submitting/viewing interview feedback.
  - Develop UI for logging/tracking offer details.
  - Integrate interview and offer status into Candidate and Mandate views.
- **General:**
  - Notifications for interview schedules and feedback submission (future).

---

### Phase 4: Dashboards, Reporting & Revenue Tracking

**(Corresponds to PRD Stage 2: Interactive Dashboarding & Stage 3: Revenue Dashboard, and Leadership Hiring Process: F. Reporting & Analytics)**

**Objective:** Provide comprehensive dashboards and reporting for operational insights and revenue forecasting.

**Key Features & Modules:**

1.  **Recruiter Dashboard (PRD Stage 2):**
    - Time-based views (daily, weekly, monthly).
    - My Open Mandates (summary cards with key details).
    - Candidates in Pipeline (by stage).
    - Upcoming Interviews.
    - SLA Tracker (mandates approaching or past sourcing deadlines, based on Mandate Timeline).
    - Key metrics: Time to fill (average), profiles submitted, interview conversion rates.
    - Filtering by Key Account/New/IPO, quarter, status.
2.  **Leadership Dashboard (PRD Stage 2):**
    - Overall hiring pipeline view.
    - Team performance metrics (recruiter-wise).
    - Mandate status overview (by priority, client type).
    - Key metrics: Total open roles, filled roles, average time to fill, sourcing effectiveness.
3.  **Revenue Dashboard (PRD Stage 3):**
    - Forecasted revenue based on mandates in offer/accepted stage (Fee % from Mandate Commercials x Salary from Offer).
    - Actual revenue (once candidate joins and invoice is raised - manual update initially).
    - Pipeline value by stage.
    - Filtering by quarter, client.
4.  **Reporting Module:**
    - Customizable reports (e.g., candidate source effectiveness, diversity reports - future).
    - Export data to CSV/Excel.

**Tasks for Phase 4:**

- **Backend:**
  - Develop data aggregation logic for dashboards and reports.
  - APIs to serve dashboard data efficiently.
  - Implement logic for revenue calculation and forecasting using data from Mandate and Offer forms.
- **Frontend:**
  - Develop interactive Recruiter Dashboard UI using charting libraries.
  - Develop interactive Leadership Dashboard UI.
  - Develop Revenue Dashboard UI.
  - Implement filtering and date range selection for dashboards.
  - Develop basic reporting interface with export functionality.
- **General:**
  - Ensure dashboard performance with potentially large datasets.
  - Thorough testing of calculations and data accuracy.

---

### Phase 5: AI Copilot Enhancements & Integrations

**(Corresponds to PRD Stage 4: Recruiter Copilot - advanced features)**

**Objective:** Leverage AI to further automate and enhance recruiter productivity.

**Key Features & Modules:**

1.  **Advanced Candidate Sourcing:**
    - Integration with LinkedIn Recruiter/Job Boards API for automated candidate searching based on mandate criteria (from Phase 1 detailed forms).
    - AI-powered candidate-to-job matching and scoring.
2.  **Persona Chat Automation:**
    - AI prompts recruiter with tailored questions for persona definition based on role (enhancing Phase 1's Candidate Persona section).
    - AI suggests persona archetypes.
3.  **Communication Assistance:**
    - AI-generated email templates for candidate outreach, interview scheduling, rejection.
    - Sentiment analysis on candidate communications (future).
4.  **Predictive Analytics:**
    - Predict time-to-fill for new mandates.
    - Identify at-risk mandates based on progress against timelines and sourcing data.

**Tasks for Phase 5:**

- **Backend:**
  - Integrate with external APIs (LinkedIn, GPT models).
  - Develop and train ML models for candidate matching and scoring (if custom).
  - Develop AI logic for persona chat and communication assistance.
- **Frontend:**
  - UI for managing AI-sourced candidate profiles.
  - Interface for AI Copilot features (e.g., query input, suggestion display).
- **General:**
  - Ethical considerations and bias mitigation in AI features.
  - Monitoring and refinement of AI model performance.
  - Rate limiting, error handling for external APIs.

---

## 6. Non-Functional Requirements

- **Usability:** Intuitive, recruiter-friendly UI. Minimal clicks to perform common tasks. Responsive design for desktop and tablet. The Mandate creation form should be easy to navigate, possibly using tabs or an accordion structure.
- **Performance:** Fast load times for dashboards and lists. Efficient database queries.
- **Scalability:** System should handle a growing number of users, mandates, and candidates.
- **Security:** Secure PII data. Protection against common web vulnerabilities (XSS, SQLi). Regular security audits.
- **Maintainability:** Modular codebase, clear documentation, consistent coding standards.
- **Testability:** High unit test coverage. Integration tests for key workflows. Mock API endpoints for external services.
- **Reliability:** High uptime. Robust error handling and logging. Data backup and recovery plan.

## 7. Data Migration (If applicable)

- Plan for migrating existing data from spreadsheets or legacy systems.
- Data mapping and validation strategy.

## 8. Success Metrics (Aligned with PRD_LeaderHireAI)

- **Phase 1 Completion:** Initial project setup complete; 100% of core requirement fields (as detailed in the multi-section Mandate form) captured; mandates can be created, viewed, and filtered.
- **Phase 2 Completion:** 90% of recruiters actively using the candidate database and sourcing tracking features. Reduction in manual resume tracking.
- **Phase 3 Completion:** Streamlined interview scheduling reported by 80% of users. All interview feedback captured in the system.
- **Phase 4 Completion:**
  - Recruiter & Leadership Dashboards used at least once daily by 90% of respective users.
  - Revenue forecasts within 10% of actuals (after 3 months of use).
- **Phase 5 Completion:** 80% of recruiters using AI copilot features weekly. Measurable improvement in sourcing speed or candidate match quality.
- **Overall:**
  - Reduction in average time-to-fill for leadership roles.
  - Increased recruiter productivity.
  - Improved client satisfaction.

## 9. Risks and Mitigations

- **Data Privacy & Compliance (PII):**
  - **Risk:** Non-compliance with data protection regulations (e.g., GDPR, CCPA).
  - **Mitigation:** Implement data encryption, anonymization where possible, clear consent mechanisms, regular compliance checks.
- **External API Reliability/Changes:**
  - **Risk:** Dependence on LinkedIn or other APIs that may change or become unavailable.
  - **Mitigation:** Implement fallbacks, caching, graceful degradation. Monitor API status.
- **Scope Creep:**
  - **Risk:** Adding unplanned features leading to delays.
  - **Mitigation:** Strict change management process. Prioritize features based on impact and effort.
- **User Adoption:**
  - **Risk:** Recruiters resistant to using the new platform, especially if the detailed Mandate form feels cumbersome.
  - **Mitigation:** Involve users in design and testing phases. Ensure the form is logically structured and easy to complete (e.g., good UI for tabs/sections). Provide comprehensive training and support. Highlight benefits clearly.
- **AI Model Accuracy & Bias:**
  - **Risk:** AI features providing inaccurate suggestions or exhibiting bias.
  - **Mitigation:** Rigorous testing of AI models. Use diverse datasets. Implement mechanisms for feedback and continuous improvement. Transparency in AI decision-making.

## 10. Dependencies (Aligned with PRD_LeaderHireAI)

- **Phase 1:** Detailed requirement templates (for the multi-section Mandate form design), file upload libraries, UI framework (e.g., React), chosen backend framework and database.
- **Phase 2:** Resume parsing libraries (optional), search indexing technology.
- **Phase 3:** Calendar components (optional).
- **Phase 4:** Charting libraries (e.g., Chart.js, D3.js, Recharts), backend data aggregation logic.
- **Phase 5:** Access to relevant AI/ML APIs (e.g., OpenAI GPT), LinkedIn API access (if applicable).

## 11. Timeline Overview (High-Level - adjust as per team velocity)

- **Phase 1 (Initial Setup & Core Requirement Management):** Weeks 1-6 (extended slightly for more detailed form)
  - Initial Project Setup.
  - Core CRUD for Mandates (with detailed tabbed/sectioned form), Clients, Users.
  - Basic requirement capture functionality.
- **Phase 2 (Sourcing & Candidate Management):** Weeks 7-10
  - Candidate database, search.
  - Sourcing tracking.
- **Phase 3 (Interview, Assessment & Offer):** Weeks 11-13
  - Interview scheduling and feedback.
  - Offer logging.
- **Phase 4 (Dashboards & Reporting):** Weeks 14-17
  - Recruiter, Leadership, and Revenue Dashboards.
- **Phase 5 (AI Copilot & Integrations):** Weeks 18+ (Iterative)
  - Initial AI features, then ongoing enhancements.

This PRD provides a comprehensive plan. Each phase will require detailed design specifications and sprint planning.
