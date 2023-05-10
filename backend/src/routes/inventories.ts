import express, { Request, Response } from 'express';
import { getAllProducts, createProduct, deleteProduct } from '../db';
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const sortBy = req.query.sortBy as string;
  const location = req.query.location as string;
  getAllProducts(page, sortBy, location)
    .then((productData) => {
      res.status(200).json(productData);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Something went wrong!' });
    });
});

router.post('/', (req: Request, res: Response) => {
  const name = req.body.name as string;
  const price = req.body.price as number;
  const location = req.body.location as string;
  if (name && price && location) {
    createProduct(name, price, location)
      .then((productData) => {
        res.status(200).json(productData);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Something went wrong!' });
      });
  } else {
    res.status(401).json({ error: 'All fields required!' });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  deleteProduct(parseInt(req.params.id))
    .then((productData) => {
      res.status(200).json(productData);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Something went wrong!' });
    });
});

export default router;
