import { APIError, api, Gateway } from "encore.dev/api";
import {
	AuthService,
	type AuthUserData,
	authHandler,
	type LoginParams,
	type LoginResponse,
} from "@/api/services/auth";
import { getAuthData } from "@/encore.gen/auth";

export const login = api<LoginParams, LoginResponse>(
	{ expose: true, method: "POST", path: "/api/auth/login" },
	async (params) => AuthService.login(params),
);

export const me = api(
	{
		expose: true,
		method: "GET",
		path: "/api/auth/me",
		auth: true,
	},
	async (): Promise<AuthUserData> => {
		const userData = getAuthData();
		if (!userData) {
			throw APIError.permissionDenied("Unauthorized");
		}
		return userData;
	},
);
export const gateway = new Gateway({ authHandler: authHandler });
