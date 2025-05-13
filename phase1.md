Okay, I understand. You want to take the PRD we've been working on (which covers Initial Setup, Requirement Management process, and Core User Authentication) and expand it for Phase 1 to *also* include the "Sourcing & Candidate Management" features from the "PRD overall.md" file you provided.

To make "Sourcing & Candidate Management" functional, it logically needs the "Mandate/Requisition Management" and "Client Management (Basic)" features that were part of Phase 1 in your "PRD overall.md".

Therefore, I will create an updated Phase 1 PRD that now comprehensively covers:
1.  Initial Setup & Environment
2.  Requirement Management (Process)
3.  User Authentication & Authorization
4.  Client Management (Basic)
5.  Mandate/Requisition Management (Core Requirement Definition)
6.  Sourcing & Candidate Management (Basic)

This will make Phase 1 quite substantial, laying down a very significant portion of your platform's core functionality.

Here is the updated, expanded Phase 1 PRD:

---

**Product Requirements Document: [Your SaaS Tool Name] - Phase 1: Foundational Platform & Initial Recruitment Workflow**

**1. Introduction**

* **Product:** [Your SaaS Tool Name] - A comprehensive platform designed to streamline the leadership hiring process.
* **Phase 1 Goal:** To establish the foundational web application, including core setup, user authentication, client and mandate (requisition) management, and initial sourcing & candidate management capabilities. This phase aims to deliver a functional MVP that allows recruiters to manage the early stages of the hiring lifecycle.
* **Current Date:** May 13, 2025
* **Document Version:** 1.2 (Expanded Scope)

**2. Objectives for Phase 1**

* Set up the core development environment, version control, necessary tooling, and basic requirement management practices.
* Implement secure user registration, login, and role-based access control (Recruiter, Admin).
* Enable basic management of client information.
* Develop a comprehensive system for creating, defining, and managing job mandates/requisitions, capturing detailed requirements.
* Implement foundational features for sourcing candidates, managing a candidate database, and linking candidates to mandates.
* Ensure all sensitive data (passwords, PII) is handled securely.
* Build using a modern Next.js stack for future scalability.

**3. Target Audience (Initial - Phase 1)**

* **Recruiters:** Primary users for managing clients, mandates, sourcing, and candidates.
* **Admin Users:** For system setup and user management.
* (Internal development and testing team).

**4. Initial Setup & Environment (Phase 1)**

* **4.1. Development Environment:**
    * Node.js (LTS), npm/yarn, Git, VS Code (or preferred IDE), Docker (optional).
    * ESLint and Prettier setup.
* **4.2. Version Control:**
    * Private Git repository (GitHub, GitLab, etc.).
    * Branching strategy (e.g., `main`, feature branches).
    * Commit message standards (e.g., Conventional Commits).
* **4.3. Task Management:**
    * Task board (Trello, Jira, GitHub Projects) for Phase 1 tasks.
* **4.4. Communication:**
    * Primary communication channels (Slack, Discord).
* **4.5. Cloud Services & Accounts:**
    * Database provider (PostgreSQL - e.g., Supabase, Neon).
    * Deployment platform (Vercel).
    * Secure credential management.
* **4.6. Dependency Management:**
    * `npm` or `yarn`.

**5. Requirement Management (Process for Phase 1)**

* **5.1. Source of Truth:** This PRD.
* **5.2. Tracking:** User stories and functional requirements broken into tasks on the task board.
* **5.3. Change Management:** Discuss, agree, and document any scope changes. Minimize for Phase 1.
* **5.4. Prioritization:** All requirements herein are essential for Phase 1.
* **5.5. Acceptance Criteria:** Defined by Functional Requirements and Success Metrics, verified by manual testing.

**6. User Stories (Phase 1 - Expanded)**

* **Authentication & Access:**
    * **US1.1 (Registration):** As a new user (Recruiter/Admin), I want to sign up with a unique username and a password so I can create an account.
    * **US1.2 (Login):** As an existing user, I want to log in with my username and password so I can access my account.
    * **US1.3 (Role-Based Access):** As an Admin, I want different levels of access compared to a Recruiter.
    * **US1.4 (Logout):** As a logged-in user, I want to log out of my account securely.
* **Client Management:**
    * **US1.5 (Add Client):** As a Recruiter, I want to add new client details to the system so I can associate mandates with them.
    * **US1.6 (View Clients):** As a Recruiter, I want to view a list of all clients.
