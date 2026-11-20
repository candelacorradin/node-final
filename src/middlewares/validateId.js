import mongoose from "mongoose"

const validateId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "El ID no es válido" })
  }
  next()
}

export { validateId }
