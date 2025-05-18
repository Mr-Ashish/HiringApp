# Phase 2: Candidate Management & Advanced Features

## Overview

Phase 2 focuses on implementing and refining candidate management, linking candidates to requirements, and introducing advanced workflow and UX improvements. This phase builds on the foundation from Phase 1 and follows all project and Cursor rules for documentation, code, and workflow.

## Objectives

- [x] Complete CRUD for candidates (UI + API)
- [x] Implement resume upload and management
- [ ] Enable linking/unlinking candidates to requirements
- [~] Add candidate search, filter, and profile view (basic done, advanced pending)
- [~] Improve candidate status tracking and notes (basic done, advanced pending)
- [~] Refine UI/UX for candidate workflows (core done, polish pending)
- [x] Ensure all features follow shared component and error handling conventions
- [x] Update documentation and commit practices throughout

## Breakdown

### 1. Candidate CRUD

- [x] List candidates (UI + API)
- [x] Create candidate (form, validation, API)
- [x] Edit candidate (form, validation, API)
- [ ] Delete candidate (API + UI action)
- [x] Candidate detail/profile view

### 2. Resume Upload & Management

- [x] Upload resume (PDF, DOCX)
- [x] Store and link resume to candidate
- [x] Download/view resume from candidate profile
- [x] Validate file type and size

### 3. Linking Candidates to Requirements

- [ ] Link candidate(s) to requirement (UI + API)
- [ ] Unlink candidate(s) from requirement
- [ ] Show linked candidates on requirement detail page
- [ ] Show linked requirements on candidate profile

### 4. Candidate Search & Filter

- [~] Search by name, email, skills, status (basic done, advanced pending)
- [~] Filter by status, source, linked requirement (basic done, advanced pending)
- [~] Real-time updates and debounced search (basic done, advanced pending)

### 5. Candidate Status & Notes

- [~] Track candidate status (New, Contacted, Screened, etc.) (basic done, advanced pending)
- [ ] Add and view notes/activity history per candidate
- [ ] Status update workflow (UI + API)

### 6. UI/UX & Shared Components

- [x] Use shared form, table, and layout components
- [~] Responsive design for all candidate pages (core done, polish pending)
- [x] Consistent error handling and loading states
- [x] Add feedback and error messages for all actions

### 7. Documentation & Practices

- [x] Update `SETUP_NOTES.md` and `PROJECT_PRACTICES.md` after each major change
- [x] Use conventional commits for all work
- [x] Document new API endpoints and UI patterns
- [x] Keep codebase and docs in sync

---

**Testing is the next step.**
