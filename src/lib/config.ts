import { treaty } from "@elysiajs/eden";
export const appConfig = {
	appName: "Freetoh",
};
export const backendHandler = treaty<Routes>(
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
