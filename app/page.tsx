"use client"

import { useState, useEffect } from "react"
import RegisterSW from "./register-sw"

interface Empanada {
  id: string
  tipo: string
  cantidad: number
}

interface Persona {
  id: string
  nombre: string
  empanadas: Empanada[]
}

const tiposEmpanadas = ["Carne", "Pollo", "Jamón y Queso", "Caprese", "Verdura", "Humita", "Cebolla y Queso", "Atún"]

export default function EmpanadaCalculator() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [nuevoNombre, setNuevoNombre] = useState("")
  const [tiposPersonalizados, setTiposPersonalizados] = useState<string[]>([])
  const [nuevoTipo, setNuevoTipo] = useState("")
  const [mostrarFormTipo, setMostrarFormTipo] = useState(false)

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const datosGuardados = localStorage.getItem("empanadas-data")
    const tiposGuardados = localStorage.getItem("empanadas-tipos-personalizados")

    if (datosGuardados) {
      setPersonas(JSON.parse(datosGuardados))
    }
    if (tiposGuardados) {
      setTiposPersonalizados(JSON.parse(tiposGuardados))
    }
  }, [])

  // Guardar en localStorage cada vez que cambian las personas
  useEffect(() => {
    localStorage.setItem("empanadas-data", JSON.stringify(personas))
  }, [personas])

  useEffect(() => {
    localStorage.setItem("empanadas-tipos-personalizados", JSON.stringify(tiposPersonalizados))
  }, [tiposPersonalizados])

  const agregarPersona = () => {
    if (nuevoNombre.trim()) {
      const nuevaPersona: Persona = {
        id: Date.now().toString(),
        nombre: nuevoNombre.trim(),
        empanadas: [],
      }
      setPersonas([...personas, nuevaPersona])
      setNuevoNombre("")
    }
  }

  const eliminarPersona = (personaId: string) => {
    setPersonas(personas.filter((p) => p.id !== personaId))
  }

  const agregarEmpanada = (personaId: string, tipo: string) => {
    setPersonas(
        personas.map((persona) => {
          if (persona.id === personaId) {
            const empanadaExistente = persona.empanadas.find((e) => e.tipo === tipo)
            if (empanadaExistente) {
              return {
                ...persona,
                empanadas: persona.empanadas.map((e) => (e.tipo === tipo ? { ...e, cantidad: e.cantidad + 1 } : e)),
              }
            } else {
              return {
                ...persona,
                empanadas: [
                  ...persona.empanadas,
                  {
                    id: Date.now().toString(),
                    tipo,
                    cantidad: 1,
                  },
                ],
              }
            }
          }
          return persona
        }),
    )
  }

  const modificarCantidad = (personaId: string, empanadaId: string, nuevaCantidad: number) => {
    if (nuevaCantidad <= 0) {
      setPersonas(
          personas.map((persona) => {
            if (persona.id === personaId) {
              return {
                ...persona,
                empanadas: persona.empanadas.filter((e) => e.id !== empanadaId),
              }
            }
            return persona
          }),
      )
    } else {
      setPersonas(
          personas.map((persona) => {
            if (persona.id === personaId) {
              return {
                ...persona,
                empanadas: persona.empanadas.map((e) => (e.id === empanadaId ? { ...e, cantidad: nuevaCantidad } : e)),
              }
            }
            return persona
          }),
      )
    }
  }

  const calcularTotales = () => {
    const totales: { [tipo: string]: number } = {}
    personas.forEach((persona) => {
      persona.empanadas.forEach((empanada) => {
        totales[empanada.tipo] = (totales[empanada.tipo] || 0) + empanada.cantidad
      })
    })
    return totales
  }

  const agregarTipoPersonalizado = () => {
    if (nuevoTipo.trim() && !todosLosTipos.includes(nuevoTipo.trim())) {
      setTiposPersonalizados([...tiposPersonalizados, nuevoTipo.trim()])
      setNuevoTipo("")
      setMostrarFormTipo(false)
    }
  }

  const eliminarTipoPersonalizado = (tipo: string) => {
    setTiposPersonalizados(tiposPersonalizados.filter((t) => t !== tipo))
    setPersonas(
        personas.map((persona) => ({
          ...persona,
          empanadas: persona.empanadas.filter((e) => e.tipo !== tipo),
        })),
    )
  }

  const todosLosTipos = [...tiposEmpanadas, ...tiposPersonalizados]

  const limpiarTodo = () => {
    setPersonas([])
    setTiposPersonalizados([])
    localStorage.removeItem("empanadas-data")
    localStorage.removeItem("empanadas-tipos-personalizados")
  }

  const totales = calcularTotales()
  const totalGeneral = Object.values(totales).reduce((sum, cantidad) => sum + cantidad, 0)

  // Estilos inline para que funcione inmediatamente
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fed7aa 0%, #fecaca 100%)",
      padding: "1rem",
      fontFamily: "system-ui, -apple-system, sans-serif",
    },
    maxWidth: {
      maxWidth: "64rem",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column" as const,
      gap: "1.5rem",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "1rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#9a3412",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    subtitle: {
      color: "#ea580c",
      fontSize: "1.1rem",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "0.75rem",
      padding: "1.5rem",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      border: "1px solid #f3f4f6",
    },
    cardTitle: {
      fontSize: "1.25rem",
      fontWeight: "600",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      outline: "none",
    },
    button: {
      backgroundColor: "#ea580c",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      padding: "0.75rem 1rem",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "500",
      transition: "background-color 0.2s",
    },
    buttonSecondary: {
      backgroundColor: "white",
      color: "#374151",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      padding: "0.75rem 1rem",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "500",
    },
    flexRow: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
    },
    select: {
      width: "100%",
      padding: "0.75rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      backgroundColor: "white",
    },
    empanadaItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fed7aa",
      padding: "1rem",
      borderRadius: "0.5rem",
      marginBottom: "0.5rem",
    },
    totalCard: {
      backgroundColor: "#fed7aa",
      border: "2px solid #ea580c",
      borderRadius: "0.75rem",
      padding: "1.5rem",
    },
    footer: {
      marginTop: "3rem",
      paddingTop: "2rem",
      borderTop: "1px solid #ea580c",
      textAlign: "center" as const,
      fontSize: "0.9rem",
      color: "#6b7280",
    },
    link: {
      color: "#ea580c",
      textDecoration: "none",
      fontWeight: "500",
    },
  }

  return (
      <>
        <RegisterSW />
        <div style={styles.container}>
          <div style={styles.maxWidth}>
            {/* Header */}
            <div style={styles.header}>
              <h1 style={styles.title}>🥟 Calculadora de Empanadas</h1>
              <p style={styles.subtitle}>Organiza tu pedido de empanadas con amigos</p>
            </div>

            {/* Agregar persona */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>👥 Agregar Persona</h2>
              <div style={styles.flexRow}>
                <input
                    style={styles.input}
                    placeholder="Nombre de la persona"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && agregarPersona()}
                />
                <button
                    style={styles.button}
                    onClick={agregarPersona}
                    disabled={!nuevoNombre.trim()}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c2410c")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
                >
                  +
                </button>
              </div>
            </div>

            {/* Gestionar tipos de empanadas */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>🥟 Tipos de Empanadas</h2>
              <p style={{ color: "#6b7280", marginBottom: "1rem" }}>
                Agrega tipos personalizados para lugares con opciones especiales
              </p>

              {tiposPersonalizados.length > 0 && (
                  <div style={{ marginBottom: "1rem" }}>
                    <h4 style={{ fontWeight: "500", fontSize: "0.9rem", color: "#374151", marginBottom: "0.5rem" }}>
                      Tipos personalizados:
                    </h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {tiposPersonalizados.map((tipo) => (
                          <div
                              key={tipo}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                                backgroundColor: "#fed7aa",
                                color: "#9a3412",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "9999px",
                                fontSize: "0.875rem",
                              }}
                          >
                            <span>{tipo}</span>
                            <button
                                onClick={() => eliminarTipoPersonalizado(tipo)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#9a3412",
                                  cursor: "pointer",
                                  fontSize: "1rem",
                                  padding: "0",
                                  marginLeft: "0.25rem",
                                }}
                            >
                              ×
                            </button>
                          </div>
                      ))}
                    </div>
                  </div>
              )}

              <button style={styles.buttonSecondary} onClick={() => setMostrarFormTipo(!mostrarFormTipo)}>
                + {mostrarFormTipo ? "Cancelar" : "Agregar Tipo Personalizado"}
              </button>

              {mostrarFormTipo && (
                  <div
                      style={{
                        ...styles.flexRow,
                        marginTop: "1rem",
                        padding: "1rem",
                        backgroundColor: "#f9fafb",
                        borderRadius: "0.5rem",
                      }}
                  >
                    <input
                        style={styles.input}
                        placeholder="Ej: Roquefort y Nuez, Cordero, etc."
                        value={nuevoTipo}
                        onChange={(e) => setNuevoTipo(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && agregarTipoPersonalizado()}
                    />
                    <button
                        style={styles.button}
                        onClick={agregarTipoPersonalizado}
                        disabled={!nuevoTipo.trim() || todosLosTipos.includes(nuevoTipo.trim())}
                    >
                      Agregar
                    </button>
                  </div>
              )}
            </div>

            {/* Lista de personas */}
            {personas.map((persona) => (
                <div key={persona.id} style={styles.card}>
                  <div
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}
                  >
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>{persona.nombre}</h3>
                    <button
                        style={{ ...styles.buttonSecondary, color: "#dc2626" }}
                        onClick={() => eliminarPersona(persona.id)}
                    >
                      🗑️
                    </button>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <select
                        style={styles.select}
                        onChange={(e) => {
                          if (e.target.value) {
                            agregarEmpanada(persona.id, e.target.value)
                            e.target.value = ""
                          }
                        }}
                        defaultValue=""
                    >
                      <option value="">Seleccionar tipo de empanada</option>
                      {tiposEmpanadas.map((tipo) => (
                          <option key={tipo} value={tipo}>
                            {tipo}
                          </option>
                      ))}
                      {tiposPersonalizados.length > 0 && (
                          <optgroup label="Personalizados">
                            {tiposPersonalizados.map((tipo) => (
                                <option key={tipo} value={tipo}>
                                  {tipo} ✨
                                </option>
                            ))}
                          </optgroup>
                      )}
                    </select>
                  </div>

                  {persona.empanadas.length > 0 ? (
                      <div>
                        {persona.empanadas.map((empanada) => (
                            <div key={empanada.id} style={styles.empanadaItem}>
                              <span style={{ fontWeight: "500" }}>{empanada.tipo}</span>
                              <div style={styles.flexRow}>
                                <button
                                    style={styles.buttonSecondary}
                                    onClick={() => modificarCantidad(persona.id, empanada.id, empanada.cantidad - 1)}
                                >
                                  -
                                </button>
                                <span style={{ minWidth: "2rem", textAlign: "center", fontWeight: "bold" }}>
                          {empanada.cantidad}
                        </span>
                                <button
                                    style={styles.buttonSecondary}
                                    onClick={() => modificarCantidad(persona.id, empanada.id, empanada.cantidad + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                        ))}
                      </div>
                  ) : (
                      <p style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>No hay empanadas seleccionadas</p>
                  )}
                </div>
            ))}

            {personas.length === 0 && (
                <div style={styles.card}>
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👥</div>
                    <p style={{ color: "#6b7280" }}>No hay personas agregadas. ¡Comienza agregando a tus amigos!</p>
                  </div>
                </div>
            )}

            {/* Resumen total */}
            {totalGeneral > 0 && (
                <div style={styles.totalCard}>
                  <h2 style={{ ...styles.cardTitle, color: "#9a3412" }}>📒 Resumen del Pedido</h2>
                  <p style={{ color: "#9a3412", marginBottom: "1rem" }}>Total para llamar y pedir</p>

                  {Object.entries(totales).map(([tipo, cantidad]) => (
                      <div
                          key={tipo}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "white",
                            padding: "0.75rem",
                            borderRadius: "0.5rem",
                            marginBottom: "0.5rem",
                          }}
                      >
                        <span style={{ fontWeight: "500" }}>{tipo}</span>
                        <span style={{ fontWeight: "bold", color: "#9a3412" }}>{cantidad} empanadas</span>
                      </div>
                  ))}

                  <div style={{ borderTop: "2px solid #9a3412", paddingTop: "1rem", marginTop: "1rem" }}>
                    <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "1.25rem",
                          fontWeight: "bold",
                          color: "#9a3412",
                        }}
                    >
                      <span>TOTAL GENERAL</span>
                      <span>{totalGeneral} empanadas</span>
                    </div>
                  </div>
                </div>
            )}

            {/* Botón limpiar */}
            {personas.length > 0 && (
                <div style={{ textAlign: "center" }}>
                  <button style={{ ...styles.buttonSecondary, color: "#dc2626" }} onClick={limpiarTodo}>
                    Limpiar Todo
                  </button>
                </div>
            )}

            {/* Footer */}
            <footer style={styles.footer}>
              <p>
                Hecho con ❤️ por{" "}
                <a href="https://sebiglesias.com.ar" target="_blank" rel="noopener noreferrer" style={styles.link}>
                  Sebastián Iglesias
                </a>
              </p>
            </footer>
          </div>
        </div>
      </>
  )
}
