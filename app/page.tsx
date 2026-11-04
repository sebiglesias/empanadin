import EmpanadasCalculator from "./calculator"
import FAQ from "./faq"
import AdBanner from "@/components/ad-banner"

export default function Page() {
  return (
      <>
        <noscript>
          <div style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui, sans-serif" }}>
            <p>Esta aplicación requiere JavaScript habilitado para funcionar.</p>
          </div>
        </noscript>

        <EmpanadasCalculator />

        <AdBanner />

        {/* Guía Rápida & Tabla de Referencia SEO */}
        <section
          aria-label="Guía rápida para calcular empanadas"
          style={{
            maxWidth: "800px",
            margin: "2rem auto 0",
            padding: "1.75rem",
            backgroundColor: "white",
            borderRadius: "0.75rem",
            border: "1px solid #fed7aa",
            boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <h2 style={{ fontSize: "1.4rem", fontWeight: "700", color: "#9a3412", marginBottom: "0.5rem" }}>
            📊 Tabla Rápida: ¿Cuántas Empanadas se Calculan por Persona?
          </h2>
          <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "1.25rem" }}>
            La regla de oro en Argentina es calcular <strong>3 a 4 empanadas por adulto</strong> si son el plato principal.
            Si hay picada previa, ensaladas o entrada, se calculan <strong>2 a 3 por persona</strong>.
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ backgroundColor: "#ffedd5", borderBottom: "2px solid #fdba74" }}>
                  <th style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#9a3412" }}>Invitados</th>
                  <th style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#9a3412" }}>Plato Único (3.5 c/u)</th>
                  <th style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#9a3412" }}>Docenas Exactas</th>
                  <th style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#9a3412" }}>Con Picada (2.5 c/u)</th>
                  <th style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#9a3412" }}>Copetín / Fiestas (5 c/u)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid #fed7aa" }}>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600" }}>5 personas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>18 empanadas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>1.5 docenas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>12 empanadas (1 doc.)</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>25 empanadas</td>
                </tr>
                <tr style={{ backgroundColor: "#fff7ed", borderBottom: "1px solid #fed7aa" }}>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600" }}>10 personas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>36 empanadas</td>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#ea580c" }}>3 docenas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>25 empanadas (2 doc.)</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>50 empanadas</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #fed7aa" }}>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600" }}>15 personas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>54 empanadas</td>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#ea580c" }}>4.5 docenas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>38 empanadas (3 doc.)</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>75 empanadas</td>
                </tr>
                <tr style={{ backgroundColor: "#fff7ed", borderBottom: "1px solid #fed7aa" }}>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600" }}>20 personas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>72 empanadas</td>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#ea580c" }}>6 docenas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>50 empanadas (4 doc.)</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>100 empanadas</td>
                </tr>
                <tr style={{ borderBottom: "1px solid #fed7aa" }}>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600" }}>30 personas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>108 empanadas</td>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#ea580c" }}>9 docenas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>75 empanadas (6 doc.)</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>150 empanadas</td>
                </tr>
                <tr style={{ backgroundColor: "#fff7ed" }}>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600" }}>50 personas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>180 empanadas</td>
                  <td style={{ padding: "0.6rem 0.75rem", fontWeight: "600", color: "#ea580c" }}>15 docenas</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>125 empanadas (10 doc.)</td>
                  <td style={{ padding: "0.6rem 0.75rem" }}>250 empanadas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", marginTop: "1.5rem" }}>
            <div style={{ backgroundColor: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "0.5rem", padding: "0.85rem" }}>
              <div style={{ fontWeight: "600", color: "#9a3412", marginBottom: "0.25rem", fontSize: "0.9rem" }}>🥟 Adultos vs Niños</div>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#4b5563", lineHeight: "1.4" }}>
                Adultos comen 3 a 4 empanadas estándar. Chicos menores de 10 años consumen entre 1 y 2 empanadas.
              </p>
            </div>
            <div style={{ backgroundColor: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "0.5rem", padding: "0.85rem" }}>
              <div style={{ fontWeight: "600", color: "#9a3412", marginBottom: "0.25rem", fontSize: "0.9rem" }}>🥩 Rendimiento Carne</div>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#4b5563", lineHeight: "1.4" }}>
                1 kg de carne picada + 1 kg de cebolla rinde de 24 a 30 empanadas medianas (2 a 2.5 docenas).
              </p>
            </div>
            <div style={{ backgroundColor: "#fff7ed", border: "1px solid #ffedd5", borderRadius: "0.5rem", padding: "0.85rem" }}>
              <div style={{ fontWeight: "600", color: "#9a3412", marginBottom: "0.25rem", fontSize: "0.9rem" }}>🎉 Empanadas de Copetín</div>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#4b5563", lineHeight: "1.4" }}>
                Para cumpleaños de 15 o recepciones, calcular entre 5 y 6 empanaditas de copetín por persona.
              </p>
            </div>
          </div>
        </section>

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
