const express = require('express')
const cors = require('cors')
const recipeRoutes = require('./routes/recipe.js')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())

// -----------------
//   USO DE ROUTES
// -----------------
app.use(recipeRoutes)

// -----------------
//   SERVER LISTENING
// -----------------
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
