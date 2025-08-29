import express, { json } from 'express'
import { recipesRouter } from './routes/recipes.js'
import { corsMiddleware } from './middlewares/corsMiddleware.js'

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')
app.use(corsMiddleware({ acceptedOrigins: ['http://localhost:3000'] }))

app.use(json())

// -----------------
//   ROUTING
// -----------------
app.use('/recipes', recipesRouter)

// -----------------
//   SERVER LISTENING
// -----------------
app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
