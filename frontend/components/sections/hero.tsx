"use client";

import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function HeroSection() {
  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, quiero reportar un crimen. Por favor ayúdame.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
  };

  const scrollToHowItWorks = () => {
    const element = document.getElementById("como-funciona");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 sm:mb-10 lg:mb-12 leading-tight">
              Reporta Crímenes por{" "}
              <span className="text-green-600">WhatsApp</span>
              <br />
              en <span className="text-yellow-500">Colombia</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 mb-16 sm:mb-20 lg:mb-24 max-w-4xl mx-auto leading-relaxed">
            Sistema inteligente que agrupa reportes similares usando{" "}
            <span className="font-semibold text-purple-600">Inteligencia Artificial</span> y los visualiza en{" "}
            <span className="font-semibold text-blue-600">tiempo real</span> para crear{" "}
            <span className="font-semibold text-green-600">comunidades más seguras</span>
          </p>

          {/* WhatsApp Number Display */}
          <div className="mb-16 sm:mb-20 lg:mb-24 p-6 bg-green-50 border-2 border-green-200 rounded-2xl inline-block">
            <div className="text-green-700 font-medium mb-2">Número oficial de WhatsApp:</div>
            <div className="text-3xl font-bold text-green-800 flex items-center justify-center gap-3">
              <span className="text-4xl">📱</span>
              {WHATSAPP_NUMBER}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-20 sm:mb-24 lg:mb-28">
            <Button
              onClick={openWhatsApp}
              size="lg"
              variant="whatsapp"
              className="text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="text-2xl mr-3">📱</span>
              Reportar Crimen Ahora
            </Button>
            <Button
              onClick={() => window.location.href = '/mapa'}
              size="lg"
              variant="default"
              className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="mr-2">🗺️</span>
              Ver Mapa en Tiempo Real
            </Button>
            <Button
              onClick={scrollToHowItWorks}
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 hover:bg-blue-50 transition-all duration-300"
            >
              <span className="mr-2">ℹ️</span>
              ¿Cómo Funciona?
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Respuesta Rápida</h3>
              <p className="text-gray-600">Procesamiento en menos de 2 minutos</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-semibold text-gray-900 mb-2">IA Avanzada</h3>
              <p className="text-gray-600">Agrupación inteligente de reportes</p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Datos en Tiempo Real</h3>
              <p className="text-gray-600">Visualización actualizada constantemente</p>
            </div>
          </div>

          {/* Emergency Notice */}
          <div className="mt-16 sm:mt-20 lg:mt-24 p-4 sm:p-6 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
            <p className="text-red-800 font-medium">
              🚨 <strong>Emergencia:</strong> Si estás en peligro inmediato, llama al <strong>123</strong> o contacta a la Policía Nacional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}