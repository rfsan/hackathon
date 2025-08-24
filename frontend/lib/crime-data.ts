export interface CrimeDataPoint {
  longitude: number;
  latitude: number;
  crime_id: string | null;
  crime_type: string;
  report_time: string;
  userId?: string; // WhatsApp number or user identifier
  reportId?: string; // Unique report identifier
}

// Hardcoded crime data for Colombian cities
export const CRIME_DATA: CrimeDataPoint[] = [
  // Bogotá area crimes - Auto-grouped by user session
  {
    longitude: -74.0721,
    latitude: 4.7110,
    crime_id: "crime-001",
    crime_type: "robo_personas",
    report_time: "2024-08-23T10:30:00Z",
    userId: "+573001234567",
    reportId: "report-001"
  },
  {
    longitude: -74.0765,
    latitude: 4.7115,
    crime_id: "crime-001", // Auto-grouped: same user within 1-hour window
    crime_type: "robo_personas",
    report_time: "2024-08-23T10:45:00Z",
    userId: "+573001234567",
    reportId: "report-002"
  },
  {
    longitude: -74.0690,
    latitude: 4.7200,
    crime_id: "crime-002",
    crime_type: "hurto_vehiculos",
    report_time: "2024-08-23T11:15:00Z",
    userId: "+573007654321",
    reportId: "report-003"
  },
  {
    longitude: -74.0820,
    latitude: 4.6980,
    crime_id: null, // Single report - no grouping yet
    crime_type: "lesiones_personales",
    report_time: "2024-08-23T12:00:00Z",
    userId: "+573009876543",
    reportId: "report-004"
  },
  {
    longitude: -74.0580,
    latitude: 4.7300,
    crime_id: "crime-003",
    crime_type: "hurto_motocicletas",
    report_time: "2024-08-23T13:20:00Z"
  },
  
  // Medellín area crimes
  {
    longitude: -75.5636,
    latitude: 6.2442,
    crime_id: "crime-004",
    crime_type: "extorsion",
    report_time: "2024-08-23T09:00:00Z"
  },
  {
    longitude: -75.5700,
    latitude: 6.2500,
    crime_id: "crime-004", // Same crime_id = grouped
    crime_type: "extorsion",
    report_time: "2024-08-23T09:15:00Z"
  },
  {
    longitude: -75.5800,
    latitude: 6.2300,
    crime_id: null,
    crime_type: "violencia_domestica",
    report_time: "2024-08-23T14:30:00Z"
  },
  {
    longitude: -75.5500,
    latitude: 6.2600,
    crime_id: "crime-005",
    crime_type: "hurto_residencial",
    report_time: "2024-08-23T15:45:00Z"
  },
  
  // Cali area crimes
  {
    longitude: -76.5225,
    latitude: 3.4516,
    crime_id: "crime-006",
    crime_type: "homicidio",
    report_time: "2024-08-23T08:15:00Z"
  },
  {
    longitude: -76.5300,
    latitude: 3.4600,
    crime_id: "crime-006", // Same crime_id = grouped
    crime_type: "homicidio",
    report_time: "2024-08-23T08:30:00Z"
  },
  {
    longitude: -76.5150,
    latitude: 3.4400,
    crime_id: "crime-007",
    crime_type: "hurto_comercial",
    report_time: "2024-08-23T16:00:00Z"
  },
  {
    longitude: -76.5400,
    latitude: 3.4700,
    crime_id: null,
    crime_type: "delitos_sexuales",
    report_time: "2024-08-23T17:20:00Z"
  },
  
  // Barranquilla area crimes
  {
    longitude: -74.7813,
    latitude: 10.9685,
    crime_id: "crime-008",
    crime_type: "robo_personas",
    report_time: "2024-08-23T07:45:00Z"
  },
  {
    longitude: -74.7900,
    latitude: 10.9800,
    crime_id: null,
    crime_type: "hurto_vehiculos",
    report_time: "2024-08-23T18:10:00Z"
  },
  {
    longitude: -74.7750,
    latitude: 10.9600,
    crime_id: "crime-009",
    crime_type: "lesiones_personales",
    report_time: "2024-08-23T19:30:00Z"
  },
  
  // Cartagena area crimes
  {
    longitude: -75.5144,
    latitude: 10.3997,
    crime_id: "crime-010",
    crime_type: "extorsion",
    report_time: "2024-08-23T06:00:00Z"
  },
  {
    longitude: -75.5200,
    latitude: 10.4100,
    crime_id: "crime-010", // Same crime_id = grouped
    crime_type: "extorsion",
    report_time: "2024-08-23T06:20:00Z"
  },
  {
    longitude: -75.5100,
    latitude: 10.3900,
    crime_id: null,
    crime_type: "hurto_motocicletas",
    report_time: "2024-08-23T20:15:00Z"
  },
  
  // Additional scattered reports across Colombia
  {
    longitude: -74.0650,
    latitude: 4.6800,
    crime_id: "crime-011",
    crime_type: "violencia_domestica",
    report_time: "2024-08-23T21:00:00Z"
  },
  {
    longitude: -75.5400,
    latitude: 6.2100,
    crime_id: null,
    crime_type: "hurto_residencial",
    report_time: "2024-08-23T21:30:00Z"
  },
  {
    longitude: -76.5050,
    latitude: 3.4200,
    crime_id: "crime-012",
    crime_type: "hurto_comercial",
    report_time: "2024-08-23T22:00:00Z"
  }
];

