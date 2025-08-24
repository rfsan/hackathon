"use client";

import { useRouter } from "next/navigation";
import { getCrimeColor, getCrimeTypeIcon, getCrimeTypeName, formatReportTime } from "@/lib/crime-data";

interface Report {
  report_id: string;
  longitude: number;
  latitude: number;
  crime_category: string;
  crime_id: string | null;
  report_time: string;
}

interface CrimeLegendProps {
  reports: Report[];
}

export function CrimeLegend({ reports }: CrimeLegendProps) {
  const router = useRouter();

  // Group reports by crime_id and calculate stats
  const crimeStats = reports
    .filter(report => report.crime_id) // Only include reports with crime_id
    .reduce((acc, report) => {
      const crimeId = report.crime_id!;
      if (!acc[crimeId]) {
        acc[crimeId] = {
          crimeId,
          type: report.crime_category,
          reports: [],
          lastReport: report.report_time
        };
      }
      acc[crimeId].reports.push(report);
      
      // Update last report if this one is more recent
      if (new Date(report.report_time) > new Date(acc[crimeId].lastReport)) {
        acc[crimeId].lastReport = report.report_time;
      }
      
      return acc;
    }, {} as Record<string, {
      crimeId: string;
      type: string;
      reports: Report[];
      lastReport: string;
    }>);

  const crimeList = Object.values(crimeStats).sort((a, b) => 
    new Date(b.lastReport).getTime() - new Date(a.lastReport).getTime()
  );

  const handleCrimeClick = (crimeId: string) => {
    router.push(`/crime/${crimeId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Crímenes Detectados</h2>
          <p className="text-sm text-gray-600 mt-1">
            Crímenes agrupados por inteligencia artificial - Haz clic para ver detalles
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Crimen ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número de Reportes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Último Reporte
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {crimeList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No hay crímenes detectados aún
                  </td>
                </tr>
              ) : (
                crimeList.map((crime) => (
                  <tr
                    key={crime.crimeId}
                    onClick={() => handleCrimeClick(crime.crimeId)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full border-2 border-white shadow-sm mr-3 flex-shrink-0"
                          style={{ backgroundColor: getCrimeColor(crime.crimeId) }}
                        ></div>
                        <div className="text-sm font-medium text-gray-900">
                          Crime-{crime.crimeId.substring(0, 8)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-lg mr-2 flex-shrink-0">
                          {getCrimeTypeIcon(crime.type)}
                        </span>
                        <span className="text-sm text-gray-900">
                          {getCrimeTypeName(crime.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {crime.reports.length} reporte{crime.reports.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatReportTime(crime.lastReport)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {crimeList.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Mostrando {crimeList.length} crimen{crimeList.length !== 1 ? 'es' : ''} detectado{crimeList.length !== 1 ? 's' : ''} por IA
            </p>
          </div>
        )}
      </div>
    </div>
  );
}