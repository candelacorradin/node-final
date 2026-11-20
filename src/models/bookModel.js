import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    year: { type: Number, required: true, min: 0 },
    genre: { type: String, default: "Sin género", trim: true },
    available: { type: Boolean, default: true }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const Book = mongoose.model("Book", bookSchema)

export { Book }
