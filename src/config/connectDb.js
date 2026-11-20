import mongoose from "mongoose"

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ Conectado a MongoDB")
  } catch (error) {
    console.log("❌ Error al conectarse a MongoDB:", error.message)
    process.exit(1)
  }
}

export { connectDb }
