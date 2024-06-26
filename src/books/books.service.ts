import db from "../drizzle/db";
import { BookTable, TIBook, TSBook } from "../drizzle/schema";
import { eq } from "drizzle-orm";

// GET ALL Books with a limit
export const getBooksService = async (limit: number): Promise<TSBook[] | null> => {
  try {
    const books = await db.query.BookTable.findMany({
      limit: limit
    });
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Failed to fetch books");
  }
};

// GET BOOK BY ID
export const getBooksByIdService = async (id: number) => {
  try {
    const book = await db.query.BookTable.findFirst({
      where: eq(BookTable.id, id),
      columns: {
        id: true,
        title: true,
        author: true,
        year_of_publication: true
      }
    });
    return book;
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    throw new Error("Failed to fetch book by ID");
  }
};

// CREATE BOOK
export const createBooksService = async (item: TIBook) => {
  try {
    await db.insert(BookTable).values(item);
    return "Book created successfully";
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error("Failed to create book");
  }
};

// UPDATE BOOK
export const updateBooksService = async (id: number, item: TIBook) => {
  try {
    await db.update(BookTable).set(item).where(eq(BookTable.id, id));
    return "Book updated successfully";
  } catch (error) {
    console.error("Error updating book:", error);
    throw new Error("Failed to update book");
  }
};

// DELETE BOOK
export const deleteBooksService = async (id: number) => {
  try {
    await db.delete(BookTable).where(eq(BookTable.id, id));
    return "Book deleted successfully";
  } catch (error) {
    console.error("Error deleting book:", error);
    throw new Error("Failed to delete book");
  }
};
