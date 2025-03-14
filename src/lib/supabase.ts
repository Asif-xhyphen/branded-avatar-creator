
import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are not defined. Using fallback values for development.');
}

// Create a single supabase client for interacting with your database
// Use fallback values if environment variables are not defined
export const supabase = createClient(
  supabaseUrl || 'https://ddkhcvzwxehhzizvusst.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRka2hjdnp3eGVoaHppenZ1c3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1Mjg1NDEsImV4cCI6MjA1NzEwNDU0MX0.O7d9gfexJHFUfg3Uhrql6gyB34-1fsOCc20tpeeCgHk'
);
