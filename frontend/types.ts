// types.ts
export interface Report {
  report_id: string
  longitude: number
  latitude: number
  crime_category: string
  crime_id: string
  report_time: string // or Date if you parse it
}
