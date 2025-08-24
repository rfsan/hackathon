import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reportId } = await params;
    
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_API_KEY;

    if (!supabaseUrl || !supabaseKey) {
      // Fallback to mock data if Supabase isn't configured
      const mockFiles = [
        { name: `${reportId}/voice_message.opus`, extension: 'opus', size: 12967, type: 'audio' },
        { name: `${reportId}/transcript.txt`, extension: 'txt', size: 84, type: 'text' },
        { name: `${reportId}/photo.jpg`, extension: 'jpg', size: 156780, type: 'image' }
      ];
      
      return NextResponse.json({
        success: true,
        data: mockFiles
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // Fetch files for this specific report from Supabase Storage
    const { data, error } = await supabase
      .storage
      .from('crime-reports')
      .list(reportId);

    if (error) {
      console.error('Storage error:', error);
      return NextResponse.json({
        success: true,
        data: [] // Return empty array if no files found or error
      });
    }

    // Process files to extract extensions and metadata
    const files = data?.map(file => {
      const fileName = file.name;
      const extension = fileName.includes('.') 
        ? fileName.split('.').pop()?.toLowerCase() || 'unknown'
        : 'unknown';
      
      const getFileType = (ext: string) => {
        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
        const audioExts = ['opus', 'mp3', 'wav', 'm4a', 'ogg'];
        const videoExts = ['mp4', 'webm', 'mov', 'avi'];
        const textExts = ['txt', 'json', 'csv', 'log'];
        const docExts = ['pdf', 'doc', 'docx'];
        
        if (imageExts.includes(ext)) return 'image';
        if (audioExts.includes(ext)) return 'audio';
        if (videoExts.includes(ext)) return 'video';
        if (textExts.includes(ext)) return 'text';
        if (docExts.includes(ext)) return 'document';
        return 'unknown';
      };
      
      return {
        name: fileName,
        extension,
        size: file.metadata?.size || 0,
        type: getFileType(extension),
        created_at: file.created_at,
        updated_at: file.updated_at
      };
    }) || [];
    
    return NextResponse.json({
      success: true,
      data: files
    });
  } catch (error) {
    console.error('Error fetching report files:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch report files' 
      },
      { status: 500 }
    );
  }
}