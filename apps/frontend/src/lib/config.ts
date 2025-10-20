import type { BackendRoutes } from "@backend/routes-types"
import { treaty } from "@elysiajs/eden";

export const appConfig = {
	appName: "Freetoh",
};

// Create a type that represents the actual client structure we use
type TreatyClient = {
	api: {
		auth: {
			login: { post: (data: unknown) => Promise<unknown> };
			me: { get: (options?: unknown) => Promise<{ data: unknown }> };
		};
		categories: Record<string, unknown>;
		inventory: Record<string, unknown>;
	};
};

// Create a fallback client for when Eden Treaty fails to initialize
const createFallbackClient = (): TreatyClient => ({
	api: {
		auth: {
			login: { post: async () => ({ error: "Client not initialized" }) },
			me: { get: async () => ({ data: null }) },
		},
		categories: {},
		inventory: {},
	},
});

const treatyResult = treaty<BackendRoutes>(
	process.env.NEXT_PUBLIC_API_URL || "",
	{ fetch: { credentials: "include" } },
);

// Handle the case where treaty returns an error string (especially in build environments like Vercel)
export const backendHandler: TreatyClient = typeof treatyResult === "string"
	? createFallbackClient()
	: (treatyResult as unknown as TreatyClient);
export const itemTypes = [
	{
		id: "ingredient",
		name: "Ingredient",
		description: "Raw materials for products",
	},
	{ id: "packaging", name: "Packaging", description: "Cups, lids, bags, etc." },
];
