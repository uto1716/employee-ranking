-- Add user_type column to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS user_type VARCHAR(20) DEFAULT 'personal'
CHECK (user_type IN ('corporate', 'personal', 'admin'));

-- Update existing admin users
UPDATE public.users
SET user_type = 'admin'
WHERE role = 'admin';

-- Update other users to personal (if user_type is null)
UPDATE public.users
SET user_type = 'personal'
WHERE user_type IS NULL AND role != 'admin';

-- Show current users
SELECT email, role, user_type FROM public.users ORDER BY created_at;