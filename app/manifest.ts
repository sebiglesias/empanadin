import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NODE_ENV === "production" ? "/empanada-calculator" : ""

  return {
    name: "Calculadora de Empanadas",
    short_name: "Empanadas",
    description: "Calcula las empanadas para tu juntada con amigos",
    start_url: `${basePath}/`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ea580c",
    orientation: "portrait",
    icons: [
      {
        src: `${basePath}/icon-192x192.png`,
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: `${basePath}/icon-512x512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  }
}

