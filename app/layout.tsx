import type React from "react"
import type {Metadata, Viewport} from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Calculadora de Empanadas",
  description: "Calcula las empanadas para tu juntada con amigos",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Empanadas",
  },
}

export const viewport: Viewport = {
    themeColor: "#ea580c",
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="es">
      <head>
          <link rel="apple-touch-icon" href="/icon-192x192.png"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
          <meta name="apple-mobile-web-app-title" content="Empanadas"/>
          <title>Calculadora de Empanadas</title>
      </head>
      <body className={inter.className}>{children}</body>
      </html>
  )
}
