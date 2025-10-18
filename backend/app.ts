import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { autoload } from "elysia-autoload";
import { envConfig } from "@/lib/environment"

const app = new Elysia()
    .use(
        cors({
            origin: envConfig.ORIGINS,
        }),
    )
    .use(
        await autoload({
            dir: "./routes",
            prefix: "/api",
            types: {
                typeName: "Routes",
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
export type ElysiaApp = typeof app;