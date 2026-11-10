import express, { type Request, type Response } from 'express'
import { products } from './data/products.js'
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

const PORT = Number(process.env.PORT) || 3000
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))
