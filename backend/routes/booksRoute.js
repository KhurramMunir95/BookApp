import express from 'express';
import { createBook, deleteBook, getAllBooks, getBook, updateBook } from '../controllers/booksController.js';

const router = express.Router();

// get all books
router.get('/', getAllBooks)

// get book by id
router.get('/detail/:id', getBook);

// create book
router.post('/create', createBook);

// update book
router.put('/update/:id', updateBook);

// delete book
router.delete('/delete/:id', deleteBook);

export default router;