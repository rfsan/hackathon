"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STATISTICS } from "@/lib/constants";

// Simple counter animation hook
function useCountUp(end: string, duration: number = 2000) {
  const [count, setCount] = useState("0");
  
  useEffect(() => {
    // Check if the value is numeric
    const numericValue = parseInt(end.replace(/[^0-9]/g, ""));
    if (isNaN(numericValue)) {
      setCount(end);
      return;
    }

    let startTime: number;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const currentValue = Math.floor(progress * numericValue);
      
      // Handle special formatting
      if (end.includes(",")) {
        setCount(currentValue.toLocaleString());
      } else if (end.includes("%")) {
        setCount(`${currentValue}%`);
      } else if (end.includes("min")) {
        setCount(`< ${Math.max(1, Math.floor(currentValue / 500))} min`);
      } else {
        setCount(currentValue.toString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration]);

  return count;
}

function StatCard({ stat }: { stat: typeof STATISTICS[0] }) {
  const animatedValue = useCountUp(stat.value);

  return (
    <Card className="text-center hover:shadow-xl transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50 border-2 border-blue-100 hover:border-blue-300">
      <CardHeader className="pb-2">
        <div className="text-4xl font-bold text-blue-600 mb-2">
          {animatedValue}
        </div>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {stat.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm">
          {stat.description}
        </p>
      </CardContent>
    </Card>
  );
}

export function EstadisticasSection() {
  return (
    <section id="estadisticas" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Resultados en Tiempo Real
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro sistema ya está funcionando y generando impacto real en la seguridad ciudadana. 
            Estos números se actualizan automáticamente.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {STATISTICS.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="text-3xl mr-3">📈</span>
                Impacto Comprobado
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mr-4">🎯</div>
                  <div>
                    <div className="font-semibold text-green-800">Mayor Precisión</div>
                    <div className="text-green-600 text-sm">Identificación exacta de patrones criminales</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mr-4">⚡</div>
                  <div>
                    <div className="font-semibold text-blue-800">Respuesta Rápida</div>
                    <div className="text-blue-600 text-sm">Procesamiento automático en tiempo real</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl mr-4">🤝</div>
                  <div>
                    <div className="font-semibold text-purple-800">Colaboración Ciudadana</div>
                    <div className="text-purple-600 text-sm">Participación activa de la comunidad</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl p-8 text-white">
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <span className="text-3xl mr-3">🚀</span>
                Próximas Mejoras
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <div>
                    <div className="font-medium">Análisis Predictivo</div>
                    <div className="text-gray-300 text-sm">Predicción de patrones criminales</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <div>
                    <div className="font-medium">Integración con Autoridades</div>
                    <div className="text-gray-300 text-sm">Conexión directa con sistemas policiales</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <div>
                    <div className="font-medium">App Móvil Nativa</div>
                    <div className="text-gray-300 text-sm">Aplicación dedicada para iOS y Android</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-3 mt-1">•</span>
                  <div>
                    <div className="font-medium">Alertas Personalizadas</div>
                    <div className="text-gray-300 text-sm">Notificaciones por zona geográfica</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Updates Indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center px-6 py-3 bg-green-100 border border-green-300 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
            <span className="text-green-800 font-medium">
              Sistema activo - Actualizaciones en tiempo real
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}