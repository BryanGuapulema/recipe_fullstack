import { readJSON } from '../../utils/readJson.js'

const recipes = readJSON('../mock/recipes.json')

export class RecipeModel {
  // ----------------
  //   FILTROS
  // ----------------
  static async getRecipes ({ title, ingredient, difficulty, time_lte }) {
    // ----------------
    //   FILTRO: TITULO
    // ----------------
    if (title) {
      return recipes.filter(
        recipe => recipe.title.toLowerCase().includes(title.trim().toLowerCase())
      )
    }

    // ----------------
    //   FILTRO: INGREDIENTE
    // ----------------
    if (ingredient) {
      return recipes.filter(
        recipe => recipe.ingredients.some(i => i.toLowerCase().includes(ingredient.trim().toLowerCase()))
      )
    }

    // ----------------
    //   FILTRO: DIFICULTAD
    // ----------------
    if (difficulty) {
      return recipes.filter(
        recipe => recipe.difficulty.toLowerCase().includes(difficulty.trim().toLowerCase())
      )
    }

    // ----------------
    //   FILTRO: TIEMPO
    // ----------------
    if (time_lte) {
      return recipes.filter(recipe => recipe.time <= parseInt(time_lte))
    }

    // ----------------
    //   OBTENER TODAS
    // ----------------
    // si no hay filtros -> obtener todas las recetas
    return recipes
  }

  // -------------
  //   BUSQUEDA
  // -------------
  static async getById ({ id }) {
    // Obtener una receta por ID.
    const recipe = recipes.find(recipe => recipe.id === id)
    if (recipe) return recipe
  }

  // -------------
  //   CREACION
  // -------------
  static async create ({ input }) {
    const newRecipe = {
      id: crypto.randomUUID(),
      ...input
    }

    recipes.push(newRecipe)

    return newRecipe
  }

  // ------------------------
  //   ACTUALIZACIÓN (PUT)
  // ------------------------
  static async update ({ id, input }) {
    const recipeId = recipes.findIndex(recipe => recipe.id === id)

    if (recipeId !== -1) {
      const updatedRecipe = {
        id: recipes[recipeId].id,
        ...input
      }

      recipes[recipeId] = updatedRecipe
      return updatedRecipe
    }
  }

  // ------------------------
  //   ACTUALIZACIÓN (PATCH)
  // ------------------------
  static async partialUpdate ({ id, input }) {
    const recipeId = recipes.findIndex(recipe => recipe.id === id)

    if (recipeId !== -1) {
      const updatedRecipe = {
        ...recipes[recipeId],
        ...input
      }

      recipes[recipeId] = updatedRecipe
      return updatedRecipe
    }
  }

  // -------------
  //   ELIMINACION
  // -------------
  static async delete ({ id }) {
    const recipeId = recipes.findIndex(recipe => recipe.id === id)

    if (recipeId !== -1) {
      const recipeDeleted = recipes[recipeId]

      recipes.splice(recipeId, 1)
      return recipeDeleted
    }
  }
}
