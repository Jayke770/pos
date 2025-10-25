"use client";
import AuthForm from "./main";
import { useAuthentication } from '@/hooks/auth/useAuth'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
	const router = useRouter()
	const { user } = useAuthentication();
	useEffect(() => {
		if (user) {
			router.push("/dashboard")
		}
	}, [user])
	return <AuthForm />
}