// Function to get icon for crime_type
export const getCrimeTypeIcon = (crime_type: string): string => {
  const crimeTypeIcons: { [key: string]: string } = {
    "robo_personas": "👤",
    "hurto_vehiculos": "🚗", 
    "hurto_motocicletas": "🏍️",
    "violencia_domestica": "🏠",
    "homicidio": "⚰️",
    "lesiones_personales": "🩹",
    "delitos_sexuales": "⚠️",
    "extorsion": "💰",
    "hurto_residencial": "🏘️",
    "hurto_comercial": "🏪"
  };
  
  return crimeTypeIcons[crime_type] || "❓";
};

// Function to generate colors for crime_ids
export const getCrimeColor = (crime_id: string | null): string => {
  if (!crime_id) {
    return "#6B7280"; // Gray for unassigned reports
  }
  
  // Generate consistent colors based on crime_id
  const colors = [
    "#EF4444", // Red
    "#F97316", // Orange  
    "#EAB308", // Yellow
    "#22C55E", // Green
    "#06B6D4", // Cyan
    "#3B82F6", // Blue
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#F59E0B", // Amber
    "#10B981", // Emerald
    "#8B5A2B", // Brown
    "#DC2626", // Dark Red
  ];
  
  // Use hash of crime_id to get consistent color
  let hash = 0;
  for (let i = 0; i < crime_id.length; i++) {
    hash = ((hash << 5) - hash) + crime_id.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return colors[Math.abs(hash) % colors.length];
};

// Function to get crime type display name
export const getCrimeTypeName = (crime_type: string): string => {
  const crimeTypeNames: { [key: string]: string } = {
    "robo_personas": "Robo a Personas",
    "hurto_vehiculos": "Hurto de Vehículos",
    "hurto_motocicletas": "Hurto de Motocicletas",
    "violencia_domestica": "Violencia Doméstica",
    "homicidio": "Homicidio",
    "lesiones_personales": "Lesiones Personales",
    "delitos_sexuales": "Delitos Sexuales",
    "extorsion": "Extorsión",
    "hurto_residencial": "Hurto Residencial",
    "hurto_comercial": "Hurto Comercial"
  };
  
  return crimeTypeNames[crime_type] || crime_type;
};

// Function to format report time for display
export const formatReportTime = (report_time: string): string => {
  const date = new Date(report_time);
  return date.toLocaleString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Bogota"
  });
};