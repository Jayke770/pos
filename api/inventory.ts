import { api } from "encore.dev/api";
import {
	type AddInventoryItem,
	type AddInventoryItemResponse,
	type GetInventoryItemsResponse,
	InventoryService,
} from "@/api/services/inventory";

export const addInventoryItem = api<AddInventoryItem, AddInventoryItemResponse>(
	{
		expose: true,
		method: "POST",
		path: "/api/dashboard/inventory",
	},
	(params) => InventoryService.addInventoryItem(params),
);

export const getInventoryItems = api(
	{
		expose: true,
		method: "GET",
		path: "/api/dashboard/inventory",
	},
	(): Promise<GetInventoryItemsResponse> =>
		InventoryService.getInventoryItems(),
);
