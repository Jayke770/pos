import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { autoload } from "elysia-autoload";
import { envConfig } from "@/api/lib/environment";

new Elysia()
	.use(
		cors({
			origin: envConfig.ORIGINS,
			credentials: true,
			methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
		})
	)
	.use(
		await autoload({
			dir: "./routes",
			prefix: "/api",
			types: {
				useExport: true,
				typeName: "BackendRoutes",
			},
			ignore: ["**/*.test.ts", "**/*.spec.ts"],
		}),
	)
	.use(openapi())
	.get("/", () => "OK", { tags: ["Health"] })
	.onStart(() => {
		console.log(`Server running on port ${envConfig.PORT}`);
	})
	.listen(envConfig.PORT);
