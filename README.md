# 📚 API Biblioteca

API REST para gestionar los libros de una biblioteca. Permite crear, listar, buscar, actualizar y eliminar libros.

Trabajo práctico final del curso de Node.js (UTN).

## Tecnologías

- **Node.js**: entorno para ejecutar JavaScript en el servidor
- **Express 5**: framework para crear el servidor y las rutas
- **MongoDB**: base de datos
- **Mongoose**: modelado de datos y validaciones del esquema

## Estructura del proyecto (MVC)

```
src/
├── config/
│   └── connectDb.js          # Conexión a MongoDB
├── models/
│   └── bookModel.js          # Modelo: estructura de un libro
├── controllers/
│   └── booksControllers.js   # Controlador: lógica de cada operación
├── routes/
│   └── bookRouter.js         # Rutas: URL + método → controlador
├── middlewares/
│   ├── validateBook.js       # Valida el body antes de crear/actualizar
│   ├── validateId.js         # Valida que el ID tenga formato de MongoDB
│   └── errorHandler.js       # Manejo centralizado de errores y rutas inexistentes
└── index.js                  # Punto de entrada: arma y levanta el servidor
```

La **vista** en una API REST son las respuestas en formato JSON que reciben los clientes.

## Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd api-biblioteca
   ```
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Crear el archivo `.env` a partir del ejemplo y completar los valores:
   ```bash
   cp .env.example .env
   ```
4. Levantar el servidor:
   ```bash
   npm run dev
   ```
   El servidor queda en `http://localhost:3000`.

> Requiere Node.js 22 o superior (las variables de entorno se cargan con el flag nativo `--env-file`).

## Variables de entorno

| Variable    | Descripción                    | Ejemplo                                   |
|-------------|--------------------------------|-------------------------------------------|
| `PORT`      | Puerto del servidor            | `3000`                                    |
| `MONGO_URI` | URL de conexión a MongoDB      | `mongodb://localhost:27017/biblioteca`    |

## Endpoints

| Método | Ruta          | Descripción                 | Respuesta OK |
|--------|---------------|-----------------------------|--------------|
| GET    | `/books`      | Lista todos los libros      | 200          |
| GET    | `/books/:id`  | Obtiene un libro por su ID  | 200          |
| POST   | `/books`      | Crea un libro               | 201          |
| PUT    | `/books/:id`  | Actualiza un libro          | 200          |
| DELETE | `/books/:id`  | Elimina un libro            | 200          |

### Filtros (query params)

`GET /books` acepta filtros opcionales:

- `?author=borges`: libros cuyo autor contiene "borges" (sin distinguir mayúsculas)
- `?genre=novela`: filtra por género
- `?available=true` o `?available=false`: filtra por disponibilidad

Se pueden combinar: `/books?author=cortazar&available=true`

### Ejemplo de body (POST / PUT)

```json
{
  "title": "Ficciones",
  "author": "Jorge Luis Borges",
  "year": 1944,
  "genre": "Cuentos",
  "available": true
}
```

`title`, `author` y `year` son obligatorios. `genre` y `available` son opcionales.

## Errores

| Código | Cuándo                                                       |
|--------|--------------------------------------------------------------|
| 400    | Datos inválidos, ID con formato incorrecto o JSON mal formado |
| 404    | El libro no existe o la ruta no existe                       |
| 500    | Error interno del servidor                                   |

Ejemplo:

```json
{
  "error": "Datos inválidos",
  "details": ["title es obligatorio y debe ser un texto"]
}
```
