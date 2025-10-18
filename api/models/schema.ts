import { sql } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";

export const storeSchema = p.pgTable("stores", {
	id: p.uuid().primaryKey().defaultRandom(),
	name: p.text().notNull(),
	address: p.text().notNull(),
	contactNumber: p.text().notNull(),
	createdAt: p.timestamp().defaultNow().$type<string>(),
	updatedAt: p
		.timestamp()
		.defaultNow()
		.$onUpdate(() => new Date())
		.$type<string>(),
});

export const userRoleEnum = p.pgEnum("userRole", [
	"admin",
	"manager",
	"cashier",
]);

export const userSchema = p.pgTable(
	"users",
	{
		id: p.uuid().primaryKey().defaultRandom(),
		storeId: p
			.uuid()
			.notNull()
			.references(() => storeSchema.id),
		username: p.text().notNull().unique(),
		passwordHash: p.text().notNull(),
		role: userRoleEnum("role").notNull(),
		createdAt: p.timestamp().defaultNow().$type<string>(),
		updatedAt: p
			.timestamp()
			.defaultNow()
			.$onUpdate(() => new Date())
			.$type<string>(),
	},
	(table) => [
		p.check("validRole", sql`${table.role} IN ('admin', 'manager', 'cashier')`),
	],
);

export const productCategorySchema = p.pgTable("product_categories", {
	category: p.text().notNull().unique(),
	storeId: p.uuid().notNull(),
	totalProducts: p.numeric({ mode: "number" }).default(0),
	id: p.uuid().primaryKey().defaultRandom(),
	createdAt: p.timestamp().defaultNow(),
	updatedAt: p
		.timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const inventoryCategorySchema = p.pgTable("inventory_categories", {
	category: p.text().notNull().unique(),
	storeId: p.uuid().notNull(),
	totalProducts: p.numeric({ mode: "number" }).default(0),
	id: p.uuid().primaryKey().defaultRandom(),
	createdAt: p.timestamp().defaultNow(),
	updatedAt: p
		.timestamp()
		.defaultNow()
		.$onUpdate(() => new Date()),
});

export const productSchema = p.pgTable("products", {
	id: p.uuid().primaryKey().defaultRandom(),
	categoryId: p
		.uuid()
		.notNull()
		.references(() => productCategorySchema.id),
	totalSold: p.numeric({ mode: "number" }).default(0),
	addons: p.jsonb().default("[]").$type<Array<string>>(),
	variants: p.jsonb().default("[]").$type<Array<string>>(),
	createdAt: p.timestamp().defaultNow().$type<string>(),
	updatedAt: p
		.timestamp()
		.defaultNow()
		.$onUpdate(() => new Date())
		.$type<string>(),
});

export const inventorySchema = p.pgTable("inventory", {
	id: p.uuid().primaryKey().defaultRandom(),
	unit: p.text().notNull(),
	categoryId: p
		.uuid()
		.notNull()
		.references(() => inventoryCategorySchema.id),
	name: p.text().notNull(),
	cost: p.numeric({ mode: "number" }).notNull(),
	stocks: p.numeric({ mode: "number" }).notNull(),
	addToPos: p.boolean().default(false),
	description: p.text(),
	createdAt: p.timestamp().defaultNow().$type<string>(),
	updatedAt: p
		.timestamp()
		.defaultNow()
		.$onUpdate(() => new Date())
		.$type<string>(),
});
