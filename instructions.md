# instructions.md

You are building a production-quality full-stack project.

Your job is NOT only to generate code, but also to maintain project structure, development discipline, documentation, scalability, and engineering quality throughout the entire development process.

The project must feel like it was built by experienced engineers and designers — not generated randomly.

---

# Core Development Philosophy

Always prioritize:
- Maintainability
- Scalability
- Clean architecture
- Reusability
- Readability
- Consistency
- Proper documentation
- Real-world engineering practices

Never generate messy or rushed implementations.

---

# Mandatory Workflow

Before implementing ANY feature:

1. Analyze the requirement carefully
2. Understand affected modules
3. Check current folder structure
4. Identify reusable components/services
5. Verify naming consistency
6. Plan implementation before coding
7. Update documentation if needed

Do not blindly generate files.

---

# Required Project Tracking Files

The project MUST maintain these files throughout development:

## 1. README.md
Continuously update:
- Project overview
- Setup instructions
- Tech stack
- Folder structure
- Environment variables
- Run commands
- Deployment steps
- Feature list
- Screenshots section placeholders

README should always reflect current project state.

---

## 2. PROJECT_STRUCTURE.md

Document:
- Complete folder structure
- Purpose of each directory
- Important architectural decisions
- Shared utilities
- API structure
- State management structure

Update this whenever folders/modules change.

---

## 3. DEVELOPMENT_LOG.md

Maintain a chronological log of:
- Features added
- Bugs fixed
- Refactors
- Database changes
- API updates
- Important implementation decisions

Every major change should be recorded.

Example format:

## [Date]
### Added
- Authentication flow
- Admin dashboard

### Updated
- Navbar responsiveness

### Fixed
- Supabase auth persistence issue

---

## 4. CHECKPOINTS.md

Create development checkpoints.

Each checkpoint should include:
- Goal
- Completed tasks
- Pending tasks
- Known issues
- Next milestone

Example:

# Checkpoint 3
Completed:
- Login system
- Role-based auth
- Dashboard routing

Pending:
- Analytics page
- Notifications

Issues:
- Mobile navbar overlap bug

---

## 5. API_DOCUMENTATION.md

Document:
- Routes
- Request body
- Response structure
- Auth requirements
- Error responses

All APIs must be documented.

---

## 6. DATABASE_SCHEMA.md

Maintain:
- Tables
- Relationships
- Foreign keys
- RLS policies
- Indexes
- Storage buckets
- Triggers/functions

Must stay synchronized with Supabase schema.

---

## 7. COMPONENT_GUIDE.md

Document reusable components:
- Purpose
- Props
- Usage examples
- Shared styles
- Variants

Avoid duplicate UI components.

---

# Directory Rules

Maintain a clean scalable structure.

Never:
- Dump everything into one folder
- Create random utility files
- Mix frontend/backend logic
- Create duplicate components

Prefer structure like:

frontend/
├── src/
│   ├── components/
│   ├── features/
│   ├── pages/
│   ├── hooks/
│   ├── layouts/
│   ├── services/
│   ├── lib/
│   ├── utils/
│   ├── styles/
│   └── types/

backend/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── services/
│   ├── utils/
│   ├── config/
│   └── validations/

Do not create unnecessary nesting.

---

# Code Quality Rules

Always:
- Use meaningful names
- Keep functions modular
- Separate business logic
- Reuse utilities
- Avoid hardcoding
- Use constants/configs
- Handle errors properly
- Validate inputs
- Write clean async code

Avoid:
- Massive components
- Repeated logic
- Inline styles everywhere
- Magic numbers
- Deep prop drilling
- Huge files

---

# Frontend Rules

Use:
- React + Vite
- Tailwind CSS
- Framer Motion

Follow design rules from:
design.md

The UI must:
- Feel premium
- Avoid generic AI layouts
- Have visual hierarchy
- Use proper spacing rhythm
- Include subtle animations
- Have responsive layouts
- Include proper loading states
- Include proper empty states
- Include accessible forms

Do not generate repetitive card-based UI everywhere.

---

# Backend Rules

Use:
- Express.js
- Modular architecture
- REST APIs

Must include:
- Middleware separation
- Validation
- Error handling
- Logging
- Secure environment usage
- Role-based access control

Keep controllers thin.
Move business logic into services.

---

# Database Rules

Use Supabase properly.

Must implement:
- Relational schema
- Foreign keys
- RLS policies
- Secure auth
- Proper indexing

Avoid bad schema design.

Document every schema update.

---

# Git & Checkpoint Discipline

After every major feature:
- Update CHECKPOINTS.md
- Update DEVELOPMENT_LOG.md
- Update README.md if needed

Treat each feature like a production milestone.

---

# Documentation Discipline

Whenever adding:
- New feature
- New route
- New component
- New table
- New service

Update relevant .md files immediately.

Documentation must evolve WITH the codebase.

---

# Refactoring Rules

Continuously:
- Remove dead code
- Merge duplicate logic
- Improve naming
- Improve folder organization
- Optimize reusable patterns

Do not allow architecture decay.

---

# UI/UX Expectations

The project should:
- Feel intentional
- Feel designed
- Feel smooth
- Feel modern
- Avoid template aesthetics

Animations should be:
- Minimal
- Elegant
- Purposeful

Avoid:
- Cheap glassmorphism
- Excessive gradients
- Oversized rounded corners
- Generic SaaS design

---

# Performance Rules

Optimize:
- Component rendering
- API calls
- Database queries
- Bundle size
- Image loading

Use lazy loading where appropriate.

---

# Final Development Behavior

Always think like:
- Senior engineer
- Product designer
- System architect

Do not blindly generate code.

Understand the project structure first.
Maintain consistency.
Keep documentation updated.
Preserve clean architecture.
Build production-quality systems.