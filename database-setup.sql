-- ============================================
-- LYBSYS Database Setup Script
-- Run this SQL in Lovable Cloud > Database > SQL Editor
-- ============================================

-- Step 1: Create enum types
CREATE TYPE public.app_role AS ENUM ('admin', 'librarian', 'patron');
CREATE TYPE public.item_status AS ENUM ('available', 'checked_out', 'on_hold', 'missing', 'lost', 'in_repair');
CREATE TYPE public.hold_status AS ENUM ('pending', 'ready', 'expired', 'fulfilled', 'cancelled');
CREATE TYPE public.item_format AS ENUM ('book', 'ebook', 'audiobook', 'dvd', 'magazine', 'other');

-- Step 2: Create tables
CREATE TABLE public.branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  branch_id UUID REFERENCES public.branches(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  isbn TEXT,
  publisher TEXT,
  publication_year INTEGER,
  format item_format DEFAULT 'book',
  category_id UUID REFERENCES public.categories(id),
  branch_id UUID REFERENCES public.branches(id),
  status item_status DEFAULT 'available',
  call_number TEXT,
  description TEXT,
  cover_image_url TEXT,
  total_copies INTEGER DEFAULT 1,
  available_copies INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.holds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE NOT NULL,
  patron_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status hold_status DEFAULT 'pending',
  queue_position INTEGER,
  pickup_branch_id UUID REFERENCES public.branches(id),
  placed_date TIMESTAMPTZ DEFAULT now(),
  ready_date TIMESTAMPTZ,
  expiry_date TIMESTAMPTZ,
  fulfilled_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.missing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE NOT NULL,
  branch_id UUID REFERENCES public.branches(id),
  reported_by UUID REFERENCES auth.users(id),
  reported_date TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'reported',
  last_seen_date TIMESTAMPTZ,
  replacement_cost NUMERIC(10,2),
  notes TEXT,
  resolved_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.inventory_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES public.branches(id),
  transaction_type TEXT NOT NULL,
  performed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Step 3: Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.missing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory_transactions ENABLE ROW LEVEL SECURITY;

-- Step 4: Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Step 5: Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  
  -- Assign default patron role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (new.id, 'patron');
  
  RETURN new;
END;
$$;

-- Step 6: Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 7: RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins and librarians can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'librarian')
  );

-- Step 8: RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Step 9: RLS Policies for branches
CREATE POLICY "Anyone can view branches"
  ON public.branches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage branches"
  ON public.branches FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Step 10: RLS Policies for categories
CREATE POLICY "Anyone can view categories"
  ON public.categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins and librarians can manage categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'librarian')
  );

-- Step 11: RLS Policies for items
CREATE POLICY "Anyone can view items"
  ON public.items FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Librarians and admins can manage items"
  ON public.items FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'librarian')
  );

-- Step 12: RLS Policies for holds
CREATE POLICY "Users can view their own holds"
  ON public.holds FOR SELECT
  TO authenticated
  USING (auth.uid() = patron_id);

CREATE POLICY "Users can create their own holds"
  ON public.holds FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = patron_id);

CREATE POLICY "Librarians and admins can view all holds"
  ON public.holds FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'librarian')
  );

CREATE POLICY "Librarians and admins can manage holds"
  ON public.holds FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'librarian')
  );

-- Step 13: RLS Policies for missing_items
CREATE POLICY "Librarians and admins can view missing items"
  ON public.missing_items FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'librarian')
  );

CREATE POLICY "Librarians and admins can manage missing items"
  ON public.missing_items FOR ALL
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'librarian')
  );

-- Step 14: RLS Policies for inventory_transactions
CREATE POLICY "Librarians and admins can view inventory transactions"
  ON public.inventory_transactions FOR SELECT
  TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'librarian')
  );

CREATE POLICY "Librarians and admins can create inventory transactions"
  ON public.inventory_transactions FOR INSERT
  TO authenticated
  WITH CHECK (
    public.has_role(auth.uid(), 'admin') OR 
    public.has_role(auth.uid(), 'librarian')
  );

-- Step 15: Insert sample data
INSERT INTO public.branches (name, code, address) VALUES
  ('Main Library', 'MAIN', '123 Library St, Downtown'),
  ('East Branch', 'EAST', '456 Oak Ave, Eastside'),
  ('West Branch', 'WEST', '789 Pine Rd, Westside'),
  ('North Branch', 'NORTH', '321 Maple Dr, Northside');

INSERT INTO public.categories (name, description) VALUES
  ('Fiction', 'Fiction books and novels'),
  ('Non-Fiction', 'Non-fiction and educational materials'),
  ('Reference', 'Reference materials and encyclopedias'),
  ('Children', 'Children''s books and materials'),
  ('Young Adult', 'Young adult fiction and non-fiction'),
  ('Audio/Visual', 'DVDs, audiobooks, and multimedia'),
  ('Periodicals', 'Magazines and journals');

-- Done! Your database is now ready to use.
