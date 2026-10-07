import type React from "react"
import type {Metadata, Viewport} from "next"
import Script from "next/script"
import { Inter } from "next/font/google"
import { faqs } from "./faq-data"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const basePath = process.env.NODE_ENV === "production" ? "/empanadin" : ""
const baseUrl =
    process.env.NODE_ENV === "production" ? "https://sebiglesias.com.ar/empanadin" : "http://localhost:3000"


export const metadata: Metadata = {
    title: "Calculadora de Empanadas para Juntadas | Empanadin",
    description:
        "Calculadora para organizar pedidos de empanadas en juntadas con amigos. Calcula cuántas empanadas por persona se necesitan y divide costos fácilmente.",
    keywords: [
        "empanadas",
        "calculadora de empanadas",
        "cuantas empanadas por persona",
        "cuantas empanadas se calcula por persona",
        "calcular empanadas juntada",
        "pedido empanadas amigos",
        "argentina"
    ],
    authors: [{ name: "Sebastián Iglesias", url: "https://sebiglesias.com.ar" }],
    creator: "Sebastián Iglesias",

    // Open Graph para redes sociales
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: baseUrl,
        siteName: "Calculadora de Empanadas",
        title: "🥟 Calculadora de Empanadas para Juntadas",
        description:
            "Calcula cuántas empanadas necesitas para tu juntada. Organiza tu pedido, divide costos y comparte por WhatsApp.",
        images: [
            {
                url: `${baseUrl}/opengraph-image.png`,
                width: 1200,
                height: 630,
                alt: "Calculadora de Empanadas - Organiza tu pedido con amigos",
            },
        ],
    },

    // Twitter Cards
    twitter: {
        card: "summary_large_image",
        site: "@sebiglesias",
        creator: "@sebiglesias",
        title: "🥟 Calculadora de Empanadas para Juntadas",
        description:
            "Calcula cuántas empanadas necesitas para tu juntada. Organiza tu pedido, divide costos y comparte por WhatsApp.",
        images: [`${baseUrl}/opengraph-image.png`],
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
            <link rel="canonical" href={baseUrl} />

            {/* JSON-LD WebApplication Schema */}
            <Script
                id="json-ld-webapp"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Calculadora de Empanadas",
                        "description": "Calcula cuántas empanadas necesitas para tu juntada. Organiza tu pedido con amigos, divide costos y comparte por WhatsApp.",
                        "url": baseUrl,
                        "applicationCategory": "UtilitiesApplication",
                        "operatingSystem": "Any",
                        "inLanguage": "es-AR",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "ARS"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Sebastián Iglesias",
                            "url": "https://sebiglesias.com.ar"
                        }
                    })
                }}
            />

            {/* JSON-LD FAQPage Schema */}
            <Script
                id="json-ld-faqpage"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map((faq) => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer,
                            },
                        })),
                    })
                }}
            />
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    )
}
