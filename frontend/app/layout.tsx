import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DaniDenuncia Colombia | Reporta Crímenes por WhatsApp",
  description: "Sistema inteligente de reportes de crímenes por WhatsApp para Colombia. IA agrupa reportes similares y los visualiza en tiempo real para crear comunidades más seguras.",
  keywords: "reportar crimen colombia, whatsapp crimen, seguridad ciudadana, inteligencia artificial, reporte anonimo",
  authors: [{ name: "DaniDenuncia Team" }],
  openGraph: {
    title: "DaniDenuncia Colombia | Reporta Crímenes por WhatsApp",
    description: "Sistema inteligente que agrupa reportes de crímenes usando IA y los visualiza en tiempo real",
    url: "https://www.danidenuncia.lat",
    siteName: "DaniDenuncia",
    locale: "es_CO",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
