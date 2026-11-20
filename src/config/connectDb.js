import mongoose from "mongoose"

// La URL de la base de datos sale del archivo .env (variable MONGO_URI),
// así no queda escrita en el código ni se sube a GitHub.
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ Conectado a MongoDB")
  } catch (error) {
    console.log("❌ Error al conectarse a MongoDB:", error.message)
    process.exit(1) // si no hay base de datos, no tiene sentido seguir
  }
}

export { connectDb }
