import express from "express"
import { connectDb } from "./config/connectDb.js"
import { bookRouter } from "./routes/bookRouter.js"
import { errorHandler, notFound } from "./middlewares/errorHandler.js"

// Las variables de entorno (.env) se cargan solas con el flag --env-file
// que pusimos en los scripts de package.json.
const PORT = process.env.PORT || 3000

const server = express()
server.use(express.json()) // permite leer el body en formato JSON

// Ruta de bienvenida
server.get("/", (req, res) => {
  res.json({ message: "API Biblioteca funcionando 📚", endpoints: "/books" })
})

// Toda petición que empiece con /books va al router de libros
server.use("/books", bookRouter)

// Estos dos van SIEMPRE al final:
server.use(notFound) // ninguna ruta coincidió → 404
server.use(errorHandler) // algún controlador tiró error → acá se responde

// Primero conectamos a la base y recién después escuchamos peticiones
await connectDb()
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
})
