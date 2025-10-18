import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { envConfig } from "@/lib/environment";

const client = postgres(envConfig.DATABASE_URL);
const db = drizzle({ client });
export { db };
