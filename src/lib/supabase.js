import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
PUBLIC_SUPABASE_URL = "https://liaxjaygctgiiqbzotew.supabase.co";
PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpYXhqYXlnY3RnaWlxYnpvdGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNzE1MTEsImV4cCI6MjAzMjY0NzUxMX0.p3LU_2BGaNVNC7GtG_NWsVQp3lkMKqJDJZqydnFpjm0";

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);