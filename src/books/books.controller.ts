import { Context } from "hono";
import { getBooksService,getBooksByIdService,createBooksService,updateBooksService,deleteBooksService } from "./books.service";

// get all books
export const getBookController = async (c: Context) => {
    try {
        const limit = parseInt(c.req.query("limit") || "5");
        if (isNaN(limit) || limit <= 0) {
            return c.text("Invalid limit", 400);
        }
        const Users = await getBooksService(limit);
        if (Users == null || Users.length == 0) {
            return c.text("No Book found", 404);
        }
        return c.json(Users, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};
// get Users  by id
export const getBooksByIdController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid id", 400);
        }
        const Books = await getBooksByIdService(id);
        if (Books == null) {
            return c.text("book not found", 404);
        }
        return c.json(Books, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};



// create  books
export const createBookController = async (c: Context) => {
    try {
        const Books = await c.req.json();
        const newBooks= await createBooksService(Books);

        if (!newBooks) return c.text("Book not created", 400);
        return c.json({ message: newBooks}, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

//  update books
export const updateBookController = async (c: Context) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) return c.text("Invalid id", 400);
        const Books = await c.req.json();

        // search for  book  by id
        const updatedBooks = await getBooksByIdService(id);
        // if (!updatedBooks=== undefined) return c.text("User  not found", 404);

        // get data to Books
        const res = await updateBooksService(id, Books);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};

// delete  books

export const deleteBookController = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid id", 400);
    try {
        // search for Users by id
        const Users = await getBooksByIdService(id);
        // if (!Users) return c.text("Users not found", 404);

        // delete order 
        const res = await deleteBooksService(id);
        return c.json({ message: res }, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 500);
    }
};