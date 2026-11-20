import { Book } from "../models/bookModel.js"

// CONTROLADOR (la "C" de MVC)
// Acá está la LÓGICA: qué hacer cuando llega cada petición.
// req → lo que manda el cliente (params, body, query)
// res → lo que le respondemos
//
// No hace falta try/catch: en Express 5, si una función async tira un error,
// Express lo manda solo al middleware de errores (src/middlewares/errorHandler.js).

// GET /books  → todos los libros (con filtros opcionales por query params)
// Ej: /books?author=borges&available=true
const getBooks = async (req, res) => {
  const { author, genre, available } = req.query
  const filter = {}

  // "i" = no distingue mayúsculas/minúsculas
  if (author) filter.author = { $regex: author, $options: "i" }
  if (genre) filter.genre = { $regex: genre, $options: "i" }
  if (available !== undefined) filter.available = available === "true"

  const books = await Book.find(filter)
  res.status(200).json(books)
}

// GET /books/:id → un libro
const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (!book) {
    return res.status(404).json({ error: "Libro no encontrado" })
  }

  res.status(200).json(book)
}

// POST /books → crear
const createBook = async (req, res) => {
  const { title, author, year, genre, available } = req.body
  const newBook = await Book.create({ title, author, year, genre, available })
  res.status(201).json(newBook) // 201 = Created
}

// PUT /books/:id → actualizar
const updateBook = async (req, res) => {
  const { title, author, year, genre, available } = req.body

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, year, genre, available },
    {
      new: true, // devuelve el libro YA actualizado (no el viejo)
      runValidators: true // aplica las reglas del esquema también al actualizar
    }
  )

  if (!updatedBook) {
    return res.status(404).json({ error: "Libro no encontrado" })
  }

  res.status(200).json(updatedBook)
}

// DELETE /books/:id → eliminar
const deleteBook = async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id)

  if (!deletedBook) {
    return res.status(404).json({ error: "Libro no encontrado" })
  }

  res.status(200).json({ message: "Libro eliminado", book: deletedBook })
}

export { getBooks, getBookById, createBook, updateBook, deleteBook }
