# Database Schema

*(This document describes the Supabase PostgreSQL schema)*

## Core Tables (Planned)

### `users` (managed by Supabase Auth)
- `id` (UUID, PK)
- `email` (String)

### `profiles`
- `id` (UUID, PK, FK to users.id)
- `first_name` (String)
- `last_name` (String)
- `role` (Enum: super_admin, staff, hospital, donor)
- `created_at` (Timestamp)

### `donors`
- `id` (UUID, PK, FK to profiles.id)
- `blood_group` (String)
- `date_of_birth` (Date)
- `medical_history` (Text)
- `last_donation_date` (Date)

### `blood_inventory`
- `id` (UUID, PK)
- `blood_group` (String)
- `quantity_ml` (Integer)
- `donation_date` (Date)
- `expiry_date` (Date)
- `status` (Enum: available, reserved, expired)

### `blood_requests`
- `id` (UUID, PK)
- `hospital_id` (UUID, FK to profiles.id)
- `blood_group` (String)
- `urgency` (Enum: normal, high, critical)
- `quantity_units` (Integer)
- `status` (Enum: pending, approved, rejected, fulfilled)
- `created_at` (Timestamp)

### `donations`
- `id` (UUID, PK)
- `donor_id` (UUID, FK to donors.id)
- `blood_inventory_id` (UUID, FK to blood_inventory.id, nullable)
- `status` (Enum: scheduled, completed, rejected)
- `date` (Timestamp)

## Relationships
- A `profile` belongs to a `user`.
- A `donor` is a specific type of `profile`.
- A `blood_request` is created by a hospital `profile`.
- `donations` link `donors` to `blood_inventory` items.
