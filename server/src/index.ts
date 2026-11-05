import express, { type Request, type Response } from 'express'

const app = express()
app.use(express.json()) // parse JSON request bodies

type Item = {
  id: number
  title: string
  description: string
  createdAt: string
}

// In-memory "database" for now – replaced by a real DB later
const items: Item[] = []
let nextId = 1

// GET all items
app.get('/api/items', (_req: Request, res: Response) => {
  res.json(items)
})

// GET one item
app.get('/api/items/:id', (req: Request, res: Response) => {
  const item = items.find((i) => i.id === Number(req.params.id))
  if (!item) {
    res.status(404).json({ error: 'Item not found' })
    return
  }
  res.json(item)
})

// POST create item (with validation)
app.post('/api/items', (req: Request, res: Response) => {
  const { title, description } = req.body ?? {}
  if (typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'title is required' })
    return
  }
  const item: Item = {
    id: nextId++,
    title: title.trim(),
    description: typeof description === 'string' ? description : '',
    createdAt: new Date().toISOString(),
  }
  items.push(item)
  res.status(201).json(item)
})

// DELETE item
app.delete('/api/items/:id', (req: Request, res: Response) => {
  const index = items.findIndex((i) => i.id === Number(req.params.id))
  if (index === -1) {
    res.status(404).json({ error: 'Item not found' })
    return
  }
  items.splice(index, 1)
  res.status(204).send()
})

app.listen(3000, () => console.log('API running on http://localhost:3000'))
