const express = require('express')
const cors = require('cors')
const recipes = require('./mock/recipes.json')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())

// Obtener todas las recetas
app.get('/recipes', (req, res) => {
  const { title, ingredient, difficulty, time_lte } = req.query

  if (title) {
    const filteredRecipes = recipes.filter(
      recipe => recipe.title.toLowerCase().includes(title.trim().toLowerCase())
    )

    return res.json(filteredRecipes)
  }

  if (ingredient) {
    const filteredRecipes = recipes.filter(
      recipe => recipe.ingredients.some(i => i.toLowerCase().includes(ingredient.trim().toLowerCase()))
    )

    return res.json(filteredRecipes)
  }

  if (difficulty) {
    const filteredRecipes = recipes.filter(
      recipe => recipe.difficulty.toLowerCase().includes(difficulty.trim().toLowerCase())
    )

    return res.json(filteredRecipes)
  }

  if (time_lte) {
    const filteredRecipes = recipes.filter(recipe => recipe.time <= parseInt(time_lte))

    return res.json(filteredRecipes)
  }

  return res.json(recipes)
})

// Obtener una receta por ID.
app.get('/recipes/:id', (req, res) => {
  const { id } = req.params

  const recipe = recipes.find(recipe => recipe.id === id)

  if (!recipe) {
    return res.status(404).json('Receta no encontrada')
  }

  return res.json(recipe)
})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
