import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://xiyasakxmaexvrwjleup.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpeWFzYWt4bWFleHZyd2psZXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAwMzUzOTQsImV4cCI6MjAzNTYxMTM5NH0.VPfWNKb2TH4ye4vEpyrMHW9tysQM20ITgMNKolo_E2o";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
