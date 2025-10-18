import { v7 as uuidV7 } from "uuid";
import { CategoriesModel } from "@/api/models/categories";
import type { inventoryCategorySchema } from "@/api/models/schema";

type ICategory = typeof inventoryCategorySchema.$inferSelect;
export type GetCategoryResponse = { data: ICategory[] };
export type AddCategory = {
	type: "inventory" | "product";
	data: Pick<ICategory, "category" | "storeId">;
};
export type AddOrUpdateCategoryResponse = { data: ICategory };
export type UpdateCategory = {
	type: "inventory" | "product";
	id: string;
	data: Pick<ICategory, "category">;
};

export namespace CategoriesService {
	export async function getCategories(
		category: "inventory" | "product",
	): Promise<(typeof inventoryCategorySchema.$inferSelect)[]> {
		const categories = await CategoriesModel.findAllCategory(category);
		if (!categories) {
			throw new Error("Categories not found");
		}
		return categories;
	}
	export async function addCategory(
		params: AddCategory,
	): Promise<AddOrUpdateCategoryResponse> {
		try {
			const storeId = uuidV7(); // Replace with actual store ID retrieval logic as needed
			const newCategory = await CategoriesModel.insertCategory(
				params.type,
				storeId,
				params.data,
			);
			if (!newCategory) {
				throw new Error("Invalid category type");
			}
			return { data: newCategory };
		} catch (error) {
			console.error("Error adding category:", error);
			throw new Error("Failed to add category");
		}
	}
	export async function updateCategory(
		params: UpdateCategory,
	): Promise<AddOrUpdateCategoryResponse> {
		try {
			const updatedCategory = await CategoriesModel.updateCategory(
				params.type as "inventory" | "product",
				params.id,
				params.data,
			);
			if (updatedCategory) {
				return { data: updatedCategory };
			}
			throw new Error("Invalid category type");
		} catch (error) {
			console.error("Error updating category:", error);
			throw new Error("Failed to update category");
		}
	}
}
