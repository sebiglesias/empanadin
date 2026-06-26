"use client"

import { useState } from "react"
import { faqs } from "./faq-data"

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
      <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "2rem" }}>
        <h2
            style={{
              textAlign: "center",
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#9a3412",
              marginBottom: "0.5rem",
            }}
        >
          ❓ Preguntas Frecuentes
        </h2>
        <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              marginBottom: "2rem",
              fontSize: "1rem",
            }}
        >
          Respuestas a las dudas más comunes
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {faqs.map((faq, index) => (
              <div
                  key={index}
                  style={{
                    backgroundColor: "white",
                    borderRadius: "0.75rem",
                    border: "1px solid #e5e7eb",
                    overflow: "hidden",
                  }}
              >
                <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    style={{
                      width: "100%",
                      padding: "1.25rem",
                      textAlign: "left",
                      backgroundColor: openIndex === index ? "#fef3c7" : "white",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#1f2937",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (openIndex !== index) {
                        e.currentTarget.style.backgroundColor = "#f9fafb"
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = openIndex === index ? "#fef3c7" : "white"
                    }}
                >
                  <span>{faq.question}</span>
                  <span style={{ fontSize: "1.5rem", transition: "transform 0.2s" }}>
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                    <div
                        style={{
                          padding: "1.25rem",
                          backgroundColor: "#fafafa",
                          borderTop: "1px solid #e5e7eb",
                          color: "#4b5563",
                          lineHeight: "1.6",
                          fontSize: "0.95rem",
                        }}
                    >
                      {faq.answer}
                    </div>
                )}
              </div>
          ))}
        </div>
      </div>
  )
}

export default FAQ
