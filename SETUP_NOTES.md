# Setup and Debugging Notes

## Current Status

- Project initialized with Next.js (App Router, TypeScript, Tailwind CSS)
- Prisma schema updated with User, Client, Mandate, Candidate, and join tables
- Database connection verified and migrations applied
- Prisma client generated and used in API routes
- Authentication flow implemented (NextAuth, registration endpoint, password hashing, session protection)
- Middleware for route protection in place
- Frontend auth pages (login and register) created and styled
- Sidebar navigation implemented (collapsible, tooltips, logout dropdown, user info)
- Sidebar hidden on login/register pages
- Sidebar and main content layout responsive to sidebar state
- CRUD logic for clients implemented (API + UI)
- Dashboard page scaffolded with new layout
- Responsive design implemented across all pages
- Search and filter functionality added to requirements page

## Major Refactors & Improvements (May 13, 2025)

### 1. Unified Requirements/Mandates Workflow

- All references to "mandates" have been renamed to "requirements" for consistency across UI, navigation, and API routes.
- The `/requirements` workflow now includes list, detail, and multi-tabbed create/edit forms.
- API endpoints are now `/api/requirements` and `/api/requirements/[id]` (Prisma model remains `mandate`).
- Old mandates files and routes have been removed to avoid duplication.

### 2. Beautiful, Consistent Form Inputs

- Created `StyledInput`, `StyledSelect`, and `StyledTextarea` React components for all forms.
- All input, select, and textarea fields in the requirements workflow now use these components for a modern, accessible, and visually appealing look (subtle gray background, border, shadow, smooth transitions).
- These components are reusable and should be used in all new forms for consistency.

### 3. UI/UX Enhancements

- Requirements form is multi-tabbed, with each section clearly separated.
- All form fields are now visually distinct, even when not focused.
- Layout and navigation updated to reflect the requirements-first workflow.
- Responsive design implemented across all pages:
  - Mobile-first approach with Tailwind's responsive classes
  - Flexible grid layouts that adapt to screen size
  - Collapsible tables with horizontal scroll on mobile
  - Stacked form elements on smaller screens
  - Consistent spacing and padding across devices
  - Touch-friendly button sizes and spacing

## Commit Guidelines

When committing changes to the repository, follow these guidelines:

1. **Commit Message Format:**

   ```
   type(scope): description

   [optional body]
   [optional footer]
   ```

2. **Types:**

   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, etc.)
   - `refactor`: Code refactoring
   - `test`: Adding or modifying tests
   - `chore`: Maintenance tasks

3. **Scopes:**

   - `auth`: Authentication related
   - `ui`: UI components and styling
   - `api`: API routes and endpoints
   - `db`: Database schema and migrations
   - `deps`: Dependency updates
   - `config`: Configuration changes

4. **Examples:**

   ```
   feat(ui): add responsive design to requirements page
   fix(auth): resolve login redirect loop
   docs(api): update API documentation
   style(ui): improve form input styling
   ```

5. **Commit Process:**
   1. Create a new branch for your feature/fix
   2. Make your changes
   3. Test thoroughly
   4. Update documentation if needed
   5. Commit with descriptive message
   6. Create pull request
   7. Get code review
   8. Merge after approval

## Steps to Debug and Fix

### 1. Prisma Schema & Database

- [x] Add missing Candidate model
- [x] Add proper relations between models
- [x] Add location and website to Client model
- [ ] Add file upload handling for resumes (to be handled in API/routes)
- [ ] Add audit trail fields where needed (future enhancement)

### 2. Database Connection

- [x] Verify DATABASE_URL in .env file
- [x] Test database connection
- [x] Run initial migration

### 3. Dependencies Check

- [x] Verify all required packages are installed
- [x] Check for version conflicts
- [x] Ensure Prisma CLI is properly installed
- [x] Install and configure react-icons

### 4. UI/UX & Layout Decisions

- [x] Sidebar is collapsible and defaults to collapsed (icon-only) after login
- [x] Sidebar tooltips on hover when collapsed
- [x] Sidebar includes: Overview, Clients, Requirements, Candidates, and user info with logout dropdown
- [x] Sidebar hidden on /login and /register pages
- [x] Logout dropdown closes on outside click
- [x] Main content area autosizes margin based on sidebar state
- [x] No left margin/space on login/register pages
- [x] Dashboard and all authenticated pages use the new layout
- [x] All navigation and section links are now in the left sidebar
- [x] Top bar removed for a cleaner, focused workspace
- [x] Responsive design implemented across all pages
- [x] Search and filter functionality added to requirements page

