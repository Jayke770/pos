import { InventoryModel } from "@/models/inventory";
import type { inventorySchema } from "@/models/schema";
export interface InventoryItem {
	name: string;
	id: string;
	createdAt: string | null;
	updatedAt: string | null;
	categoryId: string;
	unit: string;
	cost: number;
	stocks: number;
	addToPos: boolean | null;
	description: string | null;
}
export namespace InventoryService {
	export async function addInventoryItem(
		params: typeof inventorySchema.$inferInsert,
	): Promise<typeof inventorySchema.$inferSelect> {
		try {
			const newInventoryItem = await InventoryModel.insertInventoryItem(params);
			if (!newInventoryItem) {
				throw new Error("No inventory item was created");
			}
			return newInventoryItem;
		} catch (error) {
			console.error("Error adding inventory item:", error);
			throw new Error("Failed to add inventory item");
		}
	}

	export async function getInventoryItems(): Promise<
		(typeof inventorySchema.$inferSelect)[]
	> {
		try {
			const inventoryItems = await InventoryModel.findAllInventoryItems();
			if (!inventoryItems) {
				throw new Error("No inventory items found");
			}
			return inventoryItems;
		} catch (error) {
			console.error("Error fetching inventory items:", error);
			throw new Error("Failed to fetch inventory items");
		}
	}
}
