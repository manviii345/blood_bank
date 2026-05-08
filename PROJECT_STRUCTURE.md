# Project Structure

## Root
- `frontend/` - React + Vite frontend application
- `backend/` - Express.js backend application

## Frontend
```
frontend/
├── src/
│   ├── components/      # Shared/reusable UI components
│   ├── features/        # Feature-specific components and logic (e.g., auth, donor)
│   ├── pages/           # Route-level components
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout wrappers for pages
│   ├── services/        # API calls and external integrations
│   ├── lib/             # Third-party library configuration (e.g., Supabase client)
│   ├── utils/           # Helper functions
│   ├── styles/          # Global styles (Tailwind config/css)
│   └── types/           # TypeScript definitions (if applicable)
```

## Backend
```
backend/
├── src/
│   ├── routes/          # Express route definitions
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Express middleware (auth, error handling)
│   ├── services/        # Business logic
│   ├── utils/           # Helper functions
│   ├── config/          # Configuration files (Supabase, env)
│   └── validations/     # Input validation schemas
```

## Important Architectural Decisions
- UI components use a custom design system built with Tailwind CSS and Framer Motion.
- All business logic in the backend is separated into `services/` rather than kept in controllers.
- Supabase provides both Auth and the PostgreSQL database. We use Supabase RLS (Row Level Security) for database-level protection.
