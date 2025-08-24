import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llnotoljxkilousxtsdk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsbm90b2xqeGtpbG91c3h0c2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NzI5MDMsImV4cCI6MjA3MTU0ODkwM30.ril_QBwoEk7IwFPBXmew4N7coi58fauV1xAQPe9jbOM'

// Only create client on the client side
export const supabase = typeof window !== 'undefined' 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any

// Database types
export interface Report {
  report_id: string
  location: {
    coordinates: [number, number] // [longitude, latitude]
  }
  crime_category: string
  crime_id: string | null
  created_at: string
}

export interface RealtimeReport {
  longitude: number
  latitude: number
  crime_category: string
  crime_id: string | null
  report_time: string
  report_id: string
}