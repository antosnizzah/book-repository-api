import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import assert from 'assert';
import { bookRouter } from './books/book.router';
import { cors } from 'hono/cors';
import { Pool } from 'pg';
import "dotenv/config";

const app = new Hono();
const pool = new Pool(); // Define the pool variable

// Enable CORS for all routes
app.use('*', cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Attach the book router
app.route("/", bookRouter);

// Default route
app.get('/', async (c) => {
  return c.json({ message: 'Hello Hono' });
});

assert(process.env.PORT, "PORT is not set in the .env file");

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT)
});
console.log(`Server is running on port ${process.env.PORT} 📢`);