* **Mandate/Requisition Management:**
    * **US1.7 (Create Mandate):** As a Recruiter, I want to create a new job mandate/requisition, capturing detailed information across various aspects (client details, role specs, compensation, timeline, persona, sourcing strategy, qualification) so that the requirement is clearly defined.
    * **US1.8 (View/Edit Mandate):** As a Recruiter, I want to view and edit existing mandate details.
    * **US1.9 (Filter/Search Mandates):** As a Recruiter, I want to filter and search mandates (e.g., by client, status) to quickly find relevant information.
* **Sourcing & Candidate Management:**
    * **US1.10 (Add Candidate):** As a Recruiter, I want to add new candidates to a central database, including their contact info, skills, and resume.
    * **US1.11 (Link Candidate to Mandate):** As a Recruiter, I want to link candidates from the database to specific mandates they are being considered for.
    * **US1.12 (View Candidates):** As a Recruiter, I want to view a list of candidates and their profiles.
    * **US1.13 (Search Candidates):** As a Recruiter, I want to search the candidate database (e.g., by skills, name) to find suitable profiles.
    * **US1.14 (Track Sourcing):** As a Recruiter managing a mandate, I want to log notes and track progress against sourcing timelines.

**7. Functional Requirements (Phase 1 - Expanded)**

* **7.1. User Authentication & Authorization:**
    * (As detailed in the previous PRD: Registration, Login, Logout, Password Security, Role-based access stubs for Recruiter/Admin).
* **7.2. Client Management (Basic):**
    * **FR1.2.1:** System shall allow creating, viewing, and editing client records.
    * **FR1.2.2:** Client record to include: Client Name, Contact Person, Contact Email/Phone, Industry, Status (Active/Inactive).
    * **FR1.2.3:** List view for clients with basic search/filter.
* **7.3. Mandate/Requisition Management (Core Requirement Definition):**
    * **FR1.3.1:** System shall allow creating, viewing, editing, and listing mandates.
    * **FR1.3.2:** Mandate creation/editing form to be comprehensive, capturing details across sections (potentially tabbed or sequential for better UX):
        * **Mandate & Client Details:** Title, Associated Client, Recruiter Assigned, Priority, Status, Date Opened.
        * **Role Context & Specs:** Reporting Lines, Location, Employment Type, Job Description (Rich Text), Key Competencies, "Jobs To Be Done", Org Culture, Performance Expectations.
        * **Compensation & Commercials:** Salary Range, Bonus, Equity, Benefits, Client Agreement Notes, Fee %.
        * **Timeline & Process:** Target Sourcing SLA, Offer Date, Close Date, Key Milestones.
        * **Candidate Persona:** Ideal Profile Summary, Target Industries/Companies, Experience, Education, Soft Skills, Persona Archetype Notes.
        * **Sourcing Strategy (Initial):** Channels, Target Companies, Keywords, "Do Not Approach" List, Sourcing Notes.
        * **Qualification (Internal):** Client Engagement Score, Role Complexity, Brand Notes, Pricing Threshold, Internal Decision & Justification.
        * **Attachments:** Upload Job Description, Client Agreement, Other relevant documents per mandate.
    * **FR1.3.3:** Mandates linked to Clients.
    * **FR1.3.4:** Mandate list view with filtering (by client, status, recruiter) and search.
    * **FR1.3.5:** Basic audit trail for key changes to mandate records (e.g., status changes).
* **7.4. Sourcing & Candidate Management (Basic):**
    * **FR1.4.1 (Candidate Database):**
        * System shall allow adding, viewing, and editing candidate profiles.
        * Candidate profile to include: Full Name, Email, Phone, LinkedIn URL, Current Role/Company, Location, Key Skills (tag input), Years of Experience, Resume/CV (File Upload: PDF, DOCX), Source, Candidate Status (e.g., New, Contacted, Screened), Notes/Screening Comments.
        * Ability to link a candidate to one or more Mandates.
        * Basic search and filter capabilities for the candidate database (e.g., by name, skills, status).
    * **FR1.4.2 (Sourcing Tracking - on Mandate View):**
        * Within a mandate's detail view, provide fields to log sourcing progress notes.
        * Display target sourcing timeline (from Mandate details).
        * (Visual SLA indicators are a plus, but detailed tracking is for a later phase).
    * **FR1.4.3 (Resume Management):**
        * Allow upload of resumes (PDF, DOCX) to candidate profiles.
        * Resumes should be downloadable. (Basic parsing is out of scope for Phase 1).

**8. Non-Functional Requirements (Phase 1 Focus)**

* (Largely as per previous PRD: Security, Usability, Performance, Maintainability).
* **NFR1.5 (Data Integrity):** Ensure accurate linking between Clients, Mandates, and Candidates.

