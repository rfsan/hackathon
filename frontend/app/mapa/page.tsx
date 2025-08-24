"use client";

import Link from "next/link";
import { CrimeMap } from "@/components/map/crime-map";

export default function MapaPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Mapa de crímenes en tiempo real
              </h1>
              <p className="mt-1 text-gray-600">
                Visualización interactiva de reportes agrupados por crimen
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm text-gray-700">En vivo</span>
              </div>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <CrimeMap />
    </div>
  );
}