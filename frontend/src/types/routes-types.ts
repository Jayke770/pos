import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "../../../backend/src/routes/inventory";
import type Route1 from "../../../backend/src/routes/categories";
import type Route2 from "../../../backend/src/routes/auth";

declare global {
    export type Routes = ElysiaWithBaseUrl<"/api/inventory", typeof Route0>
              & ElysiaWithBaseUrl<"/api/categories", typeof Route1>
              & ElysiaWithBaseUrl<"/api/auth", typeof Route2>
}