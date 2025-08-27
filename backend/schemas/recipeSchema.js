const z = require('zod')

const recipeSchema = z.object({
  title: z.string().min(1, 'Muy corto').max(100, 'Muy largo'),
  ingredients: z.array(z.string(), 'Los ingredientes deben estar en un array').min(2, 'Se necesitam al menos dos ingredientes'),
  instructions: z.string().min(20, 'El contenido debe ser de al menos 20 caracteres'),
  time: z.number().positive('el tiempo debe ser positivo'),
  difficulty: z.enum(['easy', 'medium', 'hard'], 'la dificultad solo puede ser del tipo: easy, medium,hard')
})

function validateRecipe (object) {
  return recipeSchema.safeParse(object)
}

function validatePartialsRecipe (object) {
  return recipeSchema.partial().safeParse(object)
}

module.exports = {
  validateRecipe,
  validatePartialsRecipe
}
