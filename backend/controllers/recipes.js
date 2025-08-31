// import { RecipeModel } from '../models/json/recipe.js'
import { RecipeModel } from '../models/mysql/recipe.js'
import { validatePartialsRecipe, validateRecipe } from '../schemas/recipeSchema.js'

export class RecipeController {
  static async getRecipes (req, res) {
    const { title, ingredient, difficulty, time_lte } = req.query
    const recipes = await RecipeModel.getRecipes({ title, ingredient, difficulty, time_lte })

    return res.json(recipes)
  }

  static async getById (req, res) {
    const { id } = req.params

    const recipe = await RecipeModel.getById({ id })

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    return res.json(recipe)
  }

  static async create (req, res) {
    const result = validateRecipe(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newRecipe = await RecipeModel.create({ input: result.data })

    return res.status(201).json(newRecipe)
  }

  static async update (req, res) {
    const { id } = req.params
    const result = validateRecipe(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const updatedRecipe = await RecipeModel.update({ id, input: result.data })
    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    return res.json(updatedRecipe)
  }

  static async partialUpdate (req, res) {
    const { id } = req.params
    const result = validatePartialsRecipe(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const updatedRecipe = await RecipeModel.partialUpdate({ id, input: result.data })
    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }

    return res.json(updatedRecipe)
  }

  static async delete (req, res) {
    const { id } = req.params
    const recipeDeleted = await RecipeModel.delete({ id })

    if (!recipeDeleted) {
      return res.status(404).json('Recipe not found')
    }

    return res.json(recipeDeleted)
  }
}
