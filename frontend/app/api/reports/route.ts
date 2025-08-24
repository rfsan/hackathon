import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import type { Report } from '@/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const crimeId = searchParams.get('crime_id');

    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_API_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration.')
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    console.log('Attempting to call RPC function...')

    let query = supabase.rpc('get_reports_with_coordinates').returns<Report[]>();
    
    // If crime_id is provided, we need to filter differently
    // Since the RPC might not support filtering, we'll filter after
    const { data, error } = await query;

    if (error) {
      console.error('RPC Error:', error)
      throw error
    }

    // ✅ Type-narrow to an array before map (the error-shaped object is not an array)
    const rows: Report[] = Array.isArray(data) ? (data as Report[]) : []

    // Filter by crime_id if provided
    const filteredRows = crimeId 
      ? rows.filter(r => r.crime_id === crimeId)
      : rows;

    const reports: Report[] = filteredRows.map((r) => ({
      report_id: r.report_id,
      longitude: r.longitude,
      latitude: r.latitude,
      crime_category: r.crime_category,
      crime_id: r.crime_id,
      report_time: r.report_time,
      user_id: r.user_id || null,
      report_path: r.report_path || null,
      report_details: r.report_details || `Reporte de ${r.crime_category} en coordenadas ${r.latitude}, ${r.longitude}`,
      messages: r.messages || null,
      location: r.location || null,
      priority_level: r.priority_level || Math.floor(Math.random() * 3) + 2, // Random priority 2-4 for demo
      created_at: r.created_at || r.report_time,
      updated_at: r.updated_at || r.report_time,
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
