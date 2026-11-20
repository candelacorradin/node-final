import { Book } from "../models/bookModel.js"

const getBooks = async (req, res) => {
  const { author, genre, available } = req.query
  const filter = {}

  if (author) filter.author = { $regex: author, $options: "i" }
  if (genre) filter.genre = { $regex: genre, $options: "i" }
  if (available !== undefined) filter.available = available === "true"

  const books = await Book.find(filter)
  res.status(200).json(books)
}

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id)

  if (!book) {
    return res.status(404).json({ error: "Libro no encontrado" })
  }

  res.status(200).json(book)
}

const createBook = async (req, res) => {
  const { title, author, year, genre, available } = req.body
  const newBook = await Book.create({ title, author, year, genre, available })
  res.status(201).json(newBook)
}

const updateBook = async (req, res) => {
  const { title, author, year, genre, available } = req.body

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, year, genre, available },
    {
      new: true,
      runValidators: true
    }
  )

  if (!updatedBook) {
    return res.status(404).json({ error: "Libro no encontrado" })
  }

  res.status(200).json(updatedBook)
}

const deleteBook = async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id)

  if (!deletedBook) {
    return res.status(404).json({ error: "Libro no encontrado" })
  }

  res.status(200).json({ message: "Libro eliminado", book: deletedBook })
}

export { getBooks, getBookById, createBook, updateBook, deleteBook }
