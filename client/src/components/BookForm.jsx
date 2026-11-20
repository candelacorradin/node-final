import { useEffect, useState } from 'react'

const emptyForm = { title: '', author: '', year: '', genre: '', available: true }

function BookForm({ editing, onSave, onCancel, message }) {
  const [form, setForm] = useState(emptyForm)

  useEffect(() => {
    setForm(editing ? { ...editing, genre: editing.genre ?? '' } : emptyForm)
  }, [editing])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const book = {
      title: form.title,
      author: form.author,
      year: Number(form.year),
      available: form.available
    }
    if (form.genre) book.genre = form.genre

    const ok = await onSave(book)
    if (ok) setForm(emptyForm)
  }

  return (
    <section className="card">
      <h2>{editing ? 'Editar libro' : 'Agregar libro'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Título <input name="title" value={form.title} onChange={handleChange} required /></label>
        <label>Autor <input name="author" value={form.author} onChange={handleChange} required /></label>
        <label>Año <input name="year" type="number" value={form.year} onChange={handleChange} required /></label>
        <label>Género <input name="genre" value={form.genre} onChange={handleChange} /></label>
        <label className="check">
          <input name="available" type="checkbox" checked={form.available} onChange={handleChange} /> Disponible
        </label>

        <div className="actions">
          <button type="submit">Guardar</button>
          {editing && <button type="button" className="secondary" onClick={onCancel}>Cancelar edición</button>}
        </div>

        {message && <p className={`message ${message.type}`}>{message.text}</p>}
      </form>
    </section>
  )
}

export default BookForm
