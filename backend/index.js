const express = require('express')

const PORT = process.env.PORT ?? 1234

const app = express()

app.get('/', (req, res) => {
  res.json({ message: 'hola' })
})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
