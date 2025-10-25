import { Elysia, t } from "elysia";
import { envConfig } from "@/api/lib/environment";
import { AuthService } from "@/api/services/auth";

const app = new Elysia()
	.get("/me", ({ cookie }) => AuthService.getUser(cookie.token.value), {
		cookie: t.Object({
			token: t.Optional(t.String()),
		}),
		tags: ["Authentication"],
		response: {
			200: t.Object({
				id: t.String(),
				storeId: t.String(),
				username: t.String(),
				role: t.Union([
					t.Literal("super_admin"),
					t.Literal("admin"),
					t.Literal("cashier"),
				]),
			}),
			401: t.Object({ message: t.String() }),
		},
	})
	.post(
		"/login",
		async ({ body, cookie: { token } }) => {
			const result = await AuthService.login(body);
			if (result.token) {
				token?.set({
					value: result.token,
					httpOnly: true,
					secure: envConfig.NODE_ENV === "production",
					sameSite: "lax",
					expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
					domain: envConfig.NODE_ENV === "production" ? envConfig.COOKIE_DOMAIN : undefined,
					path: "/",
				});
			}
			return result;
		},
		{
			tags: ["Authentication"],
			body: t.Object({
				username: t.String(),
				password: t.String(),
			}),
			response: {
				200: t.Object({
					userData: t.Object({
						id: t.String(),
						storeId: t.String(),
						username: t.String(),
						role: t.Union([
							t.Literal("super_admin"),
							t.Literal("admin"),
							t.Literal("cashier"),
						]),
					}),
					token: t.String(),
				}),
			},
		},
	);

export default app;
