"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, Users, Calculator, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
      // Eliminar empanada si la cantidad es 0 o menor
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
    // También eliminar este tipo de todas las personas
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

  return (
    <>
      <RegisterSW />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-orange-800 flex items-center justify-center gap-2">
              🥟 Calculadora de Empanadas
            </h1>
            <p className="text-orange-600">Organiza tu pedido de empanadas con amigos</p>
          </div>

          {/* Agregar persona */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Agregar Persona
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Nombre de la persona"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && agregarPersona()}
                  className="flex-1"
                />
                <Button onClick={agregarPersona} disabled={!nuevoNombre.trim()}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Gestionar tipos de empanadas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🥟 Tipos de Empanadas</CardTitle>
              <CardDescription>Agrega tipos personalizados para lugares con opciones especiales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mostrar tipos personalizados existentes */}
              {tiposPersonalizados.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm text-gray-700">Tipos personalizados:</h4>
                  <div className="flex flex-wrap gap-2">
                    {tiposPersonalizados.map((tipo) => (
                      <div
                        key={tipo}
                        className="flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                      >
                        <span>{tipo}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarTipoPersonalizado(tipo)}
                          className="h-4 w-4 p-0 hover:bg-orange-200"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Botón para mostrar/ocultar formulario */}
              <Button variant="outline" onClick={() => setMostrarFormTipo(!mostrarFormTipo)} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                {mostrarFormTipo ? "Cancelar" : "Agregar Tipo Personalizado"}
              </Button>

              {/* Formulario para agregar tipo */}
              {mostrarFormTipo && (
                <div className="flex gap-2 p-4 bg-gray-50 rounded-lg">
                  <Input
                    placeholder="Ej: Roquefort y Nuez, Cordero, etc."
                    value={nuevoTipo}
                    onChange={(e) => setNuevoTipo(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && agregarTipoPersonalizado()}
                    className="flex-1"
                  />
                  <Button
                    onClick={agregarTipoPersonalizado}
                    disabled={!nuevoTipo.trim() || todosLosTipos.includes(nuevoTipo.trim())}
                  >
                    Agregar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Lista de personas */}
          <div className="grid gap-4">
            {personas.map((persona) => (
              <Card key={persona.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{persona.nombre}</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => eliminarPersona(persona.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selector para agregar empanadas */}
                  <div className="flex gap-2">
                    <Select onValueChange={(tipo) => agregarEmpanada(persona.id, tipo)}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Seleccionar tipo de empanada" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposEmpanadas.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                        {tiposPersonalizados.length > 0 && (
                          <>
                            <div className="px-2 py-1 text-xs font-semibold text-gray-500 border-t">Personalizados</div>
                            {tiposPersonalizados.map((tipo) => (
                              <SelectItem key={tipo} value={tipo}>
                                {tipo} ✨
                              </SelectItem>
                            ))}
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Lista de empanadas de la persona */}
                  {persona.empanadas.length > 0 && (
                    <div className="space-y-2">
                      {persona.empanadas.map((empanada) => (
                        <div
                          key={empanada.id}
                          className="flex items-center justify-between bg-orange-50 p-3 rounded-lg"
                        >
                          <span className="font-medium">{empanada.tipo}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => modificarCantidad(persona.id, empanada.id, empanada.cantidad - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-bold">{empanada.cantidad}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => modificarCantidad(persona.id, empanada.id, empanada.cantidad + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {persona.empanadas.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No hay empanadas seleccionadas</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {personas.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">No hay personas agregadas. ¡Comienza agregando a tus amigos!</p>
              </CardContent>
            </Card>
          )}

          {/* Resumen total */}
          {totalGeneral > 0 && (
            <Card className="bg-orange-100 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Calculator className="w-5 h-5" />
                  Resumen del Pedido
                </CardTitle>
                <CardDescription>Total para llamar y pedir</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(totales).map(([tipo, cantidad]) => (
                  <div key={tipo} className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="font-medium">{tipo}</span>
                    <span className="font-bold text-orange-700">{cantidad} empanadas</span>
                  </div>
                ))}
                <div className="border-t pt-3">
                  <div className="flex justify-between items-center text-lg font-bold text-orange-800">
                    <span>TOTAL GENERAL</span>
                    <span>{totalGeneral} empanadas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botón limpiar */}
          {personas.length > 0 && (
            <div className="text-center">
              <Button
                variant="outline"
                onClick={limpiarTodo}
                className="text-red-600 hover:text-red-700 bg-transparent"
              >
                Limpiar Todo
              </Button>
            </div>
          )}

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-orange-200 text-center">
            <p className="text-sm text-gray-600">
              Hecho con ❤️ por{" "}
              <a
                href="https://sebiglesias.com.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 hover:underline"
              >
                Sebastián Iglesias
              </a>
            </p>
            <p className="text-xs text-gray-500 mt-1">Software Engineer • Argentina</p>
          </footer>
        </div>
      </div>
    </>
  )
}

