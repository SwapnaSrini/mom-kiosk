import 'dotenv/config'
import express, { type Request, type Response } from 'express'
import { products } from './data/products.js'
import { draftEventDescription } from './ai/eventDescription.js'
const app = express()
app.use(express.json())

// GET all products
app.get('/api/products', (_req: Request, res: Response) => {
  res.json(products)
})

// GET one product
app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id)
  if (!product) {
    res.status(404).json({ error: 'Product not found' })
    return
  }
  res.json(product)
})

// AI-assisted Event Description
app.post('/api/ai/event-description', async (req: Request, res: Response) => {
  const body = req.body ?? {}
  // Read a text field safely: must be a string, trimmed, length-limited
  const field = (name: string, max: number): string =>
    typeof body[name] === 'string' ? body[name].trim().slice(0, max) : ''

  const input = {
    title: field('title', 100),
    date: field('date', 10),
    time: field('time', 5),
    place: field('place', 120),
    city: field('city', 60),
    ageRange: field('ageRange', 30),
    notes: field('notes', 500),
  }

  if (!input.title && !input.notes) {
    res
      .status(400)
      .json({ error: 'Add a title or a few words about your idea first.' })
    return
  }

  try {
    res.json(await draftEventDescription(input))
  } catch (err) {
    console.error('AI draft failed:', err) // details stay in the server log
    res
      .status(502)
      .json({
        error:
          "The AI couldn't write a description right now. Please try again.",
      })
  }
})

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
