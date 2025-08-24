"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCrimeColor, getCrimeTypeIcon, getCrimeTypeName, formatReportTime } from "@/lib/crime-data";

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

export default function CrimeDetailPage() {
  const params = useParams();
  const [crimeData, setCrimeData] = useState<CrimeData | null>(null);
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
          setCrimeData({
            crime: crimeResult.data,
            reports: reportsResult.success ? reportsResult.data : []
          });
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
  const sortedReports = reports.sort((a, b) => {
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
                Línea de Tiempo - {reports.length} Reporte{reports.length !== 1 ? 's' : ''}
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
                            <div className="text-xs text-gray-500">
                              Mensajes de WhatsApp incluidos
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