const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ error: "Datos inválidos", details: Object.values(err.errors).map(e => e.message) })
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "El JSON enviado está mal formado" })
  }

  console.error(err)
  res.status(500).json({ error: "Error interno del servidor" })
}

const notFound = (req, res) => {
  res.status(404).json({ error: `La ruta ${req.method} ${req.originalUrl} no existe` })
}

export { errorHandler, notFound }
