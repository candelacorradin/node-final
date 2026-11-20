// Lista de libros. No guarda estado: solo muestra lo que recibe por props.
function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
    return <p className="empty">No hay libros</p>
  }

  return (
    <ul className="book-list">
      {/* map: por cada libro, un <li>. La "key" ayuda a React a identificar cada elemento */}
      {books.map((book) => (
        <li key={book._id}>
          <div>
            <strong>{book.title}</strong>{' '}
            <span className={`badge ${book.available ? '' : 'off'}`}>
              {book.available ? 'Disponible' : 'Prestado'}
            </span>
            <br />
            <small>{book.author} · {book.year} · {book.genre}</small>
          </div>
          <div className="actions">
            <button className="secondary" onClick={() => onEdit(book)}>Editar</button>
            <button className="danger" onClick={() => onDelete(book._id)}>Borrar</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BookList
