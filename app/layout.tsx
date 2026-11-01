import type React from "react"
import type {Metadata, Viewport} from "next"
import Script from "next/script"
import { Inter } from "next/font/google"
import { faqs } from "./faq-data"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const basePath = process.env.NODE_ENV === "production" ? "/empanadin" : ""
const domainUrl =
    process.env.NODE_ENV === "production" ? "https://sebiglesias.com.ar" : "http://localhost:3000"
const baseUrl = `${domainUrl}${basePath}/`

export const metadata: Metadata = {
    metadataBase: new URL(domainUrl),
    title: "¿Cuántas Empanadas por Persona? Calculadora de Docenas | Empanadín",
    description:
        "Calculá cuántas empanadas pedir o cocinar: 3 a 4 por adulto, tabla rápida de docenas para 10, 20 o 50 personas, gustos recomendados y división de gastos.",
    keywords: [
        "cuantas empanadas por persona",
        "cuantas empanadas se calcula por persona",
        "cuantas empanadas para 20 personas",
        "cuantas docenas de empanadas para 50 personas",
        "cuantas empanadas de copetin por persona",
        "cuantas empanadas salen con 1 kilo de carne",
        "calculadora de empanadas",
        "contador de empanadas",
        "calcular empanadas juntada",
        "pedido empanadas amigos",
        "empanadas por persona argentina"
    ],
    authors: [{ name: "Sebastián Iglesias", url: "https://sebiglesias.com.ar" }],
    creator: "Sebastián Iglesias",

    // Open Graph para redes sociales
    openGraph: {
        type: "website",
        locale: "es_AR",
        url: baseUrl,
        siteName: "Empanadín",
        title: "🥟 ¿Cuántas Empanadas por Persona? Calculadora de Docenas para Juntadas",
        description:
            "Calculá al instante cuántas empanadas pedir: 3 a 4 por adulto. Tabla de docenas para 10, 20 o 50 personas, gustos y división de gastos.",
        images: [
            {
                url: `${baseUrl}opengraph-image.png`,
                width: 1200,
                height: 630,
                alt: "Calculadora de Empanadas por Persona - Empanadín",
            },
        ],
    },

    // Twitter Cards
    twitter: {
        card: "summary_large_image",
        site: "@sebiglesias",
        creator: "@sebiglesias",
        title: "🥟 ¿Cuántas Empanadas por Persona? Calculadora de Docenas para Juntadas",
        description:
            "Calculá al instante cuántas empanadas pedir: 3 a 4 por adulto. Tabla de docenas para 10, 20 o 50 personas, gustos y división de gastos.",
        images: [`${baseUrl}opengraph-image.png`],
    },

    // PWA
    manifest: `${basePath}/manifest.json`,

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
            <link rel="apple-touch-icon" href={`${basePath}/icon-192x192.png`} />
            <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/icon-32x32.png`} />
            <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/icon-16x16.png`} />

            {/* Apple PWA */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Empanadas" />

            {/* Microsoft */}
            <meta name="msapplication-TileColor" content="#ea580c" />

            {/* Canonical URL */}
            <link rel="canonical" href={baseUrl} />

            {/* Google AdSense */}
            <meta name="google-adsense-account" content="ca-pub-3381238987477190" />
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3381238987477190"
                crossOrigin="anonymous"
                strategy="afterInteractive"
            />

            {/* Google tag (gtag.js) */}
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-2BNDBQP0W7"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-2BNDBQP0W7');
                `}
            </Script>

            {/* JSON-LD WebApplication Schema */}
            <Script
                id="json-ld-webapp"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebApplication",
                        "name": "Empanadín - Calculadora de Empanadas por Persona",
                        "description": "Calcula cuántas empanadas pedir por persona para tu juntada o evento. Estimá docenas para 10, 20 o 50 personas, organizá gustos y dividí gastos fácilmente.",
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
