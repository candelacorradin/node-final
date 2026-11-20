const API_URL = '/books'

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
