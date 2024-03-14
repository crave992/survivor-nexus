// utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://khotywbsirfvdjsfjdnk.supabase.co';
const supabaseApiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtob3R5d2JzaXJmdmRqc2ZqZG5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyMzAwODIsImV4cCI6MjAyNTgwNjA4Mn0.bTcUrJ_QplOF3Ra4537Jo2BO6bsLn4KayewcdT4lic8';

if (!supabaseUrl || !supabaseApiKey) {
  throw new Error('Supabase URL or API key not provided in environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseApiKey);
