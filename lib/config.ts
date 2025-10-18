import Client, { Local } from "@/lib/client";

export const appConfig = {
	appName: "Freetoh",
};
export const backendHandler = new Client(Local, { requestInit: { credentials: "include",  } });

export const itemTypes = [
	{
		id: "ingredient",
		name: "Ingredient",
		description: "Raw materials for products",
	},
	{ id: "packaging", name: "Packaging", description: "Cups, lids, bags, etc." },
];
