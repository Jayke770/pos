import { z } from "zod";

const EnvSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	SUPER_ADMIN_USERNAME: z.string().default("master"),
	SUPER_ADMIN_PASSWORD: z.string().default("master"),
	JWT_SECRET: z.string().default("key"),
});
export const envConfig = EnvSchema.parse(process.env);
