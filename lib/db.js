import postgres from 'postgres'

const connectionConfig = [
  process.env.DATABASE_URL,
  process.env.NODE_ENV === 'production' && {
    ssl: {
      rejectUnauthorized: false
    },
    debug: process.env.NODE_ENV !== 'production'
  }
].filter(x => x !== undefined)

export const sql = postgres(...connectionConfig) // will use psql environment variables
