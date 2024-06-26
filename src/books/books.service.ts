import db from "../drizzle/db"
import { BookTable,TIBook,TSBook } from "../drizzle/schema"
import { eq } from "drizzle-orm"

// GET ALL Users with a limit
export const getBooksService = async (limit: number): Promise<TSBook[] | null> => {
    const Books = await db.query.BookTable.findMany({
        limit: limit
    });
    return Books;
};
// GET BOOK BY ID
export const getBooksByIdService = async (id: number) => {
    const Books = await db.query.BookTable.findFirst({
        where: eq(BookTable.id, id),
        columns: {
            id: true,
            title: true,
            author: true,
            year_of_publication: true
        }});
        return Books;
    }


        // CREATE BOOKS
export const createBooksService = async (item: TIBook) => {
    await db.insert(BookTable).values(item)
    return "book created successfully";
}

//  UPDATE BOOKS
export const updateBooksService = async (id: number, item: TIBook) => {
    await db.update(BookTable).set(item).where(eq(BookTable.id, id));
    return "book  updated successfully";
}

// DELETE BOOKS
export const deleteBooksService = async (id: number) => {
    await db.delete(BookTable).where(eq(BookTable.id, id));
    return "book  deleted successfully";
}