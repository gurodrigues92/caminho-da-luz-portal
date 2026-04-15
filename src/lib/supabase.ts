import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? 'https://api.supabase.altavance.media'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzY5NzMyNTE0LCJleHAiOjIwODUwOTI1MTR9.WKtaYnfgGLdY40XLylVGOP-IuRcp63nt_qiFo7p1NUQ'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
