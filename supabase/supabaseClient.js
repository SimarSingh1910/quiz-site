import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://nhejjclpreqfvfgsmsfj.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oZWpqY2xwcmVxZnZmZ3Ntc2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMzAzNDMsImV4cCI6MjA1NzgwNjM0M30.RV4ZczZfvp0clhvmRMcc0hFuaJNdQelfUs7srsl1mPg'; 

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);