### 5. Mandate API Implementation

- [x] Implemented CRUD API for mandates:
  - [x] List mandates (GET /api/mandates)
  - [x] Create mandate (POST /api/mandates)
  - [x] Get single mandate (GET /api/mandates/[id])
  - [x] Update mandate (PUT /api/mandates/[id])
  - [x] Delete mandate (DELETE /api/mandates/[id])
- [x] Frontend implementation for mandates (list, detail, create/edit form)

## Next Steps for Phase 1 (when resuming)

1. **Mandate/Requirement Management**
   - [x] Implement CRUD logic for Requirements (API + UI)
   - [x] Multi-section/tabbed form for create/edit
   - [x] List and detail views
   - [x] Consistent, beautiful form fields
   - [x] Responsive design implementation
2. **Candidate Management**
   - Implement CRUD logic for Candidates (API + UI)
   - Candidate form with resume upload (file handling)
   - Candidate list view with search/filter
   - Candidate profile view
   - Mechanism to link candidates to requirements (from candidate profile or requirement detail page)
3. **Linking & Relationships**
   - Implement UI and API for linking/unlinking Candidates and Requirements
   - Ensure data integrity and relationships in the database
4. **Search & Filter**
   - Add basic search/filter for Requirements and Candidates
5. **Testing**
   - Test CRUD operations for Clients, Requirements, Candidates
   - Test file uploads for requirements and candidates
   - Test linking of candidates to requirements
   - Verify data integrity and relationships in the database
   - Test usability of the multi-section Requirement form
6. **Styling & UX**
   - Refine forms and lists for Requirements and Candidates
   - Ensure consistent, modern UI/UX across all pages
   - Add feedback and error handling for all forms
7. **Documentation**
   - Keep this file updated with all major changes, design decisions, and next steps
   - Reference the PRD (phase1.md) for detailed requirements and field lists

## Error Log

(No errors as of last migration, API route scaffolding, auth setup, frontend auth pages, and client CRUD implementation)

## [2024-05-13] UI/UX Update: Sidebar Improvements

- Sidebar is now visible on all authenticated pages (not just dashboard)
- Sidebar is collapsible: users can toggle between full and minified (icon-only) views
- Sidebar tooltips on hover when collapsed
- Sidebar includes: Overview, Clients, Requirements, Candidates, and user info with logout dropdown
- Sidebar hidden on /login and /register pages
- Logout dropdown closes on outside click
- Main content area automatically adjusts its left margin based on sidebar state (collapsed or expanded) for autoscaling
- No left margin/space on login/register pages
- SidebarContext is used to manage and share the collapsed state between sidebar and main layout
- Rationale: This provides a consistent, focused navigation experience after login and matches modern SaaS dashboard patterns

## [2024-05-13] Authentication & Route Protection Improvements

### 1. Centralized Route Protection

- Created `src/lib/auth-config.ts` for centralized management of protected and public routes
- Added type-safe route definitions with TypeScript
- Implemented helper functions for route checking and redirects
- All protected routes now properly require authentication:
  - `/dashboard`
  - `/clients`
  - `/requirements`
  - `/candidates`

### 2. Middleware Enhancements

- Updated middleware to use centralized route configuration
- Improved route protection logic
- Added proper type safety for route matching
- Ensured consistent behavior across all protected routes

### 3. Auth Layout Improvements

- Updated AuthLayout to use centralized route configuration
- Improved session handling and redirects
- Better type safety for route checking
- More maintainable code structure

### 4. Benefits of New System

- Single source of truth for route protection
- Type-safe route names and configurations
- Easy to add new protected routes
- Consistent behavior across the application
- Helper functions for common auth-related checks
- Better maintainability and scalability

## Reference

- See `phase1.md` for the full PRD, user stories, and field requirements for Requirements and Candidates.
- All design/UX decisions are made to match the reference UI and PRD requirements.

## Candidate Management Implementation (2024-05-13)

### Components Created

1. `src/components/forms/CandidateForm.tsx`

   - Form for adding/editing candidates
   - Includes resume upload functionality
   - Handles validation and error states
   - Uses styled form components for consistency

2. `src/components/forms/StyledInput.tsx`

   - Reusable input component with label
   - Consistent styling across forms

