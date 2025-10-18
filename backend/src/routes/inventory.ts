import { Elysia, t } from "elysia";
import { InventoryService } from "@/services/inventory";

const app = new Elysia();

app.post("", ({ body }) => InventoryService.addInventoryItem(body), {
	tags: ["Inventory"],
	body: t.Object({
		name: t.String(),
		id: t.String(),
		categoryId: t.String(),
		unit: t.String(),
		cost: t.Number(),
		stocks: t.Number(),
		addToPos: t.Nullable(t.Boolean()),
		description: t.Nullable(t.String()),
	}),
});

app.get("", () => InventoryService.getInventoryItems(), {
	tags: ["Inventory"],
	response: {
		"200": t.Array(
			t.Object({
				name: t.String(),
				id: t.String(),
				categoryId: t.String(),
				unit: t.String(),
				cost: t.Number(),
				stocks: t.Number(),
				addToPos: t.Nullable(t.Boolean()),
				description: t.Nullable(t.String()),
			}),
		),
	},
});
export default app;
