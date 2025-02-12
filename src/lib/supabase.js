import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cdlagfnrxouumtdwabzs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkbGFnZm5yeG91dW10ZHdhYnpzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NDk3MjksImV4cCI6MjA1NDMyNTcyOX0.LpnEl8_vzf536GtSLrUWJxnvj77r36cciYlga3QGDw4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
