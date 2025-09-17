-- Add password_hash column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Update the database types
-- Note: You'll need to run this in Supabase SQL Editor

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);