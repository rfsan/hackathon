"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CRIME_CATEGORIES, WHATSAPP_NUMBER } from "@/lib/constants";

export function CategoriasSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const reportCrime = (categoryName: string) => {
    const message = encodeURIComponent(
      `Hola, quiero reportar un crimen de tipo: ${categoryName}. 
      
Por favor ayúdame con el proceso de reporte.`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
  };

  return (
    <section id="categorias" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tipos de Crímenes que Puedes Reportar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Basado en las estadísticas oficiales de la Policía Nacional de Colombia. 
            Selecciona la categoría que mejor describe tu situación.
          </p>
        </div>

        {/* Crime Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {CRIME_CATEGORIES.map((category) => (
            <Card 
              key={category.id}
              className={`relative overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-2 ${
                hoveredCategory === category.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
              }`}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => reportCrime(category.name)}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative z-10 text-center pb-2">
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 leading-tight">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10 text-center pt-0">
                <CardDescription className="text-sm text-gray-600 leading-relaxed mb-4">
                  {category.description}
                </CardDescription>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-500 hover:text-white hover:border-green-500"
                >
                  Reportar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Information */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                📊 Estadísticas de Criminalidad en Colombia
              </h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Robo a personas:</strong> Representa el 35% de todos los delitos reportados</p>
                <p><strong>Hurto de vehículos:</strong> 18% de los casos, especialmente en zonas urbanas</p>
                <p><strong>Violencia doméstica:</strong> 15% con tendencia creciente en reportes</p>
                <p><strong>Otros delitos:</strong> 32% distribuidos en las demás categorías</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">⚠️</span>
                Información Importante
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Los reportes se procesan automáticamente con IA
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Puedes adjuntar fotos, videos y ubicación
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  La IA agrupa automáticamente casos similares
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">•</span>
                  Los datos se visualizan en tiempo real
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No encuentras tu tipo de crimen?
          </h3>
          <p className="text-gray-600 mb-6">
            No te preocupes, puedes reportar cualquier tipo de delito. Nuestro sistema se adapta a todas las situaciones.
          </p>
          <Button
            onClick={() => reportCrime("Otro tipo de crimen")}
            size="lg"
            variant="whatsapp"
            className="shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <span className="text-xl mr-2">📱</span>
            Reportar Otro Tipo de Crimen
          </Button>
        </div>
      </div>
    </section>
  );
}