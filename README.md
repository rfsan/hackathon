# Colombian Crime Reporting Chatbot 🚨

A WhatsApp-based crime reporting system for Colombia with AI-powered crime grouping and real-time visualization.

Will be named "Dani Denuncia"

## 📋 Project Overview

This system enables citizens to report crimes through WhatsApp by sending text, images, audio, videos, and location data. The platform automatically groups related reports into crime incidents using AI analysis and displays them on an interactive real-time map.

## 🏗️ System Architecture

### High-Level Flow
```
WhatsApp Message → N8N → Supabase Storage/DB → AI Crime Grouping → Real-time Website
```

### Components

#### 1. **WhatsApp Integration (N8N)**
- Receives multimedia messages from users
- Processes images, audio, video files
- Generates image descriptions using AI
- Stores files in Supabase Storage
- Creates structured records in database

#### 2. **Database & Storage (Supabase)**
- **PostgreSQL** with **PostGIS** extension for geographic data
- **Supabase Storage** for multimedia files
- **Real-time subscriptions** for live updates
- **Row Level Security** for data protection

#### 3. **AI Crime Grouping Service**
- **Cron job** runs every minute via Supabase Edge Functions
- Uses **OpenRouter** for AI analysis
- Groups reports based on:
  - Geographic proximity (PostGIS spatial queries)
  - Temporal proximity (time-based matching)
  - Content similarity (text + image descriptions)

#### 4. **Frontend Website (Next.js + V0)**
- **Landing page** explaining the service
- **Interactive real-time map** with crime visualization
- **Crime detail pages** showing grouped reports
- Deployed on **Vercel**

## 🗄️ Database Schema

### User Table
```sql
CREATE TABLE "User" (
  user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text UNIQUE NOT NULL,
  emergency_contacts jsonb,
  created_at timestamp DEFAULT now()
);
```

### Report Table
```sql
CREATE TABLE "Report" (
  user_id uuid REFERENCES "User"(user_id),
  report_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_path text UNIQUE, -- Path to Supabase Storage folder
  report_details text,
  messages jsonb, -- Contains WhatsApp messages + AI image descriptions
  location geometry(POINT, 4326), -- PostGIS point
  priority_level integer CHECK (priority_level BETWEEN 1 AND 5),
  crime_category text CHECK (crime_category IN (
    'robo_personas',           -- Personal theft/robbery
    'hurto_vehiculos',         -- Vehicle theft  
    'hurto_motocicletas',      -- Motorcycle theft
    'violencia_domestica',     -- Domestic violence
    'homicidio',              -- Homicide
    'lesiones_personales',    -- Personal injury/assault
    'delitos_sexuales',       -- Sexual crimes
    'extorsion',              -- Extortion
    'hurto_residencial',      -- Residential burglary
    'hurto_comercial'         -- Commercial robbery
  )),
  crime_id uuid REFERENCES "Crime"(crime_id), -- NULL for unassigned
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

### Crime Table
```sql
CREATE TABLE "Crime" (
  crime_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  crime_summary text,
  crime_type text,
  followup_actions text,
  location geometry(POINT, 4326), -- Centroid of grouped reports
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);
```

## 🤖 AI Crime Grouping Algorithm

### Matching Criteria
1. **Spatial Proximity**: Reports within 2km radius (configurable)
2. **Temporal Proximity**: Reports within 48 hours (configurable)
3. **Content Similarity**: AI analysis of text and image descriptions
4. **Crime Category**: Same category gets higher matching scores

### Process Flow
```javascript
Every 1 minute:
1. Find unassigned reports (crime_id IS NULL)
2. For each report:
   - Query nearby reports using PostGIS
   - Analyze content similarity using OpenRouter AI
   - If similarity > 0.7 threshold: assign to existing crime
   - Else: create new crime
3. Update crime centroids
```

### AI Integration
- **OpenRouter API** for content analysis
- **Supabase vector embeddings** for similarity scoring
- Analysis includes:
  - Text message content
  - Image descriptions (from N8N)
  - Audio transcriptions (if available)
  - Location context

## 🌐 Frontend Features

### Landing Page
- Service explanation and value proposition
- Crime categories and reporting process
- Contact information and WhatsApp integration

### Real-time Crime Map
- Interactive map with live updates
- Crime clustering and heatmap visualization
- Filters by category, date range, priority
- PostGIS-powered geographic queries

### Crime Detail Pages
- Grouped reports overview
- Media gallery from Supabase Storage
- Timeline of related incidents
- Follow-up actions and recommendations

## 🔧 Technology Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **WhatsApp Integration** | N8N | Message processing, media handling |
| **Database** | Supabase PostgreSQL + PostGIS | Structured data + geographic queries |
| **Storage** | Supabase Storage | Multimedia files |
| **AI Processing** | OpenRouter | Content analysis, crime grouping |
| **Frontend** | Next.js + V0 | User interface, real-time updates |
| **Deployment** | Vercel | Static hosting with serverless functions |
| **Background Jobs** | Supabase Edge Functions + pg_cron | Crime grouping automation |

## 📁 Project Structure

```
hackathon/
├── README.md              # This file
├── plan.md               # Detailed execution plan
├── .env.local            # Environment variables
├── database/             # Database schema and functions
│   ├── schema.sql        # Table definitions
│   ├── functions.sql     # PostGIS helper functions
│   └── indexes.sql       # Performance indexes
├── functions/            # Supabase Edge Functions
│   └── crime-grouping/   # AI crime grouping cron job
├── web/                  # Next.js frontend application
│   ├── pages/            # Page components
│   ├── components/       # Reusable UI components
│   ├── lib/              # Supabase client, utilities
│   └── styles/           # Styling
└── n8n/                  # N8N workflow configurations
    └── workflows/        # WhatsApp integration flows
```

## 🚀 Setup Instructions

### Prerequisites
- Supabase project with PostGIS enabled
- OpenRouter API account
- N8N instance (cloud or self-hosted)
- Vercel account for deployment

### Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# OpenRouter Configuration  
OPENROUTER_API_KEY=your_openrouter_key
```

### Development Setup
1. Clone repository and install dependencies
2. Configure environment variables
3. Set up database schema in Supabase
4. Deploy Edge Functions for crime grouping
5. Configure N8N workflows for WhatsApp
6. Run Next.js development server

## 📊 Key Performance Metrics

### Success Criteria
- **Crime Grouping**: < 2 minute average processing time
- **Map Performance**: < 3 second load time  
- **AI Accuracy**: 95%+ crime matching accuracy
- **Real-time Updates**: < 5 second latency
- **Scalability**: Support 1000+ concurrent users

### Monitoring
- Supabase Analytics for database performance
- Vercel Analytics for frontend metrics
- OpenRouter usage tracking for AI costs
- Custom logging for crime grouping accuracy

## 🔒 Security & Privacy

### Data Protection
- **Row Level Security** on all database tables
- **Secure API keys** via environment variables
- **Media file access controls** through Supabase Storage policies
- **User data anonymization** options

### Privacy Considerations
- No user identification beyond phone numbers
- Configurable data retention policies
- Secure file storage with access controls
- GDPR-compliant data handling (if applicable)

## 🌍 Colombian Crime Context

### Supported Crime Categories
Based on 2024 Colombian crime statistics, the system supports the 10 most common crime types:

1. **Robo a personas** - Personal theft/robbery (most frequent)
2. **Hurto de vehículos** - Vehicle theft
3. **Hurto de motocicletas** - Motorcycle theft  
4. **Violencia doméstica** - Domestic violence
5. **Homicidio** - Homicide
6. **Lesiones personales** - Personal injury/assault
7. **Delitos sexuales** - Sexual crimes
8. **Extorsión** - Extortion
9. **Hurto residencial** - Residential burglary
10. **Hurto comercial** - Commercial robbery

### Regional Adaptation
- Categories based on Colombian National Police statistics
- Spanish language support throughout the system
- Local emergency contact integration
- Geographic focus on Colombian municipalities

## 🔄 Data Flow Detailed

### 1. Report Creation (N8N → Supabase)
```
WhatsApp Message → N8N Webhook → Process Media → Generate Descriptions → Store Files → Create Report Record
```

### 2. Crime Grouping (Supabase Edge Function)
```
Cron Trigger → Find Unassigned Reports → PostGIS Spatial Query → AI Similarity Analysis → Group/Create Crime
```

### 3. Real-time Updates (Supabase → Frontend)
```
Database Change → Supabase Realtime → WebSocket → Frontend Update → Map Refresh
```

## 🛠️ Development Roadmap

### Phase 1: Foundation ✅
- [x] Database schema design
- [x] Project architecture planning
- [x] Supabase setup with PostGIS

### Phase 2: Core Services 🚧
- [ ] AI crime grouping service
- [ ] Edge Functions deployment
- [ ] N8N WhatsApp integration

### Phase 3: Frontend 📋
- [ ] Next.js application setup
- [ ] Interactive map component
- [ ] Real-time subscriptions

### Phase 4: Integration & Testing 🧪
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Production deployment

## 📈 Future Enhancements

### Advanced Features
- **Predictive Analytics**: Crime pattern prediction
- **Machine Learning**: Improved grouping accuracy over time
- **Multi-language**: Support for indigenous languages
- **Mobile App**: Native iOS/Android applications
- **API Endpoints**: Third-party integrations

### Scalability Improvements
- **Microservices**: Split monolithic functions
- **Caching**: Redis for frequently accessed data
- **CDN**: Global content delivery for media files
- **Load Balancing**: Handle increased traffic

## 🤝 Contributing

This project was developed during a hackathon with requirements for:
- ✅ Supabase (Database & Storage)
- ✅ V0 (Frontend Design)
- ✅ Vercel (Deployment)
- ✅ N8N (Automation & Integration)

## 📄 License

MIT License - Feel free to adapt for other regions or use cases.

---

*Built with ❤️ for safer communities in Colombia*
