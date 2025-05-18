# Project Practices & Conventions

## AI Assistant Instructions

### Project Context

- This is a leadership hiring platform built with Next.js (App Router)
- The project follows a SaaS model for recruitment agencies
- Current phase focuses on core functionality: client management, requirements, and candidate sourcing
- Authentication is implemented using NextAuth.js with credentials provider

### Key Files to Review First

1. `SETUP_NOTES.md` - Contains current status and recent changes
2. `phase1.md` - Contains the PRD and requirements
3. `src/lib/auth-config.ts` - Contains route protection configuration
4. `src/middleware.ts` - Contains authentication middleware
5. `src/app/api/auth/[...nextauth]/route.ts` - Contains NextAuth configuration

### Important Patterns to Follow

1. Always check `SETUP_NOTES.md` first to understand current status
2. Follow the authentication patterns established in `auth-config.ts`
3. Use the provided styled components for consistency
4. Maintain the established file structure
5. Follow the error handling patterns in API routes

### Common Tasks & Solutions

1. Adding new protected routes:

   - Add to `PROTECTED_ROUTES` in `auth-config.ts`
   - Update middleware matcher
   - Add to navigation if needed

2. Creating new API endpoints:

   - Place in appropriate subdirectory under `src/app/api`
   - Include session check
   - Follow error handling pattern
   - Use proper HTTP status codes

3. Adding new components:

   - Use provided styled components
   - Follow established patterns
   - Place in appropriate subdirectory
   - Include proper TypeScript types

4. Database operations:
   - Use Prisma client from `src/lib/prisma`
   - Include proper error handling
   - Use transactions when needed
   - Follow established patterns

### Project-Specific Considerations

1. Authentication:

   - Uses NextAuth.js with credentials provider
   - Session-based authentication
   - Role-based access (RECRUITER, ADMIN)
   - Protected routes require authentication

2. File Upload:

   - Resume uploads for candidates
   - Document uploads for requirements
   - Use Next.js API routes for handling uploads
   - Store files securely

3. Database Schema:

   - User model for authentication
   - Client model for company information
   - Mandate model for job requirements
   - Candidate model for applicant information
   - Proper relationships between models

4. UI Components:
   - StyledInput, StyledSelect, StyledTextarea for forms
   - Sidebar for navigation
   - Responsive layout
   - Consistent styling with Tailwind CSS

### When Resuming Development

1. Review `SETUP_NOTES.md` for recent changes
2. Check `phase1.md` for requirements
3. Review authentication setup
4. Check database schema
5. Review UI components
6. Check API routes
7. Review error handling
8. Check file structure

## Authentication & Authorization

### Route Protection

- All protected routes are defined in `src/lib/auth-config.ts`
- Use the provided helper functions (`isProtectedRoute`, `isPublicRoute`, `getNextRoute`) for route checks
- Always add new protected routes to the `PROTECTED_ROUTES` array in `auth-config.ts`
- Never hardcode route protection logic in components
- Protected routes include: `/dashboard`, `/clients`, `/requirements`, `/candidates`
- Public routes include: `/`, `/login`, `/register`

### Session Management

- Use `getServerSession` for server-side session checks
- Use `useSession` hook for client-side session management
- Always check session before accessing protected API routes
- Handle unauthorized access with proper error responses (401)
- Session includes user role and ID
- Use `AuthLayout` component for protected pages

## File Structure & Organization

### Components

- Place reusable components in `src/components`
- Use the `.tsx` extension for React components
- Follow the naming convention: `ComponentName.tsx`
- Group related components in subdirectories (e.g., `components/forms/`, `components/layout/`)
- Key components:
  - `AuthLayout.tsx` - Handles authentication layout
  - `Sidebar.tsx` - Navigation sidebar
  - `MainContent.tsx` - Main content wrapper
  - `StyledInput.tsx`, `StyledSelect.tsx`, `StyledTextarea.tsx` - Form components

### API Routes

- Place API routes in `src/app/api`
- Follow RESTful conventions for endpoint naming
- Group related endpoints in subdirectories
- Always include proper error handling and status codes
- Use TypeScript types for request/response bodies
- Key API routes:
  - `/api/auth/*` - Authentication endpoints
  - `/api/clients/*` - Client management
  - `/api/requirements/*` - Requirements management
  - `/api/candidates/*` - Candidate management

### Utilities & Helpers

- Place utility functions in `src/lib`
- Use `.ts` extension for non-React files
- Group related utilities in separate files (e.g., `auth-config.ts`, `prisma.ts`)

## TypeScript Practices

### Type Definitions

- Use TypeScript interfaces for component props
- Define shared types in `src/types` directory
- Use type assertions sparingly and only when necessary
- Leverage TypeScript's type inference where possible

### Type Safety

- Avoid using `any` type
- Use proper type definitions for API responses
- Use type guards when necessary
- Leverage TypeScript's strict mode

