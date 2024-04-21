import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import booksRoute from './routes/booksRoute.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 3000;
const app = express();

dotenv.config();
connectDB();

// Middleware for parsing request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: 'Content-Type',
// }));

app.use('/books', booksRoute)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
