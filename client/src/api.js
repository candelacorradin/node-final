// Todas las llamadas a la API en un solo lugar.
// La URL es relativa ("/books") porque en producción el front y la API
// están en el mismo servidor, y en desarrollo el proxy de Vite la reenvía.
const API_URL = '/books'

// Hace el fetch y, si la API responde con error (400, 404, 500),
// tira un Error con el mensaje que mandó la API.
async function request(url, options) {
  const res = await fetch(url, options)
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.details ? data.details.join(' · ') : data.error)
  }
  return data
}

const jsonOptions = (method, body) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
})

export const getBooks = (filters) => request(`${API_URL}?${new URLSearchParams(filters)}`)
export const createBook = (book) => request(API_URL, jsonOptions('POST', book))
export const updateBook = (id, book) => request(`${API_URL}/${id}`, jsonOptions('PUT', book))
export const deleteBook = (id) => request(`${API_URL}/${id}`, { method: 'DELETE' })
