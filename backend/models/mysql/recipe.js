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
      return
    }

    // ----------------
    //   FILTRO: INGREDIENTE
    // ----------------
    if (ingredient) {
      return
    }

    // ----------------
    //   FILTRO: DIFICULTAD
    // ----------------
    if (difficulty) {
      return
    }

    // ----------------
    //   FILTRO: TIEMPO
    // ----------------
    if (time_lte) {
      return ',fmsa'
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

  }

  // -------------
  //   CREACION
  // -------------
  static async create ({ input }) {

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