## State Management

### Client-Side State

- Use React's built-in state management (useState, useReducer) for simple state
- Use Context API for global state (e.g., SidebarContext)
- Keep state as local as possible
- Avoid prop drilling

### Server-Side State

- Use Prisma for database operations
- Implement proper error handling for database operations
- Use transactions when necessary
- Follow the repository pattern for database access

## UI/UX Conventions

### Components

- Use the provided styled components (`StyledInput`, `StyledSelect`, `StyledTextarea`)
- Follow consistent spacing and layout patterns
- Use Tailwind CSS for styling
- Maintain responsive design principles

### Forms

- Implement proper form validation
- Use consistent error message styling
- Provide clear feedback for user actions
- Handle loading states appropriately

## Error Handling

### API Routes

- Use proper HTTP status codes
- Return consistent error response format
- Log errors appropriately
- Handle edge cases gracefully

### Frontend

- Implement proper error boundaries
- Show user-friendly error messages
- Handle loading and error states in components
- Provide fallback UI when necessary

## Security Practices

### Authentication

- Never store sensitive data in client-side state
- Use secure session management
- Implement proper password hashing
- Use environment variables for sensitive data

### API Security

- Validate all input data
- Implement rate limiting where necessary
- Use proper CORS configuration
- Sanitize user input

## Testing & Quality

### Code Quality

- Follow ESLint and Prettier configurations
- Write self-documenting code
- Use meaningful variable and function names
- Keep functions small and focused

### Documentation

- Document complex logic
- Keep README and setup notes updated
- Document API endpoints
- Use JSDoc comments for complex functions

## Performance

### Optimization

- Use proper React hooks
- Implement proper memoization
- Optimize database queries
- Use proper indexing

### Loading States

- Implement proper loading indicators
- Use skeleton loaders where appropriate
- Handle data fetching states
- Implement proper error states

## Version Control

### Git Practices

- Use meaningful commit messages
- Follow conventional commits format
- Keep commits focused and atomic
- Use feature branches

## Deployment

### Environment

- Use proper environment variables
- Keep sensitive data secure
- Use different configurations for development and production
- Document deployment process

## Documentation Maintenance

### Files to Update During Development

1. `SETUP_NOTES.md`

   - Add new sections for major changes with date headers
   - Document completed features and their implementation details
   - Update the "Current Status" section
   - Add any new dependencies or configuration changes
   - Document any known issues or limitations
   - Update the "Next Steps" section
   - Format: `## [YYYY-MM-DD] Feature/Change Name`

2. `PROJECT_PRACTICES.md`

   - Add new patterns or conventions discovered
   - Update common tasks and solutions
   - Add new project-specific considerations
   - Document any architectural decisions
   - Update the AI Assistant Instructions if needed
   - Add new key files to review

3. `phase1.md` (PRD)

   - Update implementation status of requirements
   - Add any new requirements discovered
   - Document any scope changes
   - Update success metrics if needed

4. `README.md`
   - Update setup instructions if changed
   - Add new environment variables
   - Update dependencies
   - Add new features to the feature list
   - Update deployment instructions if changed

### When to Update Documentation

1. After Implementing New Features

   - Update `SETUP_NOTES.md` with implementation details
   - Add any new patterns to `PROJECT_PRACTICES.md`
   - Update feature status in `phase1.md`

2. After Making Architectural Changes

   - Document the changes in `SETUP_NOTES.md`
   - Update relevant sections in `PROJECT_PRACTICES.md`
   - Update any affected setup instructions

3. After Adding New Dependencies

   - Update `package.json`
   - Document in `SETUP_NOTES.md`
   - Update setup instructions if needed

4. After Changing Configuration
   - Update environment variables documentation
   - Document changes in `SETUP_NOTES.md`
   - Update relevant setup instructions

### Documentation Format

1. Date Headers

   - Use format: `## [YYYY-MM-DD] Change Description`
   - Group related changes under the same date
   - Order chronologically with newest first

2. Change Descriptions

   - Start with a brief summary
   - List specific changes
   - Include rationale for major changes
   - Reference related files or components

3. Code Examples

   - Include relevant code snippets
   - Show before/after for significant changes
   - Include configuration examples

4. Status Updates
   - Mark completed items with [x]
   - Mark in-progress items with [ ]
   - Add new items as needed

### Maintaining Context

1. Cross-References

   - Link related documentation
   - Reference specific files
   - Reference specific commits if relevant

2. Version Tracking

   - Document major version changes
   - Track breaking changes
   - Note migration requirements

3. Decision Log
   - Document architectural decisions
   - Include alternatives considered
   - Explain rationale for choices

### Regular Maintenance Tasks

1. Weekly Review

   - Check for outdated documentation
   - Update status of in-progress items
   - Add any missing documentation

2. After Each Major Feature

   - Update all relevant documentation
   - Review and update practices
   - Update setup instructions if needed

