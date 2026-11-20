import { useEffect, useState } from 'react'
import { getBooks, createBook, updateBook, deleteBook } from './api.js'
import BookForm from './components/BookForm.jsx'
import Filters from './components/Filters.jsx'
import BookList from './components/BookList.jsx'

function App() {
  const [books, setBooks] = useState([])
  const [filters, setFilters] = useState({ author: '', genre: '', available: '' })
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState(null)

  const loadBooks = async () => {
    const activeFilters = Object.fromEntries(Object.entries(filters).filter(([, value]) => value !== ''))
    try {
      setBooks(await getBooks(activeFilters))
    } catch (error) {
      setMessage({ text: error.message, type: 'error' })
    }
  }

  useEffect(() => {
    loadBooks()
  }, [filters])

  const handleSave = async (book) => {
    try {
      if (editing) {
        await updateBook(editing._id, book)
        setMessage({ text: 'Libro actualizado ✅', type: 'ok' })
      } else {
        await createBook(book)
        setMessage({ text: 'Libro creado ✅', type: 'ok' })
      }
      setEditing(null)
      loadBooks()
      return true
    } catch (error) {
      setMessage({ text: error.message, type: 'error' })
      return false
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que querés borrar este libro?')) return
    try {
      await deleteBook(id)
      loadBooks()
    } catch (error) {
      setMessage({ text: error.message, type: 'error' })
    }
  }

  const handleEdit = (book) => {
    setEditing(book)
    setMessage(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <header>
        <h1>📚 Biblioteca</h1>
        <p>Front en React que consume la API REST <code>/books</code></p>
      </header>

      <main>
        <BookForm
          editing={editing}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
          message={message}
        />

        <section className="card">
          <h2>Libros</h2>
          <Filters filters={filters} onChange={setFilters} />
          <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </main>
    </>
  )
}

export default App
