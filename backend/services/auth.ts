import { envConfig } from "@/api/lib/environment";
import { status } from "elysia";
import jwt from "jsonwebtoken";

type UserRole = "super_admin" | "admin" | "cashier";

export interface LoginParams {
	username: string;
	password: string;
}
export interface AuthUserData {
	id: string;
	storeId: string;
	username: string;
	role: UserRole;
}
export interface LoginResponse {
	userData: AuthUserData;
	token: string;
}

export namespace AuthService {
	export async function getUser(token?: string) {
		try {
			console.info("Verifying token:", token);
			if (!token) return status(401, { message: "No token provided" });
			const data = jwt.verify(token, envConfig.JWT_SECRET) as AuthUserData;
			console.info("Authenticated user:", data.username);
			return status(200, data);
		} catch (e) {
			console.error("Authentication failed:", e);
			if (e instanceof jwt.TokenExpiredError) {
				return status(401, { message: "Token expired" });
			}
			return status(401, { message: "Invalid token" });
		}
	}
	export async function login(params: LoginParams): Promise<LoginResponse> {
		//check if superadmin
		if (
			params.username === envConfig.SUPER_ADMIN_USERNAME &&
			params.password === envConfig.SUPER_ADMIN_PASSWORD
		) {
			const userData: LoginResponse["userData"] = {
				storeId: "super-admin",
				id: "super-admin",
				username: envConfig.SUPER_ADMIN_USERNAME,
				role: "super_admin",
			};

			const jwtToken = jwt.sign(userData, envConfig.JWT_SECRET, {
				expiresIn: "7d",
			});
			return {
				userData,
				token: jwtToken,
			};
		}
		throw new Error("Invalid credentials");
	}
}
