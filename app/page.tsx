import { redirect } from "next/navigation";
import { ClientAuthService } from "@/services/auth";
import AuthForm from "./main";
export default async function Page() {
    const userData = await ClientAuthService.getUser();
    if (userData) {
        redirect("/dashboard");
    }
    return <AuthForm />;
}
