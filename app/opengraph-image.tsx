import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Calculadora de Empanadas"
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = "image/png"

export default async function Image() {
    return new ImageResponse(
        <div
            style={{
                background: "linear-gradient(135deg, #fed7aa 0%, #fecaca 100%)",
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "system-ui",
            }}
        >
            {/* Emoji de empanada grande */}
            <div style={{ fontSize: "120px", marginBottom: "20px" }}>🥟</div>

            {/* Título principal */}
            <div
                style={{
                    fontSize: "64px",
                    fontWeight: "bold",
                    color: "#9a3412",
                    textAlign: "center",
                    marginBottom: "20px",
                }}
            >
                Calculadora de Empanadas
            </div>

            {/* Descripción */}
            <div
                style={{
                    fontSize: "32px",
                    color: "#ea580c",
                    textAlign: "center",
                    marginBottom: "40px",
                }}
            >
                Organiza tu pedido con amigos
            </div>

            {/* Features */}
            <div
                style={{
                    display: "flex",
                    gap: "40px",
                    fontSize: "24px",
                    color: "#9a3412",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span>👥</span>
                    <span>Agregar personas</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span>📝</span>
                    <span>Tipos personalizados</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span>🧮</span>
                    <span>Resumen automático</span>
                </div>
            </div>

            {/* Footer */}
            <div
                style={{
                    position: "absolute",
                    bottom: "40px",
                    fontSize: "20px",
                    color: "#6b7280",
                }}
            >
                sebiglesias.com.ar/empanadin
            </div>
        </div>,
        {
            ...size,
        },
    )
}
