import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://glwwjmtptqxhdorxsuah.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Zw5KvVQTxGEWHp2lfy4mHQ_XbbDXuS_';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSafeSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key || !url.startsWith('http') || url.includes('placeholder')) {
    return null;
  }
  return createClient(url, key);
};
