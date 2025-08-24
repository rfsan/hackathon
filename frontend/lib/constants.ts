export const WHATSAPP_NUMBER = "+57 313 426 9391";

export const CRIME_CATEGORIES = [
  {
    id: "robo_personas",
    name: "Robo a Personas",
    description: "Hurto o robo con violencia contra las personas",
    icon: "👤"
  },
  {
    id: "hurto_vehiculos",
    name: "Hurto de Vehículos",
    description: "Robo de automóviles y otros vehículos",
    icon: "🚗"
  },
  {
    id: "hurto_motocicletas",
    name: "Hurto de Motocicletas",
    description: "Robo específico de motocicletas y motonetas",
    icon: "🏍️"
  },
  {
    id: "violencia_domestica",
    name: "Violencia Doméstica",
    description: "Agresiones y violencia en el ámbito familiar",
    icon: "🏠"
  },
  {
    id: "homicidio",
    name: "Homicidio",
    description: "Crímenes contra la vida humana",
    icon: "⚰️"
  },
  {
    id: "lesiones_personales",
    name: "Lesiones Personales",
    description: "Agresiones físicas y heridas intencionales",
    icon: "🩹"
  },
  {
    id: "delitos_sexuales",
    name: "Delitos Sexuales",
    description: "Agresiones y delitos de carácter sexual",
    icon: "⚠️"
  },
  {
    id: "extorsion",
    name: "Extorsión",
    description: "Chantaje y amenazas por dinero",
    icon: "💰"
  },
  {
    id: "hurto_residencial",
    name: "Hurto Residencial",
    description: "Robo en viviendas y residencias",
    icon: "🏘️"
  },
  {
    id: "hurto_comercial",
    name: "Hurto Comercial",
    description: "Robo en establecimientos comerciales",
    icon: "🏪"
  }
];

export const STATISTICS = [
  {
    value: "1,234",
    label: "Reportes Procesados",
    description: "Total de reportes recibidos por WhatsApp"
  },
  {
    value: "567",
    label: "Crímenes Agrupados",
    description: "Incidentes identificados por IA"
  },
  {
    value: "< 2 min",
    label: "Tiempo de Procesamiento",
    description: "Velocidad promedio de análisis"
  },
  {
    value: "95%",
    label: "Precisión de Agrupación",
    description: "Exactitud del sistema de IA"
  }
];

export const PROCESS_STEPS = [
  {
    step: 1,
    title: "Envía Mensaje a WhatsApp",
    description: "Reporta el crimen enviando texto, fotos, audio o ubicación",
    icon: "📱"
  },
  {
    step: 2,
    title: "Adjunta Evidencia Multimedia",
    description: "Incluye fotos, videos, audio y tu ubicación exacta",
    icon: "📸"
  },
  {
    step: 3,
    title: "IA Agrupa Reportes Similares",
    description: "Nuestro sistema identifica patrones y agrupa incidentes relacionados",
    icon: "🤖"
  },
  {
    step: 4,
    title: "Visualización en Tiempo Real",
    description: "Los crímenes aparecen en el mapa interactivo instantáneamente",
    icon: "🗺️"
  }
];