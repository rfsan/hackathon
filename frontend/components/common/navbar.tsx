"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hola, quiero reportar un crimen.");
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain mr-1" />
            <div className="text-2xl font-bold text-primary-700">
              DaniDenuncia
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Inicio
            </Link>
            <a
              href="/mapa"
              className="text-gray-700 hover:text-primary-600 transition-colors font-medium"
            >
              🗺️ Mapa en Vivo
            </a>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Cómo Funciona
            </button>
            <button
              onClick={() => scrollToSection("categorias")}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Categorías
            </button>
            <button
              onClick={() => scrollToSection("estadisticas")}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Estadísticas
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Contacto
            </button>
            <Button 
              variant="whatsapp" 
              size="sm"
              onClick={openWhatsApp}
              className="ml-4"
            >
              📱 Reportar Ahora
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 transition-colors"
              aria-label="Abrir menú"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                href="/"
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Inicio
              </Link>
              <a
                href="/mapa"
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors font-medium"
              >
                🗺️ Mapa en Vivo
              </a>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Cómo Funciona
              </button>
              <button
                onClick={() => scrollToSection("categorias")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Categorías
              </button>
              <button
                onClick={() => scrollToSection("estadisticas")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Estadísticas
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Contacto
              </button>
              <div className="px-3 py-2">
                <Button 
                  variant="whatsapp" 
                  size="sm"
                  onClick={openWhatsApp}
                  className="w-full"
                >
                  📱 Reportar Ahora
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}