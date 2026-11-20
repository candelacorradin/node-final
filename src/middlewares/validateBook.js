// VALIDACIÓN de los datos que manda el cliente en el body.
// Un middleware es una función que se ejecuta ANTES del controlador.
// Si algo está mal, corta y responde 400. Si está todo bien, llama a next() y sigue.

const validateBook = (req, res, next) => {
  const { title, author, year, genre, available } = req.body ?? {}
  const errors = []

  if (typeof title !== "string" || title.trim() === "") {
    errors.push("title es obligatorio y debe ser un texto")
  }

  if (typeof author !== "string" || author.trim() === "") {
    errors.push("author es obligatorio y debe ser un texto")
  }

  const currentYear = new Date().getFullYear()
  if (!Number.isInteger(year) || year < 0 || year > currentYear) {
    errors.push(`year es obligatorio y debe ser un número entero entre 0 y ${currentYear}`)
  }

  // genre y available son opcionales, pero si vienen tienen que tener el tipo correcto
  if (genre !== undefined && typeof genre !== "string") {
    errors.push("genre debe ser un texto")
  }

  if (available !== undefined && typeof available !== "boolean") {
    errors.push("available debe ser true o false")
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Datos inválidos", details: errors })
  }

  next()
}

export { validateBook }
