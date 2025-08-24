"use client";

import { WHATSAPP_NUMBER } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain mr-1" />
              <span className="text-2xl font-bold">DaniDenuncia</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Sistema inteligente de reportes de crímenes por WhatsApp para Colombia. 
              Utilizamos inteligencia artificial para agrupar reportes similares y 
              crear visualizaciones en tiempo real que ayudan a las autoridades 
              y mantienen informada a la comunidad.
            </p>
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 px-4 py-2 rounded-lg">
                <div className="text-sm opacity-90">WhatsApp Oficial</div>
                <div className="font-bold">{WHATSAPP_NUMBER}</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => document.getElementById('inicio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cómo Funciona
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tipos de Crímenes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('estadisticas')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Estadísticas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergencias</h3>
            <ul className="space-y-3">
              <li>
                <div className="text-gray-300">
                  <div className="font-medium">Línea Nacional</div>
                  <div className="text-xl font-bold text-red-400">123</div>
                </div>
              </li>
              <li>
                <div className="text-gray-300">
                  <div className="font-medium">Policía Nacional</div>
                  <div className="text-lg font-bold">112</div>
                </div>
              </li>
              <li>
                <div className="text-gray-300">
                  <div className="font-medium">Fiscalía General</div>
                  <div className="text-sm">(601) 570 2000</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-4">Construido con Tecnología de Vanguardia</h3>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Next.js
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Supabase
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                OpenRouter AI
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                N8N
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-black rounded-full mr-2"></span>
                Vercel
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                PostGIS
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2024 DaniDenuncia. Construido con ❤️ para comunidades más seguras.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Este es un proyecto de demostración tecnológica. No está afiliado con entidades gubernamentales.
              </p>
            </div>
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="text-xs">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Sistema Activo
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}