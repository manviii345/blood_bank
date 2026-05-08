-- Aegis Blood Bank Management System - Initial Schema
-- Run this in your Supabase SQL Editor

-- 1. Create custom Enums for statuses
CREATE TYPE user_role AS ENUM ('super_admin', 'staff', 'hospital', 'donor');
CREATE TYPE inventory_status AS ENUM ('available', 'reserved', 'expired');
CREATE TYPE request_urgency AS ENUM ('normal', 'high', 'critical');
CREATE TYPE request_status AS ENUM ('pending', 'approved', 'rejected', 'fulfilled');
CREATE TYPE donation_status AS ENUM ('scheduled', 'completed', 'rejected');

-- 2. Profiles Table (Custom Auth)
CREATE TABLE public.profiles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'donor',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Donors Table (Extended Profile for Donors)
CREATE TABLE public.donors (
    id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    blood_group TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    medical_history TEXT,
    last_donation_date DATE
);

-- 4. Blood Inventory Table
CREATE TABLE public.blood_inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    blood_group TEXT NOT NULL,
    quantity_ml INTEGER NOT NULL,
    donation_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    status inventory_status NOT NULL DEFAULT 'available',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Blood Requests Table (For Hospitals)
CREATE TABLE public.blood_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    hospital_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    blood_group TEXT NOT NULL,
    urgency request_urgency NOT NULL DEFAULT 'normal',
    quantity_units INTEGER NOT NULL,
    status request_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Donations Table (Logging Donation Appointments/Events)
CREATE TABLE public.donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_id UUID REFERENCES public.donors(id) ON DELETE CASCADE,
    blood_inventory_id UUID REFERENCES public.blood_inventory(id) ON DELETE SET NULL,
    status donation_status NOT NULL DEFAULT 'scheduled',
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Setup Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read their own profile. Admins/Staff can read all.
CREATE POLICY "Users can view own profile" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = id);

-- Donors: Users can view their own donor info.
CREATE POLICY "Users can view own donor data" 
    ON public.donors FOR SELECT 
    USING (auth.uid() = id);

-- Inventory: Anyone authenticated can view available inventory
CREATE POLICY "Anyone can view inventory" 
    ON public.blood_inventory FOR SELECT 
    TO authenticated
    USING (true);

-- Requests: Hospitals can view their own, Staff/Admin can view all
CREATE POLICY "Hospitals can view own requests" 
    ON public.blood_requests FOR SELECT 
    USING (auth.uid() = hospital_id);

-- (Note: For a full production app, you would add more detailed INSERT/UPDATE/DELETE policies based on roles, 
--  but this provides the foundational security setup).
