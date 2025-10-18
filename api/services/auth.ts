import { APIError, type Cookie, type Header } from "encore.dev/api";
import { authHandler as encoreAuth } from "encore.dev/auth";
import log from "encore.dev/log";
import jwt from "jsonwebtoken";
import { envConfig } from "@/api/lib/environment";

type UserRole = "super_admin" | "admin" | "cashier"

export interface LoginParams {
	username: string;
	password: string;
}
export interface AuthUserData {
	userID: string;
	storeId: string;
	username: string;
	role: UserRole;
}
export interface LoginResponse {
	userData: AuthUserData;
	token: Cookie<"auth-token">;
}
export interface AuthParams {
	token: Cookie<"auth-token">;
	authorizationHeader?: Header<"authorization">;
}

export const authHandler = encoreAuth<AuthParams, AuthUserData>(
	async (params) => {
		try {
			log.info("Verifying token:", params.token?.value);
			const data = jwt.verify(
				params.token?.value,
				envConfig.JWT_SECRET,
			) as AuthUserData;
			log.info("Authenticated user:", data.username);
			return data;
		} catch (e) {
			log.error("Authentication failed:", e);
			if (e instanceof jwt.TokenExpiredError) {
				throw APIError.permissionDenied("Token expired");
			}
			throw APIError.permissionDenied("Invalid token");
		}
	},
);

export namespace AuthService {
	export async function login(params: LoginParams): Promise<LoginResponse> {
		//check if superadmin
		if (
			params.username === envConfig.SUPER_ADMIN_USERNAME &&
			params.password === envConfig.SUPER_ADMIN_PASSWORD
		) {
			const userData: LoginResponse["userData"] = {
				storeId: "super-admin",
				userID: "super-admin",
				username: envConfig.SUPER_ADMIN_USERNAME,
				role: "super_admin",
			};

			const jwtToken = jwt.sign(userData, envConfig.JWT_SECRET, {
				expiresIn: "7d",
			});
			return {
				userData,
				token: {
					value: jwtToken,
					expires: new Date(Date.now() + 7 * 24 * 3600 * 1000),
					path: "/",
					httpOnly: true,
					secure: envConfig.NODE_ENV === "production",
					sameSite: "Lax",
				},
			};
		}
		throw APIError.permissionDenied("Invalid credentials");
	}
}
