import express from "express"
import { connectDb } from "./config/connectDb.js"
import { bookRouter } from "./routes/bookRouter.js"
import { errorHandler, notFound } from "./middlewares/errorHandler.js"

const PORT = process.env.PORT || 3000

const server = express()
server.use(express.json())

server.use(express.static("client/dist"))

server.use("/books", bookRouter)

server.use(notFound)
server.use(errorHandler)

await connectDb()
server.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`)
})
