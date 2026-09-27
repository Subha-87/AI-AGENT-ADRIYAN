import { sql } from "drizzle-orm";
import { text, sqliteTable, real, integer } from "drizzle-orm/sqlite-core";

// Product Table
export const productTable = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  name: text("name").notNull(),

  description: text("description"),
  category: text("category").notNull(),

  price: real("price").notNull(),

  stock: integer("stock").notNull().default(0),

  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

//Sales Table

export const salesTable = sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),

  productId: integer("product_id")
    .notNull()
    .references(() => productTable.id),

  quantity: integer("quantity").notNull(),

  totalAmount: real("total_amount").notNull(),

  soldAt: text("sold_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  customer_name: text("customer_name").notNull(),
  region: text("region").notNull(),
});
