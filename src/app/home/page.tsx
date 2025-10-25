"use client";
import { redirect } from "next/navigation";
import HomeDashboard from "@/app/home/dashboard";
import { useEffect } from "react";
import { useAuthentication } from "@/hooks/auth/useAuth";
import Loading from "@/components/loading";
export default async function Home() {
	const { user, userLoading } = useAuthentication();
	useEffect(() => {
		if (!userLoading && !user) {
			redirect("/");
		}
	}, [user])
	return (
		<>
			{userLoading && <Loading />}
			{!userLoading && user && <HomeDashboard />}
		</>
	)
}
