import mongoose from "mongoose"

// Valida que el :id de la URL tenga el formato de un ID de MongoDB
// (24 caracteres hexadecimales, ej: 665f1c2b9a1e4b0012345678).
// Sin esto, Mongoose tiraría un error feo al buscar con un id tipo "hola".
const validateId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "El ID no es válido" })
  }
  next()
}

export { validateId }