3. Before Deployment
   - Verify documentation is up to date
   - Check all setup instructions
   - Verify environment variables

---

This document will be updated as we continue development and adopt new practices. Always refer to this document when continuing work on the project. Pay special attention to the AI Assistant Instructions section when resuming development.

Remember to:

1. Keep all documentation files in sync
2. Update documentation as you make changes
3. Follow the established documentation format
4. Maintain cross-references between documents
5. Document decisions and their rationale

## Common Components Location & Usage

- All general-purpose, reusable components (e.g., layout wrappers, table containers, form fields) must be placed in a clearly named directory:
  - Layout components: `src/components/layouts/`
  - Form components: `src/components/forms/`
  - Other shared UI: `src/components/`
- When implementing a new feature or page, always check for an existing common component before creating a new one.
- If a new general-purpose component is needed, add it to the appropriate shared directory.
- **Never duplicate similar logic or markup across pages; always use or extend the shared component.**
- If a change is needed for a general UI pattern (e.g., table scroll, form field style), update the shared component so all usages benefit.
- **Coding Practice:** Enforce the use of shared components for all similar use cases. Review PRs for duplicate UI logic and refactor to use the common component if found.

## [2024-05-17] Phase 2 Practices Update

- Phase 2 (Candidate Management & Advanced Features) started; see `phase2.md` for breakdown
- All new features must:
  - Follow Cursor project rules in `.cursor/rules/`
  - Use and extend shared components for all UI patterns
  - Maintain consistent error handling and validation in API routes
  - Update `SETUP_NOTES.md` and `phase2.md` after each major change
  - Use conventional commits for all work
  - Keep documentation and codebase in sync

## Page Layout & Component Usage Rules

### 1. Layout Hierarchy

- All pages must use `DashboardLayout` as the outermost wrapper
- All main content must be wrapped in `PageContainer`
- List/table pages must use `maxWidth="max-w-7xl"`
- Form/detail pages must use `maxWidth="max-w-2xl"`
- Never create custom layout wrappers

### 2. Page Header

- Every page must use `PageHeader` for title and actions
- Action buttons must be passed through `PageHeader`'s action prop
- Never create custom header sections
- Example:
  ```tsx
  <PageHeader
    title="Candidates"
    action={{ label: "Add New", href: "/candidates/new" }}
  />
  ```

### 3. Table Usage

- All tables must be wrapped in `TableContainer`
- Never create custom table wrappers or containers
- Use consistent table styling and structure
- Include proper loading, error, and empty states
- Example:
  ```tsx
  <TableContainer>
    <table>...</table>
  </TableContainer>
  ```

### 4. Form Components

- Use `StyledInput`, `StyledSelect`, `StyledTextarea` for all form fields
- Never create custom form input components
- Import form components using named imports
- Add proper TypeScript types for event handlers
- Example:

  ```tsx
  import { StyledInput, StyledSelect } from "@/components/forms";

  <StyledInput
    label="Search"
    value={search}
    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
  />;
  ```

### 5. Type Safety

- Add proper types for all event handlers
- Use TypeScript's `ChangeEvent` type for form events
- Properly type all state variables
- Avoid using `any` type
- Example:
  ```tsx
  const [search, setSearch] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  ```

### 6. Error Handling

- Implement proper error boundaries
- Show user-friendly error messages
- Handle loading and error states in components
- Provide fallback UI when necessary
- Example:
  ```tsx
  {
    error && (
      <div className="p-4 bg-red-100 text-red-700 rounded-md mb-6">{error}</div>
    );
  }
  ```

### 7. Responsive Design

- Use Tailwind's responsive classes
- Test on multiple screen sizes
- Ensure proper spacing and alignment
- Handle mobile layouts appropriately
- Example:
  ```tsx
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Form fields */}
  </div>
  ```

### 8. Component Location

- Place reusable components in appropriate directories:
  - Layout components: `src/components/layouts/`
  - Form components: `src/components/forms/`
  - Other shared UI: `src/components/`
- Never duplicate similar components
- Always check for existing components before creating new ones

### 9. Documentation

- Document component usage in comments
- Keep component props typed and documented
- Update documentation when modifying shared components
- Follow established patterns for new components

## [2024-05-18] Candidate Management Status (see SETUP_NOTES.md and phase2.md)

- [x] Candidate CRUD (list, create, edit, resume upload, shared components)
- [x] API endpoints for candidate CRUD and resume upload
- [x] Consistent UI/UX and error handling
- [ ] Delete candidate (UI + API)
- [ ] Candidate-requirement linking (UI + API, both directions)
- [ ] Linked requirements/candidates display
- [ ] Candidate notes & activity history
- [ ] Profile enhancements (timeline, activity feed)
- [ ] Advanced search/filter (skills, linked requirements, real-time)
- [ ] Candidate export

See SETUP_NOTES.md and phase2.md for full breakdown and next steps.

---
