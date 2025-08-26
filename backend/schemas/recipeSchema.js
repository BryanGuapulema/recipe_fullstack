const z = require('zod')

const recipeSchema = z.object({
  title: z.string().min(1).max(100),
  ingredients: z.array(z.string()).min(2),
  instructions: z.string().min(20),
  time: z.number().positive(),
  difficulty: z.enum(['easy', 'medium', 'hard'])
})

function validateRecipe (object) {
  return recipeSchema.safeParse(object)
}

module.exports = {
  validateRecipe
}
