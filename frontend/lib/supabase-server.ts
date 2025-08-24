import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client (for API routes)
// Using service role key for server-side operations
const supabaseUrl = 'https://llnotoljxkilousxtsdk.supabase.co'

// For now, let's try with a different approach - create a client that works server-side
export const supabaseServer = createClient(
  supabaseUrl,
  // Using the same key but with server-side configuration
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsbm90b2xqeGtpbG91c3h0c2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NzI5MDMsImV4cCI6MjA3MTU0ODkwM30.ril_QBwoEk7IwFPBXmew4N7coi58fauV1xAQPe9jbOM',
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  }
)