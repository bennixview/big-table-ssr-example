import express from 'express'
// import helmet from 'helmet'
import morgan from 'morgan'
import 'pug'
import { EventStore } from './lib/repositories/events.js'
import { assetUrl } from './lib/assets.js'

const app = express()
app.locals = { assetUrl }

// app.use(helmet()) //TODO: reactivate helmet, but has to allow foreign scripts (for e.g. custom elements polyfill)
app.use(morgan('combined'))
app.set('view engine', 'pug')
app.set('views', './views')

app.use('/images', express.static('./images', { cacheControl: 'public, max-age=31536000, immutable' }))
app.use('/assets', express.static('./dist/assets', { cacheControl: 'public, max-age=31536000, immutable' }))

const store = new EventStore()

export default config => {
  app.get('/', async (req, res) => {
    const { page, size, filters = {}, sort } = req.query
    console.log('request-params', { page, size, filters, sort })

    const [sortBy, order] = sort ? sort.split(':') : []
    const events = await store.getAll({ page, size, filters, sortBy, order })

    res.render('index', { events, filters, sortBy, order })
  })

  app.get('/types', async (req, res) => {
    const types = await store.getTypes()
    const results = types.map(type => ({ text: type, value: type }))
    res.json(results)
  })

  app.get('/actors', async (req, res) => {
    const { q } = req.query
    if (!q || q.length < 2) {
      res.status(400)
      return res.json({ error: 'search term must be at least 2 characters' })
    }
    const actors = await store.getActors(q)
    const results = actors.map(type => ({ text: type, value: type }))
    res.json(results)
  })

  return app
}
