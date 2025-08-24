"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCrimeColor, getCrimeTypeIcon, getCrimeTypeName, formatReportTime } from "@/lib/crime-data";
import { getFileIcon, getFileTypeColor, formatFileSize, getFileUrl, getDirectFileUrl, type ReportFile } from "@/lib/file-utils";

interface Crime {
  crime_id: string;
  crime_summary: string | null;
  crime_type: string | null;
  followup_actions: string | null;
  location: unknown;
  created_at: string;
  updated_at: string;
}

interface Report {
  report_id: string;
  user_id: string | null;
  report_path: string | null;
  report_details: string | null;
  messages: unknown;
  location: unknown;
  priority_level: number | null;
  crime_category: string;
  crime_id: string;
  report_time: string;
  created_at: string;
  updated_at: string;
}

interface CrimeData {
  crime: Crime;
  reports: Report[];
}

interface ReportWithFiles extends Report {
  files?: ReportFile[];
}

export default function CrimeDetailPage() {
  const params = useParams();
  const [crimeData, setCrimeData] = useState<CrimeData | null>(null);
  const [reportsWithFiles, setReportsWithFiles] = useState<ReportWithFiles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const crimeId = params.id as string;

  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        setLoading(true);
        
        // Fetch crime details
        const crimeResponse = await fetch(`/api/crimes/${crimeId}`);
        if (!crimeResponse.ok) {
          throw new Error('Crime not found');
        }
        const crimeResult = await crimeResponse.json();
        
        // Fetch related reports
        const reportsResponse = await fetch(`/api/reports?crime_id=${crimeId}`);
        const reportsResult = await reportsResponse.json();
        
        if (crimeResult.success) {
          const reports = reportsResult.success ? reportsResult.data : [];
          setCrimeData({
            crime: crimeResult.data,
            reports: reports
          });

          // Fetch files for each report
          const reportsWithFilesPromises = reports.map(async (report: Report) => {
            try {
              const filesResponse = await fetch(`/api/reports/${report.report_id}/files`);
              const filesResult = await filesResponse.json();
              
              return {
                ...report,
                files: filesResult.success ? filesResult.data : []
              };
            } catch (err) {
              console.error(`Failed to fetch files for report ${report.report_id}:`, err);
              return {
                ...report,
                files: []
              };
            }
          });

          const reportsWithFilesData = await Promise.all(reportsWithFilesPromises);
          setReportsWithFiles(reportsWithFilesData);
        } else {
          throw new Error(crimeResult.error || 'Failed to fetch crime data');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (crimeId) {
      fetchCrimeData();
    }
  }, [crimeId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-spin mx-auto mb-4 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm"></div>
          </div>
          <p className="text-gray-600">Cargando detalles del crimen...</p>
        </div>
      </div>
    );
  }

  if (error || !crimeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-red-600 text-2xl">⚠</div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Crimen no encontrado</h1>
          <p className="text-gray-600 mb-6">{error || 'El crimen solicitado no existe'}</p>
          <Link 
            href="/mapa" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Volver al mapa
          </Link>
        </div>
      </div>
    );
  }

  const { crime, reports } = crimeData;
  const sortedReports = reportsWithFiles.sort((a, b) => {
    const dateA = new Date(a.created_at || a.report_time || '');
    const dateB = new Date(b.created_at || b.report_time || '');
    return dateA.getTime() - dateB.getTime();
  });
  
  const firstReport = sortedReports[0];
  const latestReport = sortedReports[sortedReports.length - 1];
  const averagePriority = reports.reduce((sum, r) => sum + (r.priority_level || 0), 0) / reports.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full border-4 border-white shadow-lg flex-shrink-0"
                style={{ backgroundColor: getCrimeColor(crimeId) }}
              ></div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Crime-{crimeId.substring(0, 8)}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-lg">
                    {getCrimeTypeIcon(firstReport?.crime_category || 'unknown')}
                  </span>
                  <span className="text-gray-600">
                    {getCrimeTypeName(firstReport?.crime_category || 'unknown')}
                  </span>
                </div>
              </div>
            </div>
            <Link 
              href="/mapa" 
              className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              ← Volver al mapa
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Crime Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen del Crimen</h2>
              
              {crime.crime_summary ? (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{crime.crime_summary}</p>
                </div>
              ) : (
                <p className="text-gray-500 italic">Resumen generado automáticamente pendiente</p>
              )}

              {crime.followup_actions && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Acciones de Seguimiento</h3>
                  <p className="text-blue-800 text-sm">{crime.followup_actions}</p>
                </div>
              )}
            </div>

            {/* Reports Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Línea de Tiempo - {sortedReports.length} Reporte{sortedReports.length !== 1 ? 's' : ''}
              </h2>
              
              <div className="space-y-6">
                {sortedReports.map((report, index) => (
                  <div key={report.report_id} className="relative">
                    {/* Timeline line */}
                    {index < sortedReports.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-sm font-medium">#{index + 1}</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-900">
                                Reporte-{report.report_id.substring(0, 8)}
                              </span>
                              {report.priority_level && (
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  report.priority_level >= 4 
                                    ? 'bg-red-100 text-red-800'
                                    : report.priority_level >= 3
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  Prioridad {report.priority_level}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatReportTime(report.created_at || report.report_time)}
                            </span>
                          </div>
                          
                          {report.report_details && (
                            <p className="text-gray-700 text-sm mb-3">{report.report_details}</p>
                          )}
                          
                          {report.messages != null && (
                            <div className="text-xs text-gray-500 mb-3">
                              Mensajes de WhatsApp incluidos
                            </div>
                          )}

                          {/* File attachments */}
                          {report.files && report.files.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="text-xs text-gray-600 mb-2 font-medium">
                                Archivos adjuntos ({report.files.length})
                              </div>
                              
                              {/* Audio files first */}
                              {report.files
                                .filter(file => file.type === 'audio')
                                .map((file, fileIndex) => (
                                  <div key={`audio-${fileIndex}`} className="mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-lg">
                                        {file.extension === 'opus' ? '🎤' : '🎵'}
                                      </span>
                                      <span className="text-sm font-medium text-gray-700">
                                        {file.extension === 'opus' ? 'Mensaje de voz' : 'Audio'}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        ({file.extension.toUpperCase()} - {formatFileSize(file.size)})
                                      </span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                      <audio 
                                        controls 
                                        className="w-full"
                                        preload="none"
                                        crossOrigin="anonymous"
                                        style={{ height: '40px' }}
                                      >
                                        {/* OPUS files - try multiple approaches */}
                                        {file.extension === 'opus' && (
                                          <>
                                            {/* Try proxy API first (best for streaming) */}
                                            <source 
                                              src={`/api/files/${report.report_id}/${file.name.split('/').pop()}`}
                                              type="audio/ogg; codecs=opus" 
                                            />
                                            <source 
                                              src={`/api/files/${report.report_id}/${file.name.split('/').pop()}`}
                                              type="audio/ogg" 
                                            />
                                            {/* Fallback to direct storage */}
                                            <source 
                                              src={getDirectFileUrl(file.name)} 
                                              type="audio/ogg; codecs=opus" 
                                            />
                                            <source 
                                              src={getDirectFileUrl(file.name)} 
                                              type="audio/ogg" 
                                            />
                                          </>
                                        )}
                                        {/* MP3 files */}
                                        {file.extension === 'mp3' && (
                                          <>
                                            <source 
                                              src={getDirectFileUrl(file.name)} 
                                              type="audio/mpeg" 
                                            />
                                            <source 
                                              src={getFileUrl(report.report_id, file.name)} 
                                              type="audio/mpeg" 
                                            />
                                          </>
                                        )}
                                        {/* WAV files */}
                                        {file.extension === 'wav' && (
                                          <>
                                            <source 
                                              src={getDirectFileUrl(file.name)} 
                                              type="audio/wav" 
                                            />
                                            <source 
                                              src={getFileUrl(report.report_id, file.name)} 
                                              type="audio/wav" 
                                            />
                                          </>
                                        )}
                                        {/* M4A files */}
                                        {file.extension === 'm4a' && (
                                          <>
                                            <source 
                                              src={getDirectFileUrl(file.name)} 
                                              type="audio/mp4" 
                                            />
                                            <source 
                                              src={getFileUrl(report.report_id, file.name)} 
                                              type="audio/mp4" 
                                            />
                                          </>
                                        )}
                                        {/* OGG files */}
                                        {file.extension === 'ogg' && (
                                          <>
                                            <source 
                                              src={getDirectFileUrl(file.name)} 
                                              type="audio/ogg" 
                                            />
                                            <source 
                                              src={getFileUrl(report.report_id, file.name)} 
                                              type="audio/ogg" 
                                            />
                                          </>
                                        )}
                                        Tu navegador no soporta la reproducción de audio.
                                      </audio>
                                    </div>
                                  </div>
                                ))}

                              {/* Image files */}
                              {report.files
                                .filter(file => file.type === 'image')
                                .map((file, fileIndex) => (
                                  <div key={`image-${fileIndex}`} className="mb-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="text-lg">📷</span>
                                      <span className="text-sm font-medium text-gray-700">Imagen</span>
                                      <span className="text-xs text-gray-500">
                                        ({file.extension.toUpperCase()} - {formatFileSize(file.size)})
                                      </span>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                      <img 
                                        src={getFileUrl(report.report_id, file.name)}
                                        alt="Evidencia fotográfica"
                                        className="w-full max-w-sm h-auto rounded-lg shadow-sm"
                                        loading="lazy"
                                      />
                                    </div>
                                  </div>
                                ))}
                              
                              {/* Other file types as badges */}
                              <div className="flex flex-wrap gap-2">
                                {report.files
                                  .filter(file => file.type !== 'audio' && file.type !== 'image')
                                  .map((file, fileIndex) => (
                                    <div
                                      key={fileIndex}
                                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getFileTypeColor(file.type)}`}
                                    >
                                      <span className="text-sm">{getFileIcon(file.extension, file.type)}</span>
                                      <span className="uppercase">{file.extension || 'archivo'}</span>
                                      <span className="text-xs opacity-75">({formatFileSize(file.size)})</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Crime Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Estadísticas</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total reportes</span>
                  <span className="font-semibold text-gray-900">{reports.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Primer reporte</span>
                  <span className="font-semibold text-gray-900">
                    {formatReportTime(firstReport?.created_at || firstReport?.report_time)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Último reporte</span>
                  <span className="font-semibold text-gray-900">
                    {formatReportTime(latestReport?.created_at || latestReport?.report_time)}
                  </span>
                </div>
                
                {averagePriority > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Prioridad promedio</span>
                    <span className="font-semibold text-gray-900">
                      {averagePriority.toFixed(1)}/5
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estado</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Agrupado por IA
                  </span>
                </div>
              </div>
            </div>

            {/* Crime Timeline */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Información del Sistema</h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">ID del Crimen:</span>
                  <div className="font-mono text-xs text-gray-800 mt-1 break-all">
                    {crimeId}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600">Creado:</span>
                  <div className="text-gray-800 mt-1">
                    {formatReportTime(crime.created_at)}
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-600">Última actualización:</span>
                  <div className="text-gray-800 mt-1">
                    {formatReportTime(crime.updated_at)}
                  </div>
                </div>
                
                {crime.crime_type && (
                  <div>
                    <span className="text-gray-600">Tipo identificado:</span>
                    <div className="text-gray-800 mt-1">
                      {crime.crime_type}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}