import { APIError, type Query } from "encore.dev/api";
import log from "encore.dev/log";
import { v7 as uuidV7 } from "uuid";
import type { AuthParams } from "@/api/services/auth";
import { CategoriesModel } from "../models/categories";
export interface GetCategory {
	type: Query<"inventory" | "product">;
	token: AuthParams["token"];
}
interface ICategory {
	category: string;
	storeId: string;
	totalProducts: number | null;
	id: string;
	createdAt: string | null;
	updatedAt: string | null;
}
export type GetCategoryResponse = { data: ICategory[] };
export type AddCategory = { type: "inventory" | "product"; data: ICategory };
export type AddOrUpdateCategoryResponse = { data: ICategory };
export type UpdateCategory = {
	type: "inventory" | "product";
	id: string;
	data: Partial<ICategory>;
};

export namespace CategoriesService {
	export async function getCategories(
		params: Omit<GetCategory, "token">,
	): Promise<GetCategoryResponse> {
		const categories = await CategoriesModel.findAllCategory(
			params.type as "inventory" | "product",
		);
		if (!categories) {
			throw APIError.notFound("Categories not found");
		}
		return { data: categories };
	}
	export async function addCategory(
		params: AddCategory,
	): Promise<AddOrUpdateCategoryResponse> {
		try {
			const storeId = uuidV7(); // Replace with actual store ID retrieval logic as needed
			const newCategory = await CategoriesModel.insertCategory(
				params.type as "inventory" | "product",
				storeId,
				params.data,
			);
			if (!newCategory) {
				throw APIError.invalidArgument("Invalid category type");
			}
			return { data: newCategory };
		} catch (error) {
			log.error("Error adding category:", error);
			throw APIError.internal("Failed to add category");
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
			throw APIError.invalidArgument("Invalid category type");
		} catch (error) {
			log.error("Error updating category:", error);
			throw APIError.internal("Failed to update category");
		}
	}
}
