# Phase 2: Candidate Management & Advanced Features

## Overview

Phase 2 focuses on implementing and refining candidate management, linking candidates to requirements, and introducing advanced workflow and UX improvements. This phase builds on the foundation from Phase 1 and follows all project and Cursor rules for documentation, code, and workflow.

## Objectives

- Complete CRUD for candidates (UI + API)
- Implement resume upload and management
- Enable linking/unlinking candidates to requirements
- Add candidate search, filter, and profile view
- Improve candidate status tracking and notes
- Refine UI/UX for candidate workflows
- Ensure all features follow shared component and error handling conventions
- Update documentation and commit practices throughout

## Breakdown

### 1. Candidate CRUD

- [ ] List candidates (UI + API)
- [ ] Create candidate (form, validation, API)
- [ ] Edit candidate (form, validation, API)
- [ ] Delete candidate (API + UI action)
- [ ] Candidate detail/profile view

### 2. Resume Upload & Management

- [ ] Upload resume (PDF, DOCX)
- [ ] Store and link resume to candidate
- [ ] Download/view resume from candidate profile
- [ ] Validate file type and size

### 3. Linking Candidates to Requirements

- [ ] Link candidate(s) to requirement (UI + API)
- [ ] Unlink candidate(s) from requirement
- [ ] Show linked candidates on requirement detail page
- [ ] Show linked requirements on candidate profile

### 4. Candidate Search & Filter

- [ ] Search by name, email, skills, status
- [ ] Filter by status, source, linked requirement
- [ ] Real-time updates and debounced search

### 5. Candidate Status & Notes

- [ ] Track candidate status (New, Contacted, Screened, etc.)
- [ ] Add and view notes/activity history per candidate
- [ ] Status update workflow (UI + API)

### 6. UI/UX & Shared Components

- [ ] Use shared form, table, and layout components
- [ ] Responsive design for all candidate pages
- [ ] Consistent error handling and loading states
- [ ] Add feedback and error messages for all actions

### 7. Documentation & Practices

- [ ] Update `SETUP_NOTES.md` and `PROJECT_PRACTICES.md` after each major change
- [ ] Use conventional commits for all work
- [ ] Document new API endpoints and UI patterns
- [ ] Keep codebase and docs in sync

---

**Always follow project and Cursor rules for shared components, error handling, and documentation.**
