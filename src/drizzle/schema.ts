import { pgTable, serial, text, decimal, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { Table } from 'drizzle-orm';

// Define authors table
// export const AuthorTable = pgTable("author", {
//     id: serial("id").primaryKey().unique(),
//     name: varchar("name").notNull(),
//     age: integer("age").notNull(),
//     email: varchar("email").notNull(),
//     phone: varchar("phone").notNull(),
//     address: varchar("address").notNull(),
// });
// export const PublisherTable = pgTable("publisher", {
//     id: serial("id").primaryKey().unique(),
//     company_name: varchar("company_name").notNull(),
//     year_of_publication: integer("year_of_publication").notNull(),
//     address: varchar("address").notNull(),
// });

export const BookTable = pgTable("book", {
    id: serial("id").primaryKey().unique(),
    title: varchar("title").notNull(),
    author: varchar("author").notNull(),
    year_of_publication: integer("year_of_publication").notNull()
    // author_id: integer("author_id").notNull().references(()=> AuthorTable.id, {onDelete: "cascade"} ),
    // publisher_id: integer("publisher_id").notNull().references(()=> PublisherTable.id, {onDelete: "cascade"} ),
    // price: decimal("price").notNull(),
    // quantity: integer("quantity").notNull(),
    // description: text("description").notNull(),
    // is_available: boolean("is_available").notNull(),
});
// // Relationships
// export const bookRelations = relations(BookTable, ({ one, many }) => ({
//     author: one(AuthorTable, {
//         fields: [BookTable.author_id],
//         references: [AuthorTable.id],
//     }),
//     publisher: one(PublisherTable, {
//         fields: [BookTable.publisher_id],
//         references: [PublisherTable.id],
//     }),
// }));

// export const authorRelations = relations(AuthorTable, ({ many }) => ({
//     books: many(BookTable),
// }));

// export const publisherRelations = relations(PublisherTable, ({ many }) => ({
//     books: many(BookTable),
// }));
export type TIBook = typeof BookTable.$inferInsert;
export type TSBook = typeof BookTable.$inferSelect;