import { z } from "zod";

const EnvSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	PORT: z.string().default("8000"),
	SUPER_ADMIN_USERNAME: z.string().default("master"),
	SUPER_ADMIN_PASSWORD: z.string().default("master"),
	JWT_SECRET: z.string().default("key"),
	DATABASE_URL: z.string().url(),
	ORIGINS: z
		.string()
		.refine((val) => val.split(","))
		.default("http://localhost:3000"),
	COOKIE_DOMAIN: z.string().optional(),
});
export const envConfig = EnvSchema.parse(process.env);
