import { Elysia, t } from "elysia";
import { CategoriesService } from "@/services/categories";

const app = new Elysia();

app.get("", async ({ query }) => CategoriesService.getCategories(query.type), {
	tags: ["Categories"],
	query: t.Object({
		type: t.Union([t.Literal("inventory"), t.Literal("product")]),
	}),
	response: {
		"200": t.Array(
			t.Object({
				category: t.String(),
				storeId: t.String(),
				totalProducts: t.Nullable(t.Number()),
				id: t.String(),
				createdAt: t.Nullable(t.Date()),
				updatedAt: t.Nullable(t.Date()),
			}),
		),
	},
});

app.post("", async ({ body }) => CategoriesService.addCategory(body), {
	tags: ["Categories"],
	body: t.Object({
		type: t.Union([t.Literal("inventory"), t.Literal("product")]),
		data: t.Object({
			category: t.String(),
			storeId: t.String(),
		}),
	}),
});

app.put("", async ({ body }) => CategoriesService.updateCategory(body), {
	tags: ["Categories"],
	body: t.Object({
		type: t.Union([t.Literal("inventory"), t.Literal("product")]),
		id: t.String(),
		data: t.Object({
			category: t.String(),
		}),
	}),
});
export default app;
