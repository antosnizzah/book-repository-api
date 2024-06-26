import { Hono } from "hono";
import { getBooksByIdController,getBookController,createBookController,updateBookController,deleteBookController } from "./books.controller";

export  const bookRouter = new Hono();

bookRouter.get("books",getBookController);
bookRouter.get("books/:id",getBooksByIdController);
bookRouter.post("books",createBookController);
bookRouter.put("books/:id",updateBookController);
bookRouter.delete("books/:id",deleteBookController);

