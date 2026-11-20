import mongoose from "mongoose"

// MODELO (la "M" de MVC)
// El esquema define CÓMO tiene que ser un libro en la base de datos.
// Mongoose usa estas reglas para validar antes de guardar.
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 0 },
    genre: { type: String, default: "Sin género", trim: true },
    available: { type: Boolean, default: true } // ¿está disponible para prestar?
  },
  {
    versionKey: false, // saca el campo "__v" que agrega Mongoose
    timestamps: true // agrega createdAt y updatedAt automáticamente
  }
)

// El modelo es el objeto que usamos para hablar con la colección "books":
// Book.find(), Book.findById(), Book.create(), Book.findByIdAndUpdate(), Book.findByIdAndDelete()
const Book = mongoose.model("Book", bookSchema)

export { Book }
