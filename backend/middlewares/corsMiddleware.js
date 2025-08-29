import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }

    // cuando se hace una solicitud PUT,PATCH, DELETE no envia origen
    if (!origin) return callback(null, true)

    return callback(new Error('Not allowed by cors'))
  }
})
