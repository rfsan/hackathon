"use client";

import { getCrimeTypeName } from "@/lib/crime-data";

interface Report {
  report_id: string;
  longitude: number;
  latitude: number;
  crime_category: string;
  crime_id: string | null;
  report_time: string;
}

interface StatisticsPanelProps {
  reports: Report[];
  lastUpdate: Date;
  isPolling: boolean;
}

export function StatisticsPanel({ reports, lastUpdate, isPolling }: StatisticsPanelProps) {
  // Calculate most reported crime type
  const crimeTypeCounts = reports.reduce((acc, report) => {
    acc[report.crime_category] = (acc[report.crime_category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostReportedCrimeType = Object.entries(crimeTypeCounts)
    .sort(([, a], [, b]) => b - a)[0];


  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Estadísticas en Tiempo Real</h2>
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <div className={`w-2 h-2 rounded-full ${isPolling ? 'bg-blue-400 animate-ping' : 'bg-green-400 animate-pulse'}`}></div>
          <span className="text-sm text-gray-600">
            {isPolling ? 'Actualizando...' : `Actualizado: ${lastUpdate.toLocaleTimeString()}`}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Total Reports */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 rounded-xl border border-blue-200">
          <div className="text-gray-700 font-medium mb-2">Total reportes</div>
          <div className="text-3xl sm:text-4xl font-bold text-blue-600">
            {reports.length}
          </div>
        </div>

        {/* Crime IDs Detected */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 sm:p-6 rounded-xl border border-green-200">
          <div className="text-gray-700 font-medium mb-2">Crímenes detectados</div>
          <div className="text-3xl sm:text-4xl font-bold text-green-600">
            {new Set(reports.filter(d => d.crime_id).map(d => d.crime_id)).size}
          </div>
        </div>

        {/* Most Reported Crime Type */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 sm:p-6 rounded-xl border border-purple-200 sm:col-span-2 lg:col-span-1">
          <div className="text-gray-700 font-medium mb-2">Más reportado</div>
          <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
            {mostReportedCrimeType ? mostReportedCrimeType[1] : 0}
          </div>
          <div className="text-sm text-purple-600 truncate">
            {mostReportedCrimeType ? getCrimeTypeName(mostReportedCrimeType[0]) : 'N/A'}
          </div>
        </div>

      </div>
    </div>
  );
}