# DaniDenuncia - Frontend

## 🎯 Descripción
Landing page responsive en español para el sistema de reportes de crímenes por WhatsApp. Construida con Next.js 14, Tailwind CSS y componentes shadcn/ui.

## ✨ Características
- **Completamente en Español**: Diseñada para usuarios colombianos
- **Totalmente Responsive**: Optimizada para móvil, tablet y desktop
- **Sin Autenticación**: Página de información únicamente
- **Animaciones Fluidas**: Contadores animados y transiciones suaves
- **SEO Optimizada**: Metadata completa para motores de búsqueda
- **Accesible**: Cumple estándares WCAG

## 🚀 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo - Abrir http://localhost:3000
npm run dev

# Construcción
npm run build

# Iniciar servidor de producción
npm start

# Linting
npm run lint
```

## 🏗️ Arquitectura

### Secciones de la Landing Page
1. **Hero Section** - Introducción principal con CTA de WhatsApp
2. **Cómo Funciona** - Proceso de 4 pasos explicado visualmente
3. **Categorías de Crímenes** - 10 tipos de crímenes colombianos
4. **Estadísticas** - Métricas del sistema con contadores animados
5. **Contacto** - Información de WhatsApp y emergencias
6. **Footer** - Enlaces, tecnologías y contactos de emergencia

### Stack Tecnológico
- **Framework**: Next.js 14 con App Router
- **Estilos**: Tailwind CSS
- **Componentes**: shadcn/ui (Button, Card, etc.)
- **Fuentes**: Geist Sans & Geist Mono
- **Idioma**: Español (Colombia)

## 📱 Funcionalidades

### Interacciones WhatsApp
- Botones que abren WhatsApp con mensajes pre-escritos
- Número de teléfono configurable en constantes
- Mensajes personalizados por categoría de crimen

### Navegación
- Navbar fijo con smooth scroll
- Menú hamburguesa responsivo
- Enlaces internos a secciones

### Animaciones
- Contadores animados en estadísticas
- Hover effects en tarjetas
- Transiciones suaves
- Animación de pulso en indicadores en vivo

## 🔧 Configuración

### Configuración de WhatsApp
Editar `lib/constants.ts`:
```typescript
export const WHATSAPP_NUMBER = "+57 300 123 4567";
```

## 📁 Estructura de Archivos

```
frontend/
├── app/
│   ├── globals.css        # Estilos globales y variables CSS
│   ├── layout.tsx         # Layout principal con metadata
│   └── page.tsx          # Página principal que combina todas las secciones
├── components/
│   ├── ui/               # Componentes shadcn/ui (Button, Card)
│   ├── sections/         # Secciones de la landing page
│   │   ├── hero.tsx
│   │   ├── como-funciona.tsx
│   │   ├── categorias.tsx
│   │   ├── estadisticas.tsx
│   │   └── contacto.tsx
│   └── common/           # Componentes comunes
│       ├── navbar.tsx
│       └── footer.tsx
├── lib/
│   ├── utils.ts          # Utilidades (cn function)
│   └── constants.ts      # Constantes de la aplicación
└── public/               # Archivos estáticos de Next.js
```

## 🌐 SEO y Metadata

### Configuración Actual
```typescript
title: "DaniDenuncia | Reporta Crímenes por WhatsApp"
description: "Sistema inteligente de reportes de crímenes por WhatsApp para Colombia..."
locale: "es_CO"
keywords: "reportar crimen colombia, whatsapp crimen, seguridad ciudadana..."
```

## 📱 Responsive Features

### Móvil
- Menú hamburguesa
- Botones touch-friendly (44px mínimo)
- Grid adaptativo de 1 columna
- Texto optimizado sin zoom

### Desktop
- Grid completo (4-5 columnas)
- Hover effects completos
- Navegación completa visible

## 🚀 Deploy en Vercel

1. Conectar repositorio de GitHub a Vercel
2. Configurar dominio personalizado (opcional)
3. Deploy automático en cada push

**Construido con ❤️ para comunidades más seguras en Colombia**
