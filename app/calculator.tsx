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

const tiposEmpanadas = [
  "Carne",
  "Pollo",
  "Jamón y Queso",
  "Caprese",
  "Verdura",
  "Humita",
  "Cebolla y Queso",
  "Atún",
  "Roquefort y Nuez",
  "Champiñones",
  "Espinaca",
  "Queso y Jalapeño",
]

export default function EmpanadasCalculator() {
  const [personas, setPersonas] = useState<Persona[]>([])
  const [nuevoNombre, setNuevoNombre] = useState("")
  const [tiposPersonalizados, setTiposPersonalizados] = useState<string[]>([])
  const [nuevoTipo, setNuevoTipo] = useState("")
  const [mostrarFormTipo, setMostrarFormTipo] = useState(false)
  const [precioEmpanada, setPrecioEmpanada] = useState<number>(0)
  const [mostrarPrecios, setMostrarPrecios] = useState(false)
  const [modoPrecio, setModoPrecio] = useState<"porEmpanada" | "total">("porEmpanada")
  const [precioTotal, setPrecioTotal] = useState<number>(0)
  const [aliasTransferencia, setAliasTransferencia] = useState("")

  const handleAliasChange = (valor: string) => {
    setAliasTransferencia(valor)
    localStorage.setItem("empanadas-alias", valor)
  }

  useEffect(() => {
    const datosGuardados = localStorage.getItem("empanadas-data")
    const tiposGuardados = localStorage.getItem("empanadas-tipos-personalizados")
    const precioGuardado = localStorage.getItem("empanadas-precio")
    const modoGuardado = localStorage.getItem("empanadas-modo-precio")
    const precioTotalGuardado = localStorage.getItem("empanadas-precio-total")
    const aliasGuardado = localStorage.getItem("empanadas-alias")

    if (datosGuardados) {
      setPersonas(JSON.parse(datosGuardados))
    }
    if (tiposGuardados) {
      setTiposPersonalizados(JSON.parse(tiposGuardados))
    }
    if (precioGuardado) {
      setPrecioEmpanada(Number(precioGuardado))
    }
    if (aliasGuardado) {
      setAliasTransferencia(aliasGuardado)
    }
    if (modoGuardado) {
      setModoPrecio(modoGuardado as "porEmpanada" | "total")
    }
    if (precioTotalGuardado) {
      setPrecioTotal(Number(precioTotalGuardado))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("empanadas-data", JSON.stringify(personas))
  }, [personas])

  useEffect(() => {
    localStorage.setItem("empanadas-tipos-personalizados", JSON.stringify(tiposPersonalizados))
  }, [tiposPersonalizados])

  useEffect(() => {
    localStorage.setItem("empanadas-precio", precioEmpanada.toString())
  }, [precioEmpanada])

  useEffect(() => {
    localStorage.setItem("empanadas-modo-precio", modoPrecio)
  }, [modoPrecio])

  useEffect(() => {
    localStorage.setItem("empanadas-precio-total", precioTotal.toString())
  }, [precioTotal])

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

  const generarMensajeWhatsApp = () => {
    const totales = calcularTotales()
    const totalGeneral = Object.values(totales).reduce((sum, cantidad) => sum + cantidad, 0)
    const costoTotal = calcularCostoTotal()

    let mensaje = "🥟 *PEDIDO DE EMPANADAS* 🥟\n\n"

    mensaje += "*📋 RESUMEN DEL PEDIDO:*\n"
    Object.entries(totales).forEach(([tipo, cantidad]) => {
      mensaje += `• ${tipo}: ${cantidad} empanadas\n`
    })
    mensaje += `\n*TOTAL: ${totalGeneral} empanadas*\n`
    mensaje += `*💰 COSTO TOTAL: $${costoTotal.toLocaleString()}*\n\n`

    mensaje += "*👥 DETALLE POR PERSONA:*\n"
    personas.forEach((persona) => {
      const costoPersona = calcularCostoPersona(persona)
      const cantidadPersona = persona.empanadas.reduce((sum, emp) => sum + emp.cantidad, 0)

      if (cantidadPersona > 0) {
        mensaje += `\n*${persona.nombre}:*\n`
        persona.empanadas.forEach((empanada) => {
          mensaje += `  • ${empanada.tipo}: ${empanada.cantidad}\n`
        })
        mensaje += `  💰 Debe pagar: $${costoPersona.toLocaleString()}\n`
      }
    })

    if (aliasTransferencia.trim()) {
      mensaje += `\n💳 *DATOS DE TRANSFERENCIA:*\nAlias / CBU: *${aliasTransferencia.trim()}*\n`
    }

    mensaje += "\n---\n"
    mensaje += "📱 Calculado con Empanadín:\n"
    mensaje += "🔗 https://sebiglesias.com.ar/empanadin/?utm_source=whatsapp&utm_medium=share&utm_campaign=empanada_split"

    return mensaje
  }

  const compartirWhatsApp = async () => {
    const mensaje = generarMensajeWhatsApp()
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Pedido de Empanadas",
          text: mensaje,
        })
        return
      } catch (err: any) {
        if (err.name === "AbortError") return
      }
    }
    const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`
    window.open(url, "_blank")
  }

  const copiarMensaje = async () => {
    const mensaje = generarMensajeWhatsApp()
    try {
      await navigator.clipboard.writeText(mensaje)
      alert("¡Mensaje copiado al portapapeles!")
    } catch (err) {
      const textArea = document.createElement("textarea")
      textArea.value = mensaje
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      alert("¡Mensaje copiado al portapapeles!")
    }
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
  const calcularPrecioPorEmpanada = () => {
    if (totalGeneral === 0) return 0
    return Math.round(precioTotal / totalGeneral)
  }

  const calcularPrecioTotalDesdeEmpanada = () => {
    return precioEmpanada * totalGeneral
  }

  const precioEfectivoPorEmpanada = modoPrecio === "porEmpanada" ? precioEmpanada : calcularPrecioPorEmpanada()

  const calcularCostoPersona = (persona: Persona) => {
    if (modoPrecio === "porEmpanada") {
      return persona.empanadas.reduce((total, empanada) => total + empanada.cantidad * precioEmpanada, 0)
    } else {
      const cantidadPersona = persona.empanadas.reduce((sum, emp) => sum + emp.cantidad, 0)
      if (totalGeneral === 0) return 0
      return Math.round((cantidadPersona / totalGeneral) * precioTotal)
    }
  }

  const calcularCostoTotal = () => {
    if (modoPrecio === "porEmpanada") {
      return personas.reduce((total, persona) => total + calcularCostoPersona(persona), 0)
    } else {
      return precioTotal
    }
  }
  const costoTotal = calcularCostoTotal()

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
    inputSmall: {
      padding: "0.5rem",
      border: "1px solid #d1d5db",
      borderRadius: "0.5rem",
      fontSize: "1rem",
      outline: "none",
      width: "120px",
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
    buttonWhatsApp: {
      backgroundColor: "#25d366",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      padding: "0.75rem 1rem",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    buttonCopy: {
      backgroundColor: "#6b7280",
      color: "white",
      border: "none",
      borderRadius: "0.5rem",
      padding: "0.75rem 1rem",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    flexRow: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
    },
    flexWrap: {
      display: "flex",
      gap: "0.5rem",
      alignItems: "center",
      flexWrap: "wrap" as const,
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
    costoCard: {
      backgroundColor: "#dcfce7",
      border: "2px solid #16a34a",
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
            <div style={styles.header}>
              <h2 style={styles.title}>🥟 Calculadora de Empanadas</h2>
              <p style={styles.subtitle}>Organiza tu pedido de empanadas con amigos</p>
            </div>

            <div style={{
              backgroundColor: "#fff7ed",
              border: "1px solid #ffedd5",
              borderRadius: "0.5rem",
              padding: "0.75rem 1rem",
              marginBottom: "1rem",
              fontSize: "0.92rem",
              color: "#9a3412",
              textAlign: "center",
              lineHeight: "1.4"
            }}>
              💡 <strong>¿Cuántas empanadas por persona?</strong> Lo estándar para una juntada son <strong>3 a 4 empanadas por adulto</strong> (o 4 a 5 si comen bastante y no hay entrada).
            </div>

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>👥 Agregar Persona</h3>
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

            <div style={styles.card}>
              <h3 style={styles.cardTitle}>🥟 Tipos de Empanadas</h3>
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

            {personas.map((persona) => {
              const costoPersona = calcularCostoPersona(persona)
              const cantidadPersona = persona.empanadas.reduce((sum, emp) => sum + emp.cantidad, 0)

              return (
                  <div key={persona.id} style={styles.card}>
                    <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "1rem",
                        }}
                    >
                      <div>
                        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", margin: "0" }}>{persona.nombre}</h3>
                        {mostrarPrecios && cantidadPersona > 0 && (
                            <p style={{ color: "#16a34a", fontWeight: "600", margin: "0.25rem 0 0 0" }}>
                              💰 Debe pagar: ${costoPersona.toLocaleString()}
                            </p>
                        )}
                      </div>
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
                                <div>
                                  <span style={{ fontWeight: "500" }}>{empanada.tipo}</span>
                                  {mostrarPrecios && (
                                      <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                                        ${(empanada.cantidad * precioEfectivoPorEmpanada).toLocaleString()}
                                      </div>
                                  )}
                                </div>
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
                        <p style={{ color: "#6b7280", textAlign: "center", padding: "2rem" }}>
                          No hay empanadas seleccionadas
                        </p>
                    )}
                  </div>
              )
            })}

            {personas.length === 0 && (
                <div style={styles.card}>
                  <div style={{ textAlign: "center", padding: "2rem" }}>
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👥</div>
                    <p style={{ color: "#6b7280" }}>No hay personas agregadas. ¡Comienza agregando a tus amigos!</p>
                  </div>
                </div>
            )}

            {totalGeneral > 0 && (
                <div style={styles.totalCard}>
                  <h3 style={{ ...styles.cardTitle, color: "#9a3412" }}>📒 Resumen del Pedido</h3>
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

            {totalGeneral > 0 && (
                <div style={styles.card}>
                  <h3 style={styles.cardTitle}>💰 Configuración de Precio</h3>

                  <div style={{ marginBottom: "1rem" }}>
                    <div style={styles.flexRow}>
                      <button
                          style={{
                            ...styles.buttonSecondary,
                            backgroundColor: modoPrecio === "porEmpanada" ? "#ea580c" : "white",
                            color: modoPrecio === "porEmpanada" ? "white" : "#374151",
                          }}
                          onClick={() => setModoPrecio("porEmpanada")}
                      >
                        💰 Precio por empanada
                      </button>
                      <button
                          style={{
                            ...styles.buttonSecondary,
                            backgroundColor: modoPrecio === "total" ? "#ea580c" : "white",
                            color: modoPrecio === "total" ? "white" : "#374151",
                          }}
                          onClick={() => setModoPrecio("total")}
                      >
                        🧾 Precio total
                      </button>
                    </div>
                  </div>

                  {modoPrecio === "porEmpanada" ? (
                      <div style={styles.flexRow}>
                        <label style={{ fontSize: "1rem", fontWeight: "500" }}>Precio por empanada: $</label>
                        <input
                            style={styles.inputSmall}
                            type="number"
                            value={precioEmpanada}
                            onChange={(e) => setPrecioEmpanada(Number(e.target.value) || 0)}
                            min="0"
                            step="50"
                        />
                        {totalGeneral > 0 && (
                            <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                      = ${calcularPrecioTotalDesdeEmpanada().toLocaleString()} total
                    </span>
                        )}
                      </div>
                  ) : (
                      <div style={styles.flexRow}>
                        <label style={{ fontSize: "1rem", fontWeight: "500" }}>Precio total del pedido: $</label>
                        <input
                            style={styles.inputSmall}
                            type="number"
                            value={precioTotal}
                            onChange={(e) => setPrecioTotal(Number(e.target.value) || 0)}
                            min="0"
                            step="100"
                        />
                        {totalGeneral > 0 && (
                            <span style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                      = ${calcularPrecioPorEmpanada().toLocaleString()} por empanada
                    </span>
                        )}
                      </div>
                  )}

                  <div style={{ marginTop: "0.5rem" }}>
                    <button style={styles.buttonSecondary} onClick={() => setMostrarPrecios(!mostrarPrecios)}>
                      {mostrarPrecios ? "Ocultar precios" : "Mostrar precios"}
                    </button>
                  </div>
                </div>
            )}

            {totalGeneral > 0 && (
                <div style={styles.costoCard}>
                  <h3 style={{ ...styles.cardTitle, color: "#16a34a" }}>💰 Resumen de Costos</h3>

                  <div style={{ marginBottom: "1rem" }}>
                    <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          color: "#16a34a",
                          marginBottom: "1rem",
                        }}
                    >
                      <span>COSTO TOTAL</span>
                      <span>${costoTotal.toLocaleString()}</span>
                    </div>

                    <div style={{ fontSize: "0.9rem", color: "#16a34a", marginBottom: "1rem" }}>
                      {modoPrecio === "porEmpanada"
                          ? `${totalGeneral} empanadas × $${precioEmpanada.toLocaleString()} = $${costoTotal.toLocaleString()}`
                          : `Precio total: $${precioTotal.toLocaleString()} ÷ ${totalGeneral} empanadas = $${calcularPrecioPorEmpanada().toLocaleString()} c/u`}
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.5rem" }}>
                    <h4 style={{ color: "#16a34a", marginBottom: "0.5rem" }}>💸 Cuánto paga cada uno:</h4>
                    {personas.map((persona) => {
                      const costoPersona = calcularCostoPersona(persona)
                      const cantidadPersona = persona.empanadas.reduce((sum, emp) => sum + emp.cantidad, 0)

                      if (cantidadPersona > 0) {
                        return (
                            <div
                                key={persona.id}
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
                        <span style={{ fontWeight: "500" }}>
                          {persona.nombre} ({cantidadPersona} empanadas)
                        </span>
                              <span style={{ fontWeight: "bold", color: "#16a34a" }}>${costoPersona.toLocaleString()}</span>
                            </div>
                        )
                      }
                      return null
                    })}
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: "600", color: "#166534", marginBottom: "0.35rem" }}>
                      💳 Alias o CBU para cobrar (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: tu.alias.mp o 00000031..."
                      value={aliasTransferencia}
                      onChange={(e) => handleAliasChange(e.target.value)}
                      style={{
                        ...styles.input,
                        width: "100%",
                        backgroundColor: "white",
                        borderColor: "#86efac",
                        fontSize: "0.95rem",
                      }}
                    />
                    <p style={{ fontSize: "0.8rem", color: "#15803d", marginTop: "0.25rem", marginBottom: 0 }}>
                      Se incluirá automáticamente en el mensaje de WhatsApp para que te transfieran directo.
                    </p>
                  </div>

                  <div style={styles.flexWrap}>
                    <button
                        style={styles.buttonWhatsApp}
                        onClick={compartirWhatsApp}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#128c7e")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#25d366")}
                    >
                      📱 Compartir por WhatsApp
                    </button>
                    <button
                        style={styles.buttonCopy}
                        onClick={copiarMensaje}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4b5563")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6b7280")}
                    >
                      📋 Copiar mensaje
                    </button>
                  </div>
                </div>
            )}

            {personas.length > 0 && (
                <div style={{ textAlign: "center" }}>
                  <button style={{ ...styles.buttonSecondary, color: "#dc2626" }} onClick={limpiarTodo}>
                    Limpiar Todo
                  </button>
                </div>
            )}
          </div>
        </div>
      </>
  )
}
