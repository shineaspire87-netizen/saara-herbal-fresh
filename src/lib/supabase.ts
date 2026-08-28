import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://glwwjmtptqxhdorxsuah.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Zw5KvVQTXGEWHp2lfy4mHQ_XbbDXuS_';

export const getSafeSupabase = () => {
  try {
    if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
      return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.error('Supabase initialization error:', err);
    return null;
  }
};
