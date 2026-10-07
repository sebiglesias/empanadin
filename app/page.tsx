import EmpanadasCalculator from "./calculator"
import FAQ from "./faq"
import { faqs } from "./faq-data"

const empanadas = ["Carne", "Pollo", "Jamón y Queso", "Caprese", "Verdura", "Humita", "Cebolla y Queso", "Atún"]

export default function Page() {
  return (
      <>
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
            <p>Esta aplicación requiere JavaScript habilitado para funcionar.</p>
          </div>
        </noscript>

        <div style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", opacity: "0" }}>
          <h1>Calculadora de Empanadas para Juntadas</h1>
          <p>
            Herramienta gratuita para organizar pedidos de empanadas en juntadas con amigos. Calcula cuántas
            empanadas necesitas por persona, divide costos automáticamente y comparte el pedido por WhatsApp.
            Perfecto para reuniones en Argentina.
          </p>

          <h2>Tipos de Empanadas Disponibles</h2>
          <ul>
            {empanadas.map((emp) => (
                <li key={emp}>{emp}</li>
            ))}
          </ul>

          <h2>Características</h2>
          <ul>
            <li>Agrega personas a tu juntada</li>
            <li>Selecciona tipos y cantidades de empanadas</li>
            <li>Calcula costos automáticamente</li>
            <li>Comparte el resumen por WhatsApp</li>
            <li>Divide gastos de forma proporcional</li>
            <li>Guarda tus datos en el navegador</li>
            <li>Funciona sin conexión (PWA)</li>
            <li>Gratis y sin publicidad</li>
          </ul>

          <h2>Cómo Usar</h2>
          <p>
            1. Agrega los nombres de las personas que van a comer empanadas<br />
            2. Selecciona el tipo y cantidad de empanadas para cada persona<br />
            3. Ingresa el precio por empanada o el precio total del pedido<br />
            4. Revisa el resumen con lo que cada uno debe pagar<br />
            5. Comparte por WhatsApp o copia el mensaje<br />
          </p>

          <h2>Preguntas Frecuentes</h2>
          {faqs.map((faq) => (
              <div key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
          ))}
        </div>

        <EmpanadasCalculator />

        <div style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <FAQ />
        </div>

        <nav aria-label="Otras calculadoras para juntadas" style={{ maxWidth: "800px", margin: "2rem auto 0", padding: "1.2rem 1rem 0", borderTop: "1px solid #fed7aa", textAlign: "center" }}>
          <span style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#9a3412", marginBottom: "0.6rem", fontWeight: "600" }}>
            Más herramientas para la juntada
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem" }}>
            <a href="https://sebiglesias.com.ar/asadin/" style={{ padding: "0.35rem 0.75rem", border: "1px solid #fdba74", borderRadius: "9999px", color: "#c2410c", textDecoration: "none", fontSize: "0.85rem", background: "white" }}>
              🥩 Asadín
            </a>
            <span style={{ padding: "0.35rem 0.75rem", border: "1px solid #ea580c", borderRadius: "9999px", color: "white", fontSize: "0.85rem", background: "#ea580c", fontWeight: "600" }}>
              🥟 Empanadín
            </span>
            <a href="https://sebiglesias.com.ar/pizzadita/" style={{ padding: "0.35rem 0.75rem", border: "1px solid #fdba74", borderRadius: "9999px", color: "#c2410c", textDecoration: "none", fontSize: "0.85rem", background: "white" }}>
              🍕 Pizzadita
            </a>
            <a href="https://sebiglesias.com.ar/picada/" style={{ padding: "0.35rem 0.75rem", border: "1px solid #fdba74", borderRadius: "9999px", color: "#c2410c", textDecoration: "none", fontSize: "0.85rem", background: "white" }}>
              🧀 Picada
            </a>
          </div>
        </nav>

        <footer style={{ textAlign: "center", paddingTop: "2rem", borderTop: "1px solid #ea580c", color: "#6b7280", fontSize: "0.9rem", marginTop: "2rem" }}>
          <p>
            Hecho con ❤️ por{" "}
            <a href="https://sebiglesias.com.ar" target="_blank" rel="noopener noreferrer" style={{ color: "#ea580c", textDecoration: "none", fontWeight: "500" }}>
              Sebastián Iglesias
            </a>
          </p>
        </footer>
      </>
  )
}
