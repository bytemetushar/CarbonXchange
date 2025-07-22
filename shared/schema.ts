import { pgTable, text, serial, integer, decimal, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const carbonCredits = pgTable("carbon_credits", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // Forestry, Solar Energy, Wind Energy, etc.
  location: text("location").notNull(),
  verification: text("verification").notNull(), // VCS Verified, Gold Standard, etc.
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  available: integer("available").notNull(),
  vintage: integer("vintage").notNull(),
  imageUrl: text("image_url").notNull(),
  sellerId: integer("seller_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const portfolioItems = pgTable("portfolio_items", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  creditId: integer("credit_id").notNull(),
  quantity: integer("quantity").notNull(),
  purchasePrice: decimal("purchase_price", { precision: 10, scale: 2 }).notNull(),
  purchaseDate: timestamp("purchase_date").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  creditId: integer("credit_id").notNull(),
  quantity: integer("quantity").notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"), // pending, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const contactRequests = pgTable("contact_requests", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCarbonCreditSchema = createInsertSchema(carbonCredits).omit({
  id: true,
  createdAt: true,
});

export const insertPortfolioItemSchema = createInsertSchema(portfolioItems).omit({
  id: true,
  purchaseDate: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertContactRequestSchema = createInsertSchema(contactRequests).omit({
  id: true,
  createdAt: true,
});

export type CarbonCredit = typeof carbonCredits.$inferSelect;
export type InsertCarbonCredit = z.infer<typeof insertCarbonCreditSchema>;
export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = z.infer<typeof insertPortfolioItemSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type ContactRequest = typeof contactRequests.$inferSelect;
export type InsertContactRequest = z.infer<typeof insertContactRequestSchema>;

export type User = {
  id: number;
  username: string;
  password: string;
};

export type InsertUser = {
  username: string;
  password: string;
};
