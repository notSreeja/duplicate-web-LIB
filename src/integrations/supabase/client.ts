import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://tmmbxmjiptvwvtdmfqsr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbWJ4bWppcHR2d3Z0ZG1mcXNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxNzE5NzUsImV4cCI6MjA1MTc0Nzk3NX0.Gb59D5xL7sZ-6iQeN_xjPbmNfQk6tgVR3aTe0hT_FwY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
