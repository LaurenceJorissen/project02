import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://liaxjaygctgiiqbzotew.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpYXhqYXlnY3RnaWlxYnpvdGV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwNzE1MTEsImV4cCI6MjAzMjY0NzUxMX0.p3LU_2BGaNVNC7GtG_NWsVQp3lkMKqJDJZqydnFpjm0");
export {
  supabase as s
};
