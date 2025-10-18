import { eq } from "drizzle-orm";
import log from "encore.dev/log";
import { db } from "@/api/models/database";
import {
	inventoryCategorySchema,
	productCategorySchema,
} from "@/api/models/schema";

type CategoryType = "inventory" | "product";
export namespace CategoriesModel {
	export async function findAllCategory(
		categoryType: CategoryType,
	): Promise<(typeof inventoryCategorySchema.$inferSelect)[] | null> {
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
			log.error("Error fetching categories:", error);
			return null;
		}
	}
	export async function insertCategory(
		categoryType: CategoryType,
		storeId: string,
		data: typeof inventoryCategorySchema.$inferInsert,
	): Promise<typeof inventoryCategorySchema.$inferSelect | null> {
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
			log.error("Invalid category type provided for insertion.");
			return null;
		} catch (error) {
			log.error("Error inserting category:", error);
			return null;
		}
	}

	export async function updateCategory(
		categoryType: CategoryType,
		id: string,
		data: Partial<typeof inventoryCategorySchema.$inferInsert>,
	): Promise<typeof inventoryCategorySchema.$inferSelect | null> {
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
			log.error("Invalid category type provided for update.");
			return null;
		} catch (error) {
			log.error("Error updating category:", error);
			return null;
		}
	}
}
