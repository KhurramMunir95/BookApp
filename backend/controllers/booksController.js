import Book from '../models/bookModel.js';

const getAllBooks = async(req, res) => {
    try {
      const books = await Book.find();
      return res.status(200).json({
          count: books.length,
          data: books
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getBook = async(req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createBook = async(req, res) => {
    try {
      const { title, author, description, publishedYear, price } = req.body;
      if(!title || !author || !description || !publishedYear || !price) {
          return res.status(400).json({ error: 'Please fill all fields [title, author, price, description, publishYear, price]' });
      }
      const newBook = {
          title,
          author,
          description,
          publishedYear,
          price
      }
      const book = await Book.create(newBook);
      return res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const updateBook = async(req, res) => {
    try {
      const { title, author, description, publishedYear, price } = req.body;
      if(!title ||!author ||!description ||!publishedYear ||!price) {
          return res.status(400).json({ error: 'Please fill all fields' });
      }
  
      const { id } = req.params;
      const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
      if(!book) {
          return res.status(404).json({ error: 'Book not found' });
      }
      return res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const deleteBook = async(req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findByIdAndDelete(id);
      if(!book) {
          return res.status(404).json({ error: 'Book not found' });
      }
      return res.status(200).json(book);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export {
    getAllBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook
}