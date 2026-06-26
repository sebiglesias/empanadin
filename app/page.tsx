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
        <FAQ />
      </>
  )
}
