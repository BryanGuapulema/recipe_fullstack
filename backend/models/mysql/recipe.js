import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'recipedb'

}

const connection = await mysql.createConnection(config)

export class RecipeModel {
  // ----------------
  //   FILTROS
  // ----------------
  static async getRecipes ({ title, ingredient, difficulty, time_lte }) {
    // ----------------
    //   FILTRO: TITULO
    // ----------------
    if (title) {
      const titleLower = title.toLowerCase()
      const [recipes] = await connection.query(
        'SELECT * FROM recipe WHERE LOWER(title) LIKE ?', [`%${titleLower}%`]
      )
      return recipes
    }

    // ----------------
    //   FILTRO: INGREDIENTE
    // ----------------
    if (ingredient) {
      const ingredientsLower = ingredient.toLowerCase()
      const [recipes] = await connection.query(
        'SELECT * FROM recipe WHERE LOWER(ingredients) LIKE ?', [`%${ingredientsLower}%`]
      )
      return recipes
    }

    // ----------------
    //   FILTRO: DIFICULTAD
    // ----------------
    if (difficulty) {
      const difficultyLower = difficulty.toLowerCase()
      const [recipes] = await connection.query(
        'SELECT * FROM recipe WHERE LOWER(difficulty) LIKE ?', [`%${difficultyLower}%`]
      )
      return recipes
    }

    // ----------------
    //   FILTRO: TIEMPO
    // ----------------
    if (time_lte) {
      const [recipes] = await connection.query(
        'SELECT * FROM recipe WHERE time <= ?', [time_lte]
      )
      return recipes
    }

    // ----------------
    //   OBTENER TODAS
    // ----------------
    // si no hay filtros -> obtener todas las recetas
    const [recipes] = await connection.query(
      'SELECT * FROM recipe'
    )

    return recipes
  }

  // -------------
  //   BUSQUEDA
  // -------------
  static async getById ({ id }) {
    // Obtener una receta por ID.
    const [recipe] = await connection.query(
      'SELECT * FROM recipe WHERE id = ?;', [id]
    )

    if (recipe.length > 0) return recipe
  }

  // -------------
  //   CREACION
  // -------------
  static async create ({ input }) {
    // INSERT INTO recipe(title, ingredients, instructions, time ,difficulty) VALUES ("title", "Ingrediente 1, Ingrediente 2, Ingrediente3","A lot of isntrucctions step by step",30,"easy")
    const [uuidResult] = await connection.query('SELECT UUID() uuid')
    const [{ uuid }] = uuidResult
    const {
      title,
      ingredients,
      instructions,
      time,
      difficulty
    } = input

    try {
      await connection.query(
        'INSERT INTO recipe(id, title, ingredients, instructions, time ,difficulty) VALUES (?,?,?,?,?,?)', [uuid, title, ingredients.join(), instructions, time, difficulty]
      )
    } catch (error) {
      throw new Error('Error reating movie')
    }

    const [recipe] = await connection.query(
      'SELECT * FROM recipe WHERE id = ?;', [uuid]
    )
    return recipe
  }

  // ------------------------
  //   ACTUALIZACIÓN (PUT)
  // ------------------------
  static async update ({ id, input }) {

  }

  // ------------------------
  //   ACTUALIZACIÓN (PATCH)
  // ------------------------
  static async partialUpdate ({ id, input }) {

  }

  // -------------
  //   ELIMINACION
  // -------------
  static async delete ({ id }) {

  }
}
