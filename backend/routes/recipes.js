import { Router } from 'express'
import { RecipeController } from '../controllers/recipes.js'

export const recipesRouter = Router()

recipesRouter.get('/', RecipeController.getRecipes)
recipesRouter.get('/:id', RecipeController.getById)
recipesRouter.post('/', RecipeController.create)
recipesRouter.put('/:id', RecipeController.update)
recipesRouter.patch('/:id', RecipeController.partialUpdate)
recipesRouter.delete('/:id', RecipeController.delete)
