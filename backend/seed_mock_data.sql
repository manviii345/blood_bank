
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "public"."blood_requests";
CREATE POLICY "Enable insert for authenticated users only" ON "public"."blood_requests" FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON "public"."donations";
CREATE POLICY "Enable insert for authenticated users only" ON "public"."donations" FOR INSERT TO authenticated WITH CHECK (true);


-- 3. Seed Blood Inventory Mock Data
-- This prevents the dashboard from looking empty
TRUNCATE TABLE public.blood_inventory CASCADE;

INSERT INTO public.blood_inventory (blood_group, quantity_ml, donation_date, expiry_date, status)
VALUES
  ('O+', 45000, CURRENT_DATE - INTERVAL '2 days', CURRENT_DATE + INTERVAL '35 days', 'available'),
  ('O-', 12000, CURRENT_DATE - INTERVAL '1 day', CURRENT_DATE + INTERVAL '35 days', 'available'),
  ('A+', 32000, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '35 days', 'available'),
  ('A-', 8000, CURRENT_DATE, CURRENT_DATE + INTERVAL '35 days', 'available'),
  ('B+', 21000, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '35 days', 'available'),
  ('B-', 4000, CURRENT_DATE - INTERVAL '12 days', CURRENT_DATE + INTERVAL '35 days', 'available'),
  ('AB+', 6000, CURRENT_DATE - INTERVAL '15 days', CURRENT_DATE + INTERVAL '35 days', 'available'),
  ('AB-', 2000, CURRENT_DATE - INTERVAL '20 days', CURRENT_DATE + INTERVAL '35 days', 'available');

-- You are now ready for the demo!
