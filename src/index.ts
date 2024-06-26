import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'
import assert from 'assert';
import { bookRouter } from './books/book.router';
import {cors} from 'hono/cors';
import { Pool } from 'pg'; // Import the Pool class from 'pg' package

import  "dotenv/config";

const app = new Hono();
const pool = new Pool(); // Define the pool variable

// Enable CORS for all routes
app.use('*', cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Get all books
app.get('/books', async (c) => {
  try {
    const res = await pool.query('SELECT * FROM books');
    return c.json(res.rows);
  } catch (error) {
    return c.json({ error: 'Failed to fetch books' }, 500);
  }
});

// Create a new book
app.post('/books', async (c) => {
  try {
    const { title, author } = await c.req.json();
    const res = await pool.query('INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *', [title, author]);
    return c.json(res.rows[0]);
  } catch (error) {
    return c.json({ error: 'Failed to create book' }, 500);
  }
});

// Update a book by ID
app.put('/books/:id', async (c) => {
  try {
    const { id } = c.req.param();
    const { title, author } = await c.req.json();
    const res = await pool.query('UPDATE books SET title = $1, author = $2 WHERE id = $3 RETURNING *', [title, author, id]);
    return c.json(res.rows[0]);
  } catch (error) {
    return c.json({ error: 'Failed to update book' }, 500);
  }
});

// Delete a book by ID
app.delete('/books/:id', async (c) => {
  try {
    const { id } = c.req.param();
    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    return c.json({ message: 'Book deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete book' }, 500);
  }
});


app.route("/", bookRouter)

app.get('/', async(c) => {
  return c.json({message: 'Hello Hono'})
})

assert(process.env.PORT, "PORT is not set in the .env file")

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT )
})
console.log(`Server is running on port ${process.env.PORT} 📢`)

