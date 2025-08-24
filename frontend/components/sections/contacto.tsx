"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function ContactoSection() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, tengo una pregunta sobre el sistema de reportes de crímenes.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-2xl">📞</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-6">
            Contacto y Soporte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para ayudarte las <span className="font-semibold text-blue-600">24 horas del día</span>. 
            Si tienes preguntas sobre cómo usar el sistema o necesitas soporte técnico, 
            <span className="font-semibold text-purple-600"> no dudes en contactarnos</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* WhatsApp Contact */}
            <Card className="border border-gray-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -mr-16 -mt-16 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gray-50 rounded-full -ml-10 -mb-10 opacity-40"></div>
              
              <CardHeader className="relative">
                <CardTitle className="flex items-center text-gray-800">
                  <div className="p-3 bg-green-100 rounded-full mr-4 shadow-md">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold">WhatsApp Oficial</div>
                    <div className="text-sm text-gray-600 font-normal">Canal principal de reportes</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="text-3xl font-bold text-gray-800 text-center tracking-wide">
                      {WHATSAPP_NUMBER}
                    </div>
                  </div>
                  <p className="text-gray-700 text-center">
                    <span className="font-semibold">Línea directa</span> para reportes de crímenes y soporte técnico.<br/>
                    <span className="inline-flex items-center gap-1 text-sm mt-2 text-gray-600">
                      🕐 <strong>Disponible 24/7</strong> para emergencias
                    </span>
                  </p>
                  <Button 
                    onClick={openWhatsApp}
                    variant="whatsapp"
                    className="w-full py-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    <span className="text-xl mr-2">💬</span>
                    Abrir Chat de WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="border border-gray-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-gray-100 rounded-full -mr-14 -mt-14 opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-50 rounded-full -ml-12 -mb-12 opacity-40"></div>
              
              <CardHeader className="relative">
                <CardTitle className="flex items-center text-gray-800">
                  <div className="p-3 bg-red-100 rounded-full mr-4 shadow-md animate-pulse">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold">Contactos de Emergencia</div>
                    <div className="text-sm text-gray-600 font-normal">Para peligro inmediato</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4 text-gray-800">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="font-bold text-lg mb-1">Línea Nacional de Emergencias</div>
                    <div className="text-4xl font-black text-red-600 tracking-wider">123</div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="font-bold text-sm">Policía Nacional</div>
                      <div className="text-2xl font-bold text-gray-800">112</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="font-bold text-sm">Fiscalía General</div>
                      <div className="text-lg font-bold text-gray-800">(601) 570 2000</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-red-400">
                    <p className="text-sm text-gray-700">
                      <strong>⚠️ Importante:</strong> En situaciones de peligro inmediato, 
                      llama primero a estos números oficiales antes de usar nuestro sistema.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions and FAQ */}
          <div className="space-y-8">
            {/* How to Report */}
            <Card className="border border-gray-200 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -mr-16 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-50 rounded-full -ml-12 -mb-12 opacity-30"></div>
              
              <CardHeader className="relative">
                <CardTitle className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full mr-4 shadow-md">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-800">Instrucciones de Reporte</div>
                    <div className="text-sm text-gray-600 font-normal">Guía paso a paso</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center">
                      <span className="text-lg mr-2">📱</span>
                      Al reportar por WhatsApp, incluye:
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start bg-white rounded-lg p-3 border border-gray-100">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold text-gray-700">1</span>
                        </div>
                        <div>
                          <strong className="text-gray-900">Descripción clara</strong> del incidente
                          <div className="text-sm text-gray-500 mt-1">¿Qué pasó exactamente?</div>
                        </div>
                      </li>
                      <li className="flex items-start bg-white rounded-lg p-3 border border-gray-100">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold text-gray-700">2</span>
                        </div>
                        <div>
                          <strong className="text-gray-900">Ubicación exacta</strong> (comparte tu ubicación)
                          <div className="text-sm text-gray-500 mt-1">📍 Usa la función de ubicación de WhatsApp</div>
                        </div>
                      </li>
                      <li className="flex items-start bg-white rounded-lg p-3 border border-gray-100">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold text-gray-700">3</span>
                        </div>
                        <div>
                          <strong className="text-gray-900">Fecha y hora</strong> del incidente
                          <div className="text-sm text-gray-500 mt-1">🕐 ¿Cuándo ocurrió?</div>
                        </div>
                      </li>
                      <li className="flex items-start bg-white rounded-lg p-3 border border-gray-100">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold text-gray-700">4</span>
                        </div>
                        <div>
                          <strong className="text-gray-900">Fotos o videos</strong> si es seguro tomarlos
                          <div className="text-sm text-gray-500 mt-1">📸 Solo si no hay riesgo para ti</div>
                        </div>
                      </li>
                      <li className="flex items-start bg-white rounded-lg p-3 border border-gray-100">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-sm font-bold text-gray-700">5</span>
                        </div>
                        <div>
                          <strong className="text-gray-900">Categoría del crimen</strong> (opcional)
                          <div className="text-sm text-gray-500 mt-1">🏷️ Robo, violencia, vandalismo, etc.</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center relative">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-20 -mt-20"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mb-16"></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -ml-12 -mt-12"></div>
            </div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6 shadow-lg">
                <span className="text-3xl">🚀</span>
              </div>
              
              <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                ¿Listo para hacer tu reporte?
              </h3>
              
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Tu reporte puede ayudar a <span className="font-semibold">prevenir más crímenes</span> en tu comunidad 
                y crear un <span className="font-semibold">entorno más seguro</span> para todos
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={openWhatsApp}
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-10 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 font-semibold"
                >
                  <span className="text-2xl mr-3">📱</span>
                  Reportar por WhatsApp Ahora
                </Button>
                
                <Button
                  onClick={() => window.location.href = '/mapa'}
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <span className="text-xl mr-2">🗺️</span>
                  Ver Mapa de Crímenes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}