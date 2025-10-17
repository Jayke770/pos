import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import HomeDashboard from "@/app/home/dashboard";
import { AuthOptions } from "@/services/next-auth/auth";
export default async function Home() {
  const session = await getServerSession(AuthOptions);
  if (!session?.user?.role) redirect("/api/auth/signout");
  if (["admin", "owner"].includes(session?.user?.role)) redirect("/dashboard");
  return <HomeDashboard />;
}
