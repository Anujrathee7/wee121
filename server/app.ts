import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false); // or true, depending on your query expectations

import path from 'path';
import { Book, IBook } from './models/Book';

const app = express();
const PORT = process.env.PORT || 1234;

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: 'http://localhost:3000' }));
}

// Database setup
mongoose.connect('mongodb://localhost:27017/books');

// POST /api/book
app.post('/api/book', async (req: Request<{}, {}, IBook>, res: Response) => {
  try {
    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to save book' });
  }
});

// GET /api/book/:name
app.get('/api/book/:name', async (req: Request<{ name: string }>, res: Response) => {
  try {
    const book = await Book.findOne({ name: req.params.name });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../../client/build')));
  app.get('*', (_, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
