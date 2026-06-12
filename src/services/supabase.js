import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmtbdncpyrxeyzapcuyi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdGJkbmNweXJ4ZXl6YXBjdXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNTQ3MjAsImV4cCI6MjA5NjgzMDcyMH0.jRX-rk7_H9ZqFe2RSB7eEgWo-PVArv8K5RKSY0Lp-mw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
