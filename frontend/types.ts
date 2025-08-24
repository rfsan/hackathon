// types.ts
export interface Report {
  report_id: string
  longitude: number
  latitude: number
  crime_category: string
  crime_id: string | null
  report_time: string // or Date if you parse it
  user_id?: string | null
  report_path?: string | null
  report_details?: string | null
  messages?: any
  location?: any
  priority_level?: number | null
  created_at?: string
  updated_at?: string
}

export interface Crime {
  crime_id: string
  crime_summary: string | null
  crime_type: string | null
  followup_actions: string | null
  location: any
  created_at: string
  updated_at: string
}
