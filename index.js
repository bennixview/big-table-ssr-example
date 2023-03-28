import express from 'express'
// import helmet from 'helmet'
import morgan from 'morgan'
import 'pug'
import { EventStore } from './lib/repositories/events.js'

const app = express()
// app.use(helmet()) //TODO: reactivate helmet, but has to allow foreign scripts (for e.g. custom elements polyfill)
app.use(morgan('combined'))
app.set('view engine', 'pug')
app.set('views', './views')
app.use('/client', express.static('./client'))
app.use('/images', express.static('./images'))

const store = new EventStore()

export default config => {
  app.get('/', async (req, res) => {
    const { page, size, filters = {}, sort } = req.query
    console.log('request-params', { page, size, filters, sort })

    const [sortBy, order] = sort ? sort.split(':') : []
    const events = await store.getAll({ page, size, filters, sortBy, order })

    res.render('index', { events, filters, sortBy, order })
  })

  return app
}
