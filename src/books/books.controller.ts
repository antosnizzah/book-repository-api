import { Context } from "hono";
import { getBooksService, getBooksByIdService, createBooksService, updateBooksService, deleteBooksService } from "./books.service";

// GET ALL Books
export const getBookController = async (c: Context) => {
  try {
    const limit = parseInt(c.req.query("limit") || "5");
    if (isNaN(limit) || limit <= 0) {
      return c.text("Invalid limit", 400);
    }
    const books = await getBooksService(limit);
    if (!books || books.length === 0) {
      return c.text("No book found", 404);
    }
    return c.json(books, 200);
  } catch (error: any) {
    console.error("Error in getBookController:", error);
    return c.json({ error: error?.message }, 500);
  }
};

// GET Book by ID
export const getBooksByIdController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
      return c.text("Invalid id", 400);
    }
    const book = await getBooksByIdService(id);
    if (!book) {
      return c.text("Book not found", 404);
    }
    return c.json(book, 200);
  } catch (error: any) {
    console.error("Error in getBooksByIdController:", error);
    return c.json({ error: error?.message }, 500);
  }
};

// CREATE Book
export const createBookController = async (c: Context) => {
  try {
    const book = await c.req.json();
    const newBook = await createBooksService(book);
    if (!newBook) return c.text("Book not created", 400);
    return c.json({ message: newBook }, 201);
  } catch (error: any) {
    console.error("Error in createBookController:", error);
    return c.json({ error: error?.message }, 500);
  }
};

// UPDATE Book
export const updateBookController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    const book = await c.req.json();

    // Search for book by id
    const existingBook = await getBooksByIdService(id);
    if (!existingBook) return c.text("Book not found", 404);

    // Update book
    const res = await updateBooksService(id, book);
    return c.json({ message: res }, 200);
  } catch (error: any) {
    console.error("Error in updateBookController:", error);
    return c.json({ error: error?.message }, 500);
  }
};

// DELETE Book
export const deleteBookController = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);

    // Search for book by id
    const existingBook = await getBooksByIdService(id);
    if (!existingBook) return c.text("Book not found", 404);

    // Delete book
    const res = await deleteBooksService(id);
    return c.json({ message: res }, 200);
  } catch (error: any) {
    console.error("Error in deleteBookController:", error);
    return c.json({ error: error?.message }, 500);
  }
};