**9. UI/UX Considerations (Brief for Phase 1)**

* (Largely as per previous PRD: Clean design, standard forms, Tailwind CSS, clear feedback, dynamic navigation).
* The comprehensive Mandate creation form should be designed for ease of use, potentially using a multi-step wizard, tabs, or an accordion interface to avoid overwhelming the user.
* Clear visual distinction and navigation between Client, Mandate, and Candidate sections.

**10. Proposed Tech Stack for Phase 1**

* (Same as previous PRD: Next.js, TypeScript, Auth.js with Credentials Provider, PostgreSQL, Prisma, bcrypt, Tailwind CSS, ESLint/Prettier, Git).
* Consider libraries for file handling/uploads (e.g., built-in Next.js capabilities or a library like `multer` if using custom server handlers, though API routes can handle this).

**11. Development Steps / Execution Plan (High-Level - Expanded)**

* **11.1. Project Initialization & Core Setup:** (As per previous PRD).
* **11.2. Database Schema & Migrations:**
    * (As per previous PRD for Auth models).
    * Add models for `Client`, `Mandate` (with all its detailed fields and relations), `Candidate`, `Attachment`, and any necessary join tables (e.g., `CandidatesOnMandates`).
    * Run Prisma migrations.
* **11.3. Authentication Backend (Auth.js):** (As per previous PRD).
* **11.4. API Endpoints (Route Handlers):**
    * CRUD APIs for `Client` management.
    * CRUD APIs for `Mandate` management (including file uploads for attachments).
    * CRUD APIs for `Candidate` management (including resume uploads).
    * API for linking/unlinking Candidates and Mandates.
    * User Registration API (as per previous PRD).
* **11.5. Frontend Development:**
    * Authentication pages (Signup, Login) and `SessionProvider` setup (as per previous PRD).
    * Navigation component (as per previous PRD).
    * **Client Management:** Forms for Add/Edit Client; Client list view.
    * **Mandate Management:**
        * Comprehensive multi-section/tabbed form for Create/Edit Mandate.
        * Mandate list view with filtering and search.
        * Mandate detail view incorporating Sourcing Tracking notes field.
    * **Candidate Management:**
        * Form for Add/Edit Candidate (with resume upload).
        * Candidate list view with search/filter.
        * Candidate profile view.
        * Mechanism to link candidates to mandates (e.g., from candidate profile or mandate detail page).
    * Protected Dashboard placeholder (as per previous PRD).
    * Logout functionality (as per previous PRD).
* **11.6. Basic Styling & User Experience:** (As per previous PRD).
* **11.7. Initial Testing (Manual):**
    * (Authentication testing as per previous PRD).
    * Test CRUD operations for Clients, Mandates, Candidates.
    * Test file uploads for mandates and candidates.
    * Test linking of candidates to mandates.
    * Verify data integrity and relationships in the database.
    * Test usability of the multi-section Mandate form.

**12. Success Metrics for Phase 1**

* (Setup and Auth metrics as per previous PRD).
* Recruiters can successfully create and manage detailed Client records.
* Recruiters can successfully create, define (using all specified sections/fields), and manage Mandates.
* Recruiters can successfully add Candidates to the database, including uploading resumes.
* Recruiters can link Candidates to relevant Mandates.
* Basic search and filtering for Mandates and Candidates are functional.
* Sourcing notes can be logged against a Mandate.
* All core data entities (Users, Clients, Mandates, Candidates, Attachments) are correctly stored and related in the database.

**13. Out of Scope for Phase 1 / Future Considerations**

* **Advanced Sourcing Features:** Automated resume parsing, AI candidate matching, direct integration with LinkedIn/job boards for sourcing.
* **Interview & Offer Management:** Scheduling, feedback collection, offer tracking.
* **Advanced Dashboards & Reporting:** Detailed analytics, revenue tracking.
* **Advanced AI Copilot Features.**
* Password Reset, Email Verification, OAuth, 2FA.
* Detailed SLA tracking visuals and notifications.
* Advanced audit trails beyond basic record changes.
* Automated testing (unit, integration, E2E).
* User profile management (change password, etc.).
* Full production deployment CI/CD, advanced monitoring.

---

This expanded Phase 1 is now significantly more ambitious, combining the initial setup and authentication with the core functionalities of managing clients, detailed job requisitions (mandates), and the initial stages of sourcing and candidate management. This provides a much more functional "slice" of your overall platform.

Let me know if this revised PRD aligns with your vision for Phase 1!