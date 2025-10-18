import { Elysia, t } from "elysia";
import { envConfig } from "@/lib/environment";
import { AuthService } from "@/services/auth";

const app = new Elysia()
	.get("/me", ({ cookie }) => AuthService.getUser(cookie.token.value), {
		cookie: t.Object({
			token: t.String(),
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
			401: t.Null(),
		},
	})
	.post(
		"/login",
		async ({ body, cookie: { token } }) => {
			const result = await AuthService.login(body);
			if (result.token) {
				token.set({
					value: result.token,
					httpOnly: true,
					secure: envConfig.NODE_ENV === "production",
					sameSite: "lax",
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