3. `src/components/forms/StyledSelect.tsx`

   - Reusable select component with label
   - Consistent styling across forms

4. `src/components/forms/StyledTextarea.tsx`
   - Reusable textarea component with label
   - Consistent styling across forms

### API Endpoints

1. `src/app/api/candidates/route.ts`

   - GET: List candidates with search and filter functionality
   - POST: Create new candidate
   - Protected by authentication
   - Handles validation and error cases

2. `src/app/api/candidates/upload-resume/route.ts`
   - POST: Handle resume file uploads
   - Validates file type (PDF, DOC, DOCX) and size (5MB limit)
   - Stores files in public/uploads/resumes directory
   - Updates candidate record with resume URL

### Pages

1. `src/app/candidates/page.tsx`

   - Lists all candidates with search and filter functionality
   - Responsive table layout
   - Status badges with appropriate colors
   - Links to individual candidate pages

2. `src/app/candidates/new/page.tsx`
   - Form for adding new candidates
   - Uses CandidateForm component

### Features Implemented

1. Candidate Creation

   - Basic information (name, email, phone, etc.)
   - Current role and company
   - Key skills with tag-like interface
   - Source and status tracking
   - Notes field for additional information

2. Resume Upload

   - File type validation (PDF, DOC, DOCX)
   - File size limit (5MB)
   - Secure file storage
   - URL tracking in database

3. Search & Filter

   - Search by name, email, role, company
   - Filter by status and source
   - Real-time updates
   - Responsive design

4. UI/UX
   - Consistent styling with other forms
   - Clear error messages
   - Loading states
   - Responsive layout
   - Status badges with appropriate colors

### Next Steps

1. Implement individual candidate view/edit page
2. Add candidate-mandate linking functionality
3. Implement candidate status update workflow
4. Add candidate notes and activity history
5. Implement candidate export functionality

## Common Layout Components & Usage Guidelines

To ensure consistent spacing, alignment, and responsiveness across all pages, use the following reusable layout components:

### 1. PageContainer

- **Purpose:** Centers content and constrains max width (e.g., forms, tables, main content).
- **Usage:**
  ```tsx
  <PageContainer maxWidth="max-w-5xl">...</PageContainer>
  ```
- **Default:** `max-w-5xl` and `mx-auto` for centering. Adjust `maxWidth` as needed (e.g., `max-w-2xl` for forms).
- **All main content should be wrapped in PageContainer.**

### 2. PageHeader

- **Purpose:** Consistent page titles and action buttons (e.g., "Add New Requirement").
- **Usage:**
  ```tsx
  <PageHeader
    title="Requirements"
    action={{ label: "Add New", href: "/requirements/new" }}
  />
  ```
- **Place at the top of each main page.**

### 3. TableContainer

- **Purpose:** Consistent table styling, background, and horizontal scrolling.
- **Usage:**
  ```tsx
  <TableContainer>
    {" "}
    <table>...</table>{" "}
  </TableContainer>
  ```
- **Wrap all data tables in TableContainer.**

### Guidelines

- **Always use these components for new pages and when refactoring old ones.**
- **Do not apply custom max-width or centering to individual pages; use PageContainer instead.**
- **If you need to change spacing or width globally, update the relevant layout component.**
- **This ensures that spacing, alignment, and responsiveness are consistent everywhere.**

_See the components in `src/components/layouts/` for implementation details._

### Layout Hierarchy Guidelines

- **All main pages (list, forms, etc.) must use `DashboardLayout` as the outermost wrapper.**
- **All main content must be wrapped in `PageContainer` inside `DashboardLayout`.**
- **For list/table pages, use `maxWidth="max-w-7xl"` in `PageContainer` for a wide, centered layout.**
- **For forms or detail pages, use a narrower max width (e.g., `max-w-2xl`).**
- **This ensures all main content is at the same hierarchy and spacing, and global layout changes can be made in one place.**

_Example:_

```tsx
<DashboardLayout title="...">
  <PageContainer maxWidth="max-w-7xl">...main content...</PageContainer>
</DashboardLayout>
```

### Table Usage Guidelines

- **All tables must be wrapped in `TableContainer` for consistent scroll and styling.**
- **Any table-related changes (scroll, background, border, etc.) should be made in `TableContainer` for global effect.**
- **Do not wrap tables in custom divs or containers; always use the shared component.**
- **LEARNING:** Enforce the use of common components for general UI patterns (like tables, forms, layouts) to ensure consistency and make global changes easy.

---
