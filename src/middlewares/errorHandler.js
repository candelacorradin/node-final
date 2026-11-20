// MANEJO DE ERRORES centralizado.
// Express reconoce que es un middleware de errores porque recibe 4 parámetros (err, req, res, next).
// Cualquier error que pase en un controlador termina acá.

const errorHandler = (err, req, res, next) => {
  // Error de validación de Mongoose (no cumple el esquema)
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: "Datos inválidos", details: Object.values(err.errors).map(e => e.message) })
  }

  // JSON mal escrito en el body (ej: falta una coma)
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "El JSON enviado está mal formado" })
  }

  // Cualquier otro error: problema del servidor
  console.error(err)
  res.status(500).json({ error: "Error interno del servidor" })
}

// Para cualquier ruta que no exista
const notFound = (req, res) => {
  res.status(404).json({ error: `La ruta ${req.method} ${req.originalUrl} no existe` })
}

export { errorHandler, notFound }
