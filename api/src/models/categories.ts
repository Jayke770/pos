import { eq } from "drizzle-orm";
import { db } from "@/models/database";
import {
	inventoryCategorySchema,
	productCategorySchema,
} from "@/models/schema";

type CategoryType = "inventory" | "product";
export namespace CategoriesModel {
	export async function findAllCategory(
		categoryType: CategoryType,
	): Promise<(typeof inventoryCategorySchema.$inferSelect)[] | undefined> {
		try {
			const categories = await db
				.select()
				.from(
					categoryType === "inventory"
						? inventoryCategorySchema
						: productCategorySchema,
				);
			return categories;
		} catch (error) {
			console.error("Error fetching categories:", error);
			return undefined;
		}
	}
	export async function insertCategory(
		categoryType: CategoryType,
		storeId: string,
		data: Pick<
			typeof inventoryCategorySchema.$inferInsert,
			"category" | "storeId"
		>,
	): Promise<typeof inventoryCategorySchema.$inferSelect | undefined> {
		try {
			if (categoryType === "inventory") {
				const newCategory = await db
					.insert(inventoryCategorySchema)
					.values({ ...data, storeId })
					.returning();
				return newCategory?.[0];
			}
			if (categoryType === "product") {
				const newCategory = await db
					.insert(productCategorySchema)
					.values({ ...data, storeId })
					.returning();
				return newCategory?.[0];
			}
			console.error("Invalid category type provided for insertion.");
			return undefined;
		} catch (error) {
			console.error("Error inserting category:", error);
			return undefined;
		}
	}

	export async function updateCategory(
		categoryType: CategoryType,
		id: string,
		data: Partial<typeof inventoryCategorySchema.$inferInsert>,
	): Promise<typeof inventoryCategorySchema.$inferSelect | undefined> {
		try {
			if (categoryType === "inventory") {
				const updatedCategory = await db
					.update(inventoryCategorySchema)
					.set({ ...data })
					.where(eq(inventoryCategorySchema.id, id))
					.returning();
				return updatedCategory?.[0];
			}
			if (categoryType === "product") {
				const updatedCategory = await db
					.update(productCategorySchema)
					.set({ ...data })
					.where(eq(productCategorySchema.id, id))
					.returning();
				return updatedCategory?.[0];
			}
			console.error("Invalid category type provided for update.");
			return undefined;
		} catch (error) {
			console.error("Error updating category:", error);
			return undefined;
		}
	}
}
