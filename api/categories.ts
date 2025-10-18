import { api } from "encore.dev/api";
import {
	type AddCategory,
	type AddOrUpdateCategoryResponse,
	CategoriesService,
	type GetCategory,
	type GetCategoryResponse,
	type UpdateCategory,
} from "@/api/services/categories";

export const getCategories = api<GetCategory, GetCategoryResponse>(
	{
		expose: true,
		// auth: true,
		method: "GET",
		path: "/api/dashboard/categories",
	},
	(params) => CategoriesService.getCategories(params),
);

export const addCategory = api<AddCategory, AddOrUpdateCategoryResponse>(
	{
		expose: true,
		method: "POST",
		// auth: true,
		path: "/api/dashboard/categories",
	},
	(params) => CategoriesService.addCategory(params),
);

export const updateCategory = api<UpdateCategory, AddOrUpdateCategoryResponse>(
	{
		expose: true,
		method: "PUT",
		// auth: true,
		path: "/api/dashboard/categories",
	},
	(params) => CategoriesService.updateCategory(params),
);
