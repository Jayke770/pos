import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./api/models/migrations",
	schema: "./api/models/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
