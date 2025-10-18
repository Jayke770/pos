import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/services/auth";
export default async function Redirect() {
	const session = await getServerSession(AuthOptions);
	if (!session?.user?.role) redirect("/api/auth/signout");
	if (["admin", "owner"].includes(session?.user?.role)) redirect("/dashboard");
	if (session?.user?.role === "user") redirect("/home");
	return null;
}
