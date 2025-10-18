import { redirect } from "next/navigation";
import HomeDashboard from "@/app/home/dashboard";
import { ClientAuthService } from "@/services/auth";
export default async function Home() {
	const userData = await ClientAuthService.getUser();
	if (!userData) {
		redirect("/");
	}
	return <HomeDashboard />;
}
