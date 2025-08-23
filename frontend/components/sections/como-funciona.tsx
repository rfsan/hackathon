import { Card, CardContent } from "@/components/ui/card";
import { PROCESS_STEPS } from "@/lib/constants";

export function ComoFuncionaSection() {
  return (
    <section id="como-funciona" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo Funciona el Sistema?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestro proceso es simple, rápido y completamente seguro. En solo 4 pasos, 
            tu reporte se convierte en información valiosa para toda la comunidad.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connecting Line */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 transform -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              )}
              
              <Card className="relative z-10 h-full hover:shadow-lg transition-shadow duration-300 bg-white border-2 border-gray-100 hover:border-blue-200">
                <CardContent className="p-6 text-center">
                  {/* Step Number */}
                  <div className="mb-4 relative">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-4">{step.icon}</div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Tecnología de Vanguardia
              </h3>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-start">
                  <div className="text-2xl mr-3">🎯</div>
                  <div>
                    <strong>Geolocalización Precisa:</strong> Utilizamos PostGIS para análisis espacial avanzado
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">🧠</div>
                  <div>
                    <strong>Inteligencia Artificial:</strong> OpenRouter analiza el contenido y agrupa reportes similares
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">⚡</div>
                  <div>
                    <strong>Tiempo Real:</strong> Supabase Realtime para actualizaciones instantáneas
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-2xl mr-3">🔐</div>
                  <div>
                    <strong>Seguridad Garantizada:</strong> Políticas de seguridad a nivel de fila (RLS)
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                ¿Por qué es tan efectivo?
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Agrupa reportes relacionados automáticamente
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Identifica patrones criminales en tiempo real
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Facilita la respuesta coordinada de autoridades
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Mantiene el anonimato de los reportantes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}