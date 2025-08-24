import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  try {
    // Use environment variables for Supabase configuration
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_API_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        'Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_API_KEY environment variables.'
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    })

    console.log('Attempting to call RPC function...')

    // Use the RPC function to get reports with coordinates
    const { data: rpcData, error: rpcError } = await supabase.rpc('get_reports_with_coordinates')

    if (rpcError) {
      console.error('RPC Error:', rpcError)
      throw rpcError
    }

    // Transform the data to match expected format
    const reports =
      rpcData?.map((report: any) => ({
        report_id: report.report_id,
        longitude: report.longitude,
        latitude: report.latitude,
        crime_category: report.crime_category,
        crime_id: report.crime_id,
        report_time: report.report_time,
      })) || []

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
        error: 'Failed to fetch reports. Please check your Supabase configuration.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
