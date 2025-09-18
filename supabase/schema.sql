-- Enable RLS (Row Level Security)
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    user_type VARCHAR(20) DEFAULT 'personal' CHECK (user_type IN ('corporate', 'personal', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create employees table
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    join_date DATE NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO public.users (email, name, role, user_type)
VALUES ('admin@example.com', '管理者', 'admin', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert sample employees
INSERT INTO public.employees (name, department, position, join_date, email, phone) VALUES
('田中 太郎', '害虫駆除', 'シニアテクニシャン', '2020-04-01', 'taro.tanaka@example.com', '090-1234-5678'),
('佐藤 花子', '害虫駆除', 'テクニシャン', '2021-06-15', 'hanako.sato@example.com', '090-2345-6789'),
('鈴木 一郎', '清掃', 'チームリーダー', '2019-08-20', 'ichiro.suzuki@example.com', '090-3456-7890')
ON CONFLICT DO NOTHING;

-- Enable RLS policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify users" ON public.users
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    ));

-- Employees table policies
CREATE POLICY "Everyone can view employees" ON public.employees
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify employees" ON public.employees
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
    ));

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();