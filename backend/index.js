import express, { json } from 'express'
import cors from 'cors'
import recipeRoutes from './routes/recipe.js'

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(json())

// -----------------
//   ROUTING
// -----------------
app.use(recipeRoutes)

// -----------------
//   SERVER LISTENING
// -----------------
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
