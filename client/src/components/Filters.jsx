function Filters({ filters, onChange }) {
  const handleChange = (event) => {
    onChange({ ...filters, [event.target.name]: event.target.value })
  }

  return (
    <div className="filters">
      <input name="author" placeholder="Filtrar por autor" value={filters.author} onChange={handleChange} />
      <input name="genre" placeholder="Filtrar por género" value={filters.genre} onChange={handleChange} />
      <select name="available" value={filters.available} onChange={handleChange}>
        <option value="">Todos</option>
        <option value="true">Disponibles</option>
        <option value="false">Prestados</option>
      </select>
    </div>
  )
}

export default Filters
