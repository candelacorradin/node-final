import { Router } from "express"
import { getBooks, getBookById, createBook, updateBook, deleteBook } from "../controllers/booksControllers.js"
import { validateBook } from "../middlewares/validateBook.js"
import { validateId } from "../middlewares/validateId.js"

const bookRouter = Router()

bookRouter.get("/", getBooks)
bookRouter.get("/:id", validateId, getBookById)
bookRouter.post("/", validateBook, createBook)
bookRouter.put("/:id", validateId, validateBook, updateBook)
bookRouter.delete("/:id", validateId, deleteBook)

export { bookRouter }
