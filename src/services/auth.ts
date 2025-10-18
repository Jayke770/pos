import { cookies } from "next/headers";
import { backendHandler } from "@/lib/config";

export namespace ClientAuthService {
	export async function getUser() {
		const cookiesStore = (await cookies()).getAll();
		const authToken = cookiesStore.find(
			(cookie) => cookie.name === "auth-token",
		)?.value;
		const userData = await backendHandler.api.auth.me.get({
			fetch: {
				credentials: "include",
				headers: {
					Cookie: `auth-token=${authToken}`,
				},
			},
		});
		return userData.data;
	}
}
