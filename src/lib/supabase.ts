import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !key) {
  console.warn('[AXY] Supabase env vars missing. Check your .env file.')
}

export const supabase = createClient(url ?? '', key ?? '')

export interface Inquiry {
  id: string
  name: string
  email: string
  project_type: string
  selected_package: string | null
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  notes: string | null
  created_at: string
}
