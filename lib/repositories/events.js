import { sql } from '../db.js'

const fieldToProperty = (prop) => {
  switch (prop) {
    case 'id':
      return 'id'
    case 'type':
      return 'type'
    case 'actor.login':
      return "actor->>'login'"
    case 'created_at':
      return 'created_at'
    default:
      throw new Error(`unknown property: ${prop}`)
  }
}

const filterQuery = (filters = {}) => {
  if (!Object.values(filters).some(f => f !== '')) return sql``

  return sql`WHERE 1 = 1
    ${isSet(filters.id) ? sql`AND id::varchar(255) ILIKE ${filters.id + '%'}` : sql``}
    ${isSet(filters.type) ? sql`AND type ILIKE ${filters.type + '%'}` : sql``}
    ${isSet(filters.created_at) ? sql`AND created_at::varchar(255) ILIKE ${filters.created_at + '%'}` : sql``}
    ${isSet(filters['actor.login']) ? sql`AND actor ->> 'login' ILIKE ${filters['actor.login'] + '%'}` : sql``}
  `
}

export class EventStore {
  async get (id) { return await sql`SELECT * FROM events WHERE id = ${id}` }

  async getAll ({ filters, sortBy, order, page, size = 1000 } = {}) {
    try {
      const events = await sql`
      SELECT
        id, type, public, actor, repo, payload, created_at
      FROM events

      ${filterQuery(filters)}

      ${isSet(sortBy) ? sql`ORDER BY ${sql.unsafe(fieldToProperty(sortBy))} ${order === 'asc' ? sql`ASC` : sql`DESC`}` : sql``}
      ${isSet(page) ? sql`OFFSET ${parseInt(page) * parseInt(size)}` : sql``}
      ${isSet(size) ? sql`LIMIT ${parseInt(size)}` : sql``}
    `
      return events
    } catch (e) {
      console.error(e.query)
      return []
    }
  }

  async getTypes () {
    try {
      const types = await sql`
        SELECT DISTINCT type FROM events
      `
      return types.map(t => t.type)
    } catch (e) {
      console.error(e.query)
      return []
    }
  }

  async getActors (search = '') {
    try {
      const actors = await sql`
        SELECT DISTINCT actor ->> 'login' as login FROM events
        WHERE actor ->> 'login' ILIKE ${search + '%'}
      `
      return actors.map(a => a.login)
    } catch (e) {
      console.error(e.query)
      return []
    }
  }
}

function isSet (val) {
  return val !== undefined && val !== null && val !== ''
}
