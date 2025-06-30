import type React from "react"
import type {Metadata, Viewport} from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const basePath = process.env.NODE_ENV === "production" ? "/empanadin" : ""
const baseUrl =
    process.env.NODE_ENV === "production" ? "https://sebiglesias.github.io/empanadin" : "http://localhost:3000"


export const metadata: Metadata = {
    title: "Calculadora de Empanadas",
    description:
        "Organiza tu pedido de empanadas con amigos. Agrega personas, selecciona tipos y cantidades, y obtén el resumen total para llamar.",
    keywords: ["empanadas", "calculadora", "pedido", "amigos", "argentina", "comida"],
    authors: [{ name: "Sebastián Iglesias", url: "https://sebiglesias.com.ar" }],
    creator: "Sebastián Iglesias",

    // Open Graph para redes sociales
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: baseUrl,
        siteName: "Calculadora de Empanadas",
        title: "🥟 Calculadora de Empanadas",
        description:
            "Organiza tu pedido de empanadas con amigos. Agrega personas, selecciona tipos y cantidades, y obtén el resumen total para llamar.",
        images: [
            {
                url: `${baseUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Calculadora de Empanadas - Organiza tu pedido con amigos",
            },
        ],
    },

    // Twitter Cards
    twitter: {
        card: "summary_large_image",
        site: "@sebiglesias", // Cambia por tu usuario de Twitter si tienes
        creator: "@sebiglesias",
        title: "🥟 Calculadora de Empanadas",
        description:
            "Organiza tu pedido de empanadas con amigos. Agrega personas, selecciona tipos y cantidades, y obtén el resumen total para llamar.",
        images: [`${baseUrl}/og-image.png`],
    },

    // PWA
    manifest: "/manifest.json",

    // Apple
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Empanadas",
    },

    // Otros meta tags útiles
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
}

export const viewport: Viewport = {
    themeColor: '#ea580c',
    width: 'device-width',
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
            {/* Favicons */}
            <link rel="apple-touch-icon" href="/icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/icon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/icon-16x16.png" />

            {/* Apple PWA */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Empanadas" />

            {/* Microsoft */}
            <meta name="msapplication-TileColor" content="#ea580c" />

            {/* Canonical URL */}
            <link rel="canonical" href="https://sebiglesias.com.ar/empanadin" />
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    )
}
