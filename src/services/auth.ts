import { cookies } from "next/headers";
import { backendHandler } from "@/lib/config";

export namespace ClientAuthService {
	export async function getUser() {
		const authToken = document.cookie
			.split('; ')
			.find(row => row.startsWith('token='))
			?.split('=')[1];
		const userData = await backendHandler.api.auth.me.get({
			fetch: {
				credentials: "include", 
				headers: {
					Cookie: `token=${authToken}`,
				},
			},
		});
		return userData.data;
	}
}
