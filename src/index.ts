import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'
import assert from 'assert';
import { bookRouter } from './books/book.router';

import  "dotenv/config";





const app = new Hono();

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

