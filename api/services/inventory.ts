import { APIError } from "encore.dev/api";
import log from "encore.dev/log";
import { InventoryModel } from "../models/inventory";
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

export interface AddInventoryItem {
	data: Omit<InventoryItem, "id" | "createdAt" | "updatedAt">;
}
export type AddInventoryItemResponse = Omit<
	InventoryItem,
	"id" | "createdAt" | "updatedAt"
>;
export interface GetInventoryItemsResponse {
	data: InventoryItem[];
}
export namespace InventoryService {
	export async function addInventoryItem(
		params: AddInventoryItem,
	): Promise<AddInventoryItemResponse> {
		try {
			const newInventoryItem = await InventoryModel.insertInventoryItem(
				params.data,
			);
			if (!newInventoryItem) {
				throw APIError.internal("No inventory item was created");
			}
			return newInventoryItem;
		} catch (error) {
			log.error("Error adding inventory item:", error);
			throw APIError.internal("Failed to add inventory item");
		}
	}

	export async function getInventoryItems(): Promise<GetInventoryItemsResponse> {
		try {
			const inventoryItems = await InventoryModel.findAllInventoryItems();
			if (!inventoryItems) {
				throw APIError.internal("No inventory items found");
			}
			return { data: inventoryItems };
		} catch (error) {
			log.error("Error fetching inventory items:", error);
			throw APIError.internal("Failed to fetch inventory items");
		}
	}
}
