import { Router } from "express"
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/booksControllers.js"
import { validateBook } from "../middlewares/validateBook.js"
import { validateId } from "../middlewares/validateId.js"

// RUTAS
// Solo dicen: "si llega este MÉTODO a esta URL, pasalo por estos middlewares y después al controlador".
// La lógica NO va acá, va en el controlador.
const bookRouter = Router()

// Todas estas rutas empiezan con /books (lo definimos en index.js)
bookRouter.get("/", getBooks)
bookRouter.get("/:id", validateId, getBookById)
bookRouter.post("/", validateBook, createBook)
bookRouter.put("/:id", validateId, validateBook, updateBook)
bookRouter.delete("/:id", validateId, deleteBook)

export { bookRouter }
