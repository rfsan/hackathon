export interface ReportFile {
  name: string;
  extension: string;
  size: number;
  type: string;
  created_at?: string;
  updated_at?: string;
}

// Function to get file icon based on extension
export const getFileIcon = (extension: string, type: string): string => {
  switch (type) {
    case 'audio':
      return '🎵';
    case 'image':
      return '📷';
    case 'video':
      return '🎬';
    case 'text':
      return '📝';
    case 'document':
      return '📄';
    default:
      // Specific extensions
      switch (extension.toLowerCase()) {
        case 'opus':
          return '🎤';
        case 'txt':
          return '📝';
        case 'json':
          return '⚙️';
        case 'pdf':
          return '📋';
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
        case 'webp':
          return '📸';
        case 'mp4':
        case 'webm':
        case 'mov':
          return '🎥';
        case 'zip':
        case 'rar':
          return '📦';
        default:
          return '📁';
      }
  }
};

// Function to get file type color
export const getFileTypeColor = (type: string): string => {
  switch (type) {
    case 'audio':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'image':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'video':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'text':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'document':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Function to format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

// Function to get file type display name
export const getFileTypeName = (type: string): string => {
  switch (type) {
    case 'audio':
      return 'Audio';
    case 'image':
      return 'Imagen';
    case 'video':
      return 'Video';
    case 'text':
      return 'Texto';
    case 'document':
      return 'Documento';
    default:
      return 'Archivo';
  }
};

// Function to get file URL from Supabase Storage
export const getFileUrl = (reportId: string, fileName: string): string => {
  // For public files in the crime-reports bucket
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    // Handle different file path structures
    // Some files are stored as reportId/fileName, others as just the fileName
    const cleanFileName = fileName.startsWith(`${reportId}/`) ? fileName : `${reportId}/${fileName}`;
    return `${supabaseUrl}/storage/v1/object/public/crime-reports/${cleanFileName}`;
  }
  // Fallback to a mock URL structure
  return `/api/files/${reportId}/${fileName}`;
};

// Function to get direct file URL (alternative approach)
export const getDirectFileUrl = (fileName: string): string => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/crime-reports/${fileName}`;
  }
  return `/api/files/${fileName}`;
};