-- Add user_type column and additional fields for corporate and personal users
BEGIN;

-- Add user_type column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='users' AND column_name='user_type'
  ) THEN
    ALTER TABLE public.users
    ADD COLUMN user_type VARCHAR(20) DEFAULT 'personal'
    CHECK (user_type IN ('corporate', 'personal', 'admin'));
  END IF;
END $$;

-- Add corporate-specific fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='users' AND column_name='representative'
  ) THEN
    ALTER TABLE public.users ADD COLUMN representative VARCHAR(255);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='users' AND column_name='business_type'
  ) THEN
    ALTER TABLE public.users ADD COLUMN business_type VARCHAR(255);
  END IF;
END $$;

-- Add personal-specific fields
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='users' AND column_name='nickname'
  ) THEN
    ALTER TABLE public.users ADD COLUMN nickname VARCHAR(100);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='users' AND column_name='social_media'
  ) THEN
    ALTER TABLE public.users ADD COLUMN social_media VARCHAR(255);
  END IF;
END $$;

-- Add website field for both types
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name='users' AND column_name='website'
  ) THEN
    ALTER TABLE public.users ADD COLUMN website VARCHAR(255);
  END IF;
END $$;

-- Update existing admin users to have admin user_type
UPDATE public.users
SET user_type = 'admin'
WHERE role = 'admin' AND (user_type IS NULL OR user_type = 'personal');

-- Update other existing users to have personal user_type
UPDATE public.users
SET user_type = 'personal'
WHERE user_type IS NULL AND role != 'admin';

COMMIT;

-- Show current users
SELECT id, email, name, role, user_type, representative, business_type, nickname, website
FROM public.users
ORDER BY created_at;