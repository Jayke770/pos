import { drizzle } from "drizzle-orm/postgres-js";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const dbConfig = new SQLDatabase("pos", {
	migrations: {
		path: "migrations",
		source: "drizzle",
	},
});
const db = drizzle(dbConfig.connectionString);
export { db };
