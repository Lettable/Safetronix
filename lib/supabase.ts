import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Report {
  id: string
  name: string
  platform: string
  description: string
  category: string[]
  created_at: string
}

export interface Stat {
  id: string
  date: string
  category: "terrorism" | "abuse" | "dmca" | "extremism" | "fraud"
  count: number
}

export interface Discovery {
  id: string
  entity: string
  category: string
  platform: string
  date: string
  status: string
  confirmed: boolean
  description: string
  created_at: string
}
