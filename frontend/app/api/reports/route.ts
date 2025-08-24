import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Report } from '@/types'

export async function GET() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_API_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration.')
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    console.log('Attempting to call RPC function...')

    const { data, error } = await supabase
      .rpc('get_reports_with_coordinates')
      .returns<Report[]>() // we expect an array

    if (error) {
      console.error('RPC Error:', error)
      throw error
    }

    // ✅ Type-narrow to an array before map (the error-shaped object is not an array)
    const rows: Report[] = Array.isArray(data) ? (data as Report[]) : []

    const reports: Report[] = rows.map((r) => ({
      report_id: r.report_id,
      longitude: r.longitude,
      latitude: r.latitude,
      crime_category: r.crime_category,
      crime_id: r.crime_id,
      report_time: r.report_time,
    }))

    console.log(`✅ Fetched ${reports.length} reports from database`)

    return NextResponse.json({
      success: true,
      data: reports,
      count: reports.length,
    })
  } catch (error) {
    console.error('API Route error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch reports',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
