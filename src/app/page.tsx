"use client";
import AuthForm from "./main";
import { useAuthentication } from '@/hooks/auth/useAuth'
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
	const router = useRouter()
	const { user, userLoading } = useAuthentication();
	useEffect(() => {
		if (user) {
			router.push("/dashboard")
		}
	}, [user])
	return (
		<>
			{(userLoading || user) && <Loading />}
			{!userLoading && !user && <AuthForm />}
		</>
	)

}
