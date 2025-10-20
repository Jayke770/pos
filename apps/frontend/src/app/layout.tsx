import "@/app/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { appConfig } from "@/lib/config";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: appConfig.appName,
	description: "Best Coffee",
};
export default async function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<ThemeProvider attribute={"class"} defaultTheme="dark">
					{children}
					<Toaster richColors duration={2000} />
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
