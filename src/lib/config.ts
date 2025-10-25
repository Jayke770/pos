import { treaty } from "@elysiajs/eden";
import type { BackendRoutes } from "@/api/routes-types";

export const appConfig = {
	appName: "Freetoh", 
	appDefaultTitle: "Freetoh - POS System",
	appTitleTemplate: "%s - Freetoh",
	appDescription: "Freetoh",
};
export const backendHandler = treaty<BackendRoutes>(
	process.env.NEXT_PUBLIC_API_URL || "",
	{ fetch: { credentials: "include" } },
);

export const itemTypes = [
	{
		id: "ingredient",
		name: "Ingredient",
		description: "Raw materials for products",
	},
	{ id: "packaging", name: "Packaging", description: "Cups, lids, bags, etc." },
];
