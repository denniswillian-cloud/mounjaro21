import { createClient } from '@supabase/supabase-js';

// Injetadas pelo vite.config.ts via define (sincronizadas da integração Supabase↔Vercel)
declare const __SUPABASE_URL__: string;
declare const __SUPABASE_ANON_KEY__: string;

export const supabase = createClient(__SUPABASE_URL__, __SUPABASE_ANON_KEY__);
