import { eq } from "drizzle-orm";
import log from "encore.dev/log";
import { db } from "@/api/models/database";
import { inventoryCategorySchema, inventorySchema } from "@/api/models/schema";

export namespace InventoryModel {
	export async function findAllInventoryItems(): Promise<
		(typeof inventorySchema.$inferSelect)[] | null
	> {
		try {
			const items = await db.select().from(inventorySchema);
			return items;
		} catch (error) {
			log.error("Error fetching inventory items:", error);
			return null;
		}
	}
	export async function insertInventoryItem(
		data: typeof inventorySchema.$inferInsert,
	): Promise<typeof inventorySchema.$inferSelect | null> {
		try {
			const categoryExists = await db
				.select({ id: inventoryCategorySchema.id })
				.from(inventoryCategorySchema)
				.where(eq(inventoryCategorySchema.id, data.categoryId))
				.limit(1);
			if (!categoryExists || categoryExists.length === 0) {
				log.error("Invalid categoryId provided for inventory item insertion.");
				return null;
			}
			const [item] = await db.insert(inventorySchema).values(data).returning();
			return item;
		} catch (error) {
			log.error("Error inserting inventory item:", error);
			return null;
		}
	}
}
