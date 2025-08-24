"use client";

import Link from "next/link";
import { CrimeMap } from "@/components/map/crime-map";
import { StatisticsPanel } from "@/components/map/statistics-panel";
import { CrimeLegend } from "@/components/map/crime-legend";
import { useEffect, useState } from "react";

interface Report {
  report_id: string;
  longitude: number;
  latitude: number;
  crime_category: string;
  crime_id: string | null;
  report_time: string;
}

export default function MapaPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isPolling, setIsPolling] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchReports = async (isPollingRequest = false) => {
      try {
        if (isPollingRequest) setIsPolling(true);
        
        const response = await fetch('/api/reports');
        const result = await response.json();
        
        if (result.success && result.data) {
          setReports(result.data);
          setLastUpdate(new Date());
        }
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      } finally {
        if (isPollingRequest) setIsPolling(false);
      }
    };

    // Initial fetch
    fetchReports();

    // Set up polling every 10 seconds
    const pollInterval = setInterval(() => {
      fetchReports(true);
    }, 10000);

    return () => {
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mapa de crímenes en tiempo real
              </h1>
              <p className="mt-1 text-gray-600">
                Visualización interactiva de reportes agrupados por crimen
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm text-gray-700">En vivo</span>
              </div>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <StatisticsPanel 
          reports={reports} 
          lastUpdate={lastUpdate} 
          isPolling={isPolling} 
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <CrimeMap />
      </div>
      
      <CrimeLegend reports={reports} />
    </div>
  );
}