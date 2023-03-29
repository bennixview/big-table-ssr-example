import { sql } from '../lib/db.js'

// As a prerequisite, please download the sample json from
// https://github.com/json-iterator/test-data/blob/master/large-file.json
import data from "../large-file.json" assert { type: 'json' };

try {
  for (const event of data) {
    await sql`
      INSERT INTO events ${sql(event, 'type', 'public', 'actor', 'repo', 'payload')}
    `
  }
} finally {
  await sql.end({ timeout: 5 })
}

