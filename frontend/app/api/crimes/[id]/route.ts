import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: crimeId } = await params;
    
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Fallback to mock data if Supabase isn't configured
      const now = new Date();
      const createdAt = new Date(now.getTime() - (2 * 60 * 60 * 1000)); // 2 hours ago
      const updatedAt = new Date(now.getTime() - (30 * 60 * 1000)); // 30 minutes ago
      
      const mockCrimeData = {
        crime_id: crimeId,
        crime_summary: "Este crimen involucra múltiples reportes de actividad sospechosa en la misma área geográfica. La inteligencia artificial ha identificado patrones similares en los reportes que sugieren que están relacionados con el mismo incidente criminal.",
        crime_type: "robo_personas",
        followup_actions: "Se recomienda aumentar patrullaje en la zona identificada. Coordinar con autoridades locales para investigación adicional.",
        location: null,
        created_at: createdAt.toISOString(),
        updated_at: updatedAt.toISOString()
      };
      
      return NextResponse.json({
        success: true,
        data: mockCrimeData
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Fetch crime details from database
    const { data, error } = await supabase
      .from('Crime')
      .select('*')
      .eq('crime_id', crimeId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found
        return NextResponse.json(
          { success: false, error: 'Crime not found' },
          { status: 404 }
        );
      }
      throw error;
    }
    
    return NextResponse.json({
      success: true,
      data: data
    });
  } catch (error) {
    console.error('Error fetching crime:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch crime details' 
      },
      { status: 500 }
    );
  }
}