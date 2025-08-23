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
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Contacto y Soporte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Si tienes preguntas sobre cómo usar el sistema 
            o necesitas soporte técnico, no dudes en contactarnos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* WhatsApp Contact */}
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <span className="text-3xl mr-3">📱</span>
                  WhatsApp Oficial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-2xl font-bold text-green-700">
                    {WHATSAPP_NUMBER}
                  </div>
                  <p className="text-green-700">
                    Línea directa para reportes de crímenes y soporte técnico. 
                    Disponible 24/7 para emergencias.
                  </p>
                  <Button 
                    onClick={openWhatsApp}
                    variant="whatsapp"
                    className="w-full"
                  >
                    <span className="text-xl mr-2">💬</span>
                    Abrir Chat de WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <span className="text-3xl mr-3">🚨</span>
                  Contactos de Emergencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-red-800">
                  <div>
                    <div className="font-bold text-lg">Línea Nacional de Emergencias</div>
                    <div className="text-2xl font-bold">123</div>
                  </div>
                  <div>
                    <div className="font-bold">Policía Nacional</div>
                    <div className="text-lg">112</div>
                  </div>
                  <div>
                    <div className="font-bold">Fiscalía General de la Nación</div>
                    <div className="text-lg">(601) 570 2000</div>
                  </div>
                  <p className="text-sm text-red-600 border-t border-red-200 pt-4">
                    <strong>Importante:</strong> En situaciones de peligro inmediato, 
                    llama primero a estos números oficiales antes de usar nuestro sistema.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instructions and FAQ */}
          <div className="space-y-8">
            {/* How to Report */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-3xl mr-3">📋</span>
                  Instrucciones de Reporte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Al reportar por WhatsApp, incluye:</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <strong>Descripción clara</strong> del incidente
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <strong>Ubicación exacta</strong> (comparte tu ubicación)
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <strong>Fecha y hora</strong> del incidente
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <strong>Fotos o videos</strong> si es seguro tomarlos
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <strong>Categoría del crimen</strong> (opcional)
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Information */}
            <Card className="bg-blue-50 border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <span className="text-3xl mr-3">🔒</span>
                  Privacidad y Seguridad
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-800">
                <div className="space-y-3">
                  <p>
                    <strong>Tu identidad está protegida:</strong>
                  </p>
                  <ul className="space-y-2 text-blue-700">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      No guardamos números de teléfono
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      Reportes completamente anónimos
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      Datos encriptados y seguros
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">✓</span>
                      Solo ubicación general visible
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">
            ¿Listo para hacer tu reporte?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Tu reporte puede ayudar a prevenir más crímenes en tu comunidad
          </p>
          <Button
            onClick={openWhatsApp}
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 shadow-xl"
          >
            <span className="text-2xl mr-3">📱</span>
            Reportar por WhatsApp Ahora
          </Button>
        </div>
      </div>
    </section>
  );
}