import { Router } from 'express'
import { validateRecipe, validatePartialsRecipe } from '../schemas/recipeSchema.js'
import { readJSON } from '../utils/readJson.js'

const recipes = readJSON('../mock/recipes.json')
export const recipesRouter = Router()

// -------------
//   FILTROS
// -------------
recipesRouter.get('/', (req, res) => {
  const { title, ingredient, difficulty, time_lte } = req.query

  // Filtro por titulo
  if (title) {
    const filteredRecipes = recipes.filter(
      recipe => recipe.title.toLowerCase().includes(title.trim().toLowerCase())
    )

    return res.json(filteredRecipes)
  }

  // Filtro por ingrediente
  if (ingredient) {
    const filteredRecipes = recipes.filter(
      recipe => recipe.ingredients.some(i => i.toLowerCase().includes(ingredient.trim().toLowerCase()))
    )

    return res.json(filteredRecipes)
  }

  // Filtro por dificultad
  if (difficulty) {
    const filteredRecipes = recipes.filter(
      recipe => recipe.difficulty.toLowerCase().includes(difficulty.trim().toLowerCase())
    )

    return res.json(filteredRecipes)
  }

  // Filtro por tiempo limite
  if (time_lte) {
    const filteredRecipes = recipes.filter(recipe => recipe.time <= parseInt(time_lte))

    return res.json(filteredRecipes)
  }

  // si no hay filtros -> obtener todas las recetas
  return res.json(recipes)
})

// -------------
//   BUSQUEDA
// -------------

// Obtener una receta por ID.
recipesRouter.get('/:id', (req, res) => {
  const { id } = req.params

  const recipe = recipes.find(recipe => recipe.id === id)

  if (!recipe) {
    return res.status(404).json('Receta no encontrada')
  }

  return res.json(recipe)
})

// -------------
//   CREACION
// -------------
recipesRouter.post('/', (req, res) => {
  const result = validateRecipe(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newRecipe = {
    id: crypto.randomUUID(),
    ...result.data
  }

  recipes.push(newRecipe)

  return res.status(201).json(newRecipe)
})

// ------------------------
//   ACTUALIZACIÓN (PUT)
// ------------------------
recipesRouter.put('/:id', (req, res) => {
  const { id } = req.params
  const recipeId = recipes.findIndex(recipe => recipe.id === id)

  if (recipeId === -1) {
    return res.status(404).json({ error: 'Recipe not found' })
  }

  const result = validateRecipe(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const updatedRecipe = {
    id: recipes[recipeId].id,
    ...result.data
  }

  recipes[recipeId] = updatedRecipe

  return res.json(updatedRecipe)
})

// ------------------------
//   ACTUALIZACIÓN (PATCH)
// ------------------------
recipesRouter.patch('/:id', (req, res) => {
  const { id } = req.params
  const recipeId = recipes.findIndex(recipe => recipe.id === id)

  if (recipeId === -1) {
    return res.status(404).json({ error: 'Recipe not found' })
  }

  const result = validatePartialsRecipe(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const updatedRecipe = {
    ...recipes[recipeId],
    ...result.data
  }

  recipes[recipeId] = updatedRecipe

  return res.json(updatedRecipe)
})

// -------------
//   ELIMINACION
// -------------

recipesRouter.delete('/:id', (req, res) => {
  const { id } = req.params

  const recipeId = recipes.findIndex(recipe => recipe.id === id)

  if (recipeId === -1) {
    return res.status(404).json('Receta no encontrada')
  }

  const recipeDeleted = recipes[recipeId]

  recipes.splice(recipeId, 1)
  return res.json(recipeDeleted)
})
