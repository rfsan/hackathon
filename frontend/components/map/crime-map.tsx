"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getCrimeColor, getCrimeTypeIcon, getCrimeTypeName, formatReportTime } from "@/lib/crime-data";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

export function CrimeMap() {
  // Test basic Supabase connection step by step
  const [reports, setReports] = useState([
    {
      report_id: '1',
      longitude: -74.0721,
      latitude: 4.7110,
      crime_category: 'robo_personas',
      crime_id: 'crime-001',
      report_time: '2024-08-23T10:30:00Z'
    },
    {
      report_id: '2',
      longitude: -74.0690,
      latitude: 4.7200,
      crime_category: 'hurto_vehiculos',
      crime_id: null,
      report_time: '2024-08-23T11:15:00Z'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isPolling, setIsPolling] = useState(false);

  // Fetch data from our API route with 30-second polling
  useEffect(() => {
    const fetchReports = async (isPollingRequest = false) => {
      try {
        if (!isPollingRequest) setLoading(true)
        if (isPollingRequest) setIsPolling(true)
        
        console.log(isPollingRequest ? '🔄 Polling for updates...' : 'Fetching reports from API...')
        
        const response = await fetch('/api/reports')
        const result = await response.json()
        
        if (result.success && result.data) {
          const previousCount = reports.length
          const newCount = result.data.length
          
          setReports(result.data)
          setLastUpdate(new Date())
          
          if (isPollingRequest && newCount > previousCount) {
            console.log('🆕 New reports detected!', `${previousCount} → ${newCount}`)
          } else {
            console.log('✅ Successfully loaded', result.data.length, 'reports')
          }
        } else {
          throw new Error(result.error || 'Failed to fetch reports')
        }
      } catch (err) {
        console.error('❌ Failed to fetch reports:', err)
        if (!isPollingRequest) {
          setError(err instanceof Error ? err.message : 'Unknown error')
        }
        // Keep existing data on polling errors
      } finally {
        if (!isPollingRequest) setLoading(false)
        if (isPollingRequest) setIsPolling(false)
      }
    }

    // Initial fetch
    fetchReports()

    // Set up polling every 30 seconds
    const pollInterval = setInterval(() => {
      fetchReports(true)
    }, 10000)

    // Cleanup interval on unmount
    return () => {
      clearInterval(pollInterval)
    }
  }, []); // Empty dependency array - we want this to run once and set up polling
  const [hoveredPoint, setHoveredPoint] = useState<{
    longitude: number;
    latitude: number;
    report_time: string;
    x: number;
    y: number;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMarkerMouseOver = (point: {longitude: number; latitude: number; report_time: string}, event: {target: {_container?: {getBoundingClientRect: () => DOMRect}}; originalEvent?: {clientX: number; clientY: number}}) => {
    const rect = event.target._container?.getBoundingClientRect();
    if (rect) {
      setHoveredPoint({
        longitude: point.longitude,
        latitude: point.latitude,
        report_time: point.report_time,
        x: (event.originalEvent?.clientX ?? 0) - rect.left,
        y: (event.originalEvent?.clientY ?? 0) - rect.top
      });
    }
  };

  const handleMarkerMouseOut = () => {
    setHoveredPoint(null);
  };

  // Create custom marker HTML with icon and color
  const createCustomMarker = (point: {crime_id?: string | null; crime_category: string}) => {
    const color = getCrimeColor(point.crime_id ?? null);
    const icon = getCrimeTypeIcon(point.crime_category);
    const size = point.crime_id ? 44 : 36;
    
    return {
      html: `
        <div class="crime-marker-wrapper" style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
        ">
          <div class="crime-marker-pulse" style="
            position: absolute;
            top: 0;
            left: 0;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            opacity: 0.3;
            animation: pulse 2s infinite;
          "></div>
          <div class="crime-marker-main" style="
            position: relative;
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
            border: 3px solid white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${size * 0.45}px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.25), 0 2px 10px rgba(0,0,0,0.15);
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
          ">
            ${icon}
          </div>
        </div>
      `,
      iconSize: [size, size] as [number, number],
      iconAnchor: [size / 2, size / 2] as [number, number]
    };
  };

  if (!isClient || loading) {
    return (
      <div className="relative flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="text-center z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
            <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
          </div>
          <div className="text-gray-700 text-xl font-medium">Cargando Mapa de Crímenes</div>
          <div className="text-gray-500 text-sm mt-2">
            {loading ? 'Conectando con base de datos...' : 'Preparando visualización en tiempo real...'}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex-1 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-2xl flex items-center justify-center overflow-hidden">
        <div className="text-center z-10">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <div className="text-red-700 text-xl font-medium">Error al cargar datos</div>
          <div className="text-red-600 text-sm mt-2">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1">
      <MapContainer
        center={[4.5709, -74.297]} // Colombia center
        zoom={10}
        minZoom={5}
        maxZoom={18}
        className="w-full h-[calc(100vh-140px)] rounded-xl shadow-2xl z-0 overflow-hidden border border-gray-200"
        style={{ height: "calc(100vh - 140px)" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {reports.map((point, index) => {
          const markerConfig = createCustomMarker(point);
          let L: typeof import('leaflet') | null = null;
          if (typeof window !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            L = require('leaflet');
          }
          
          const customIcon = L ? L.divIcon({
            html: markerConfig.html,
            className: 'custom-crime-marker',
            iconSize: markerConfig.iconSize,
            iconAnchor: markerConfig.iconAnchor,
          }) : null;

          return customIcon ? (
            <Marker
              key={index}
              position={[point.latitude, point.longitude]}
              icon={customIcon}
              eventHandlers={{
                mouseover: (e) => handleMarkerMouseOver(point, e),
                mouseout: handleMarkerMouseOut,
              }}
            >
              <Popup className="custom-popup">
                <div className="p-4 min-w-[240px] bg-gradient-to-br from-white to-gray-50">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 text-2xl shadow-sm">
                      {getCrimeTypeIcon(point.crime_category)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg leading-tight">
                        {point.crime_id ? `Crime-${point.crime_id.substring(0, 8)}` : 'Sin Agrupar'}
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        {point.crime_id ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Agrupado por IA
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            Pendiente
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-600">📋</span>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Tipo</span>
                        <div className="text-sm font-medium text-gray-900">{getCrimeTypeName(point.crime_category)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-green-600">🕐</span>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Reportado</span>
                        <div className="text-sm font-medium text-gray-900">{formatReportTime(point.report_time)}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-red-600">📍</span>
                      <div>
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">Ubicación</span>
                        <div className="text-sm font-medium text-gray-900">{point.latitude.toFixed(4)}°N, {Math.abs(point.longitude).toFixed(4)}°W</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ) : null;
        })}
      </MapContainer>
      
      {/* Hover Tooltip */}
      {hoveredPoint && (
        <div 
          className="absolute z-[1000] bg-gradient-to-r from-gray-900 to-black text-white text-sm rounded-lg px-4 py-3 pointer-events-none shadow-2xl border border-gray-700 backdrop-blur-sm"
          style={{
            left: hoveredPoint.x + 15,
            top: hoveredPoint.y - 15,
            transform: "translateY(-100%)"
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <div className="font-medium text-green-200">Reportado</div>
          </div>
          <div className="text-white font-semibold">{formatReportTime(hoveredPoint.report_time)}</div>
          <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-900 rotate-45 border-r border-b border-gray-700"></div>
        </div>
      )}
      
      

    </div>
  );
}