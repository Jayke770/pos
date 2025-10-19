import type { ElysiaWithBaseUrl } from "elysia-autoload";
import type Route0 from "./routes/inventory";
import type Route1 from "./routes/categories";
import type Route2 from "./routes/auth";


    export type Routes = ElysiaWithBaseUrl<"/api/inventory", typeof Route0>
              & ElysiaWithBaseUrl<"/api/categories", typeof Route1>
              & ElysiaWithBaseUrl<"/api/auth", typeof Route2>
