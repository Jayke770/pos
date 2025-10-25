import "@/app/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme";
import { Toaster } from "@/components/ui/sonner";
import { appConfig } from "@/lib/config";
import SWRProvider from "@/components/providers/swr";
import { AnimatePresence } from "motion/react";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
	applicationName: appConfig.appName,
	title: {
		default: appConfig.appDefaultTitle,
		template: appConfig.appTitleTemplate,
	},
	description: appConfig.appDescription,
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: appConfig.appDefaultTitle,
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: appConfig.appName,
		title: {
			default: appConfig.appDefaultTitle,
			template: appConfig.appTitleTemplate,
		},
		description: appConfig.appDescription,
	},
	twitter: {
		card: "summary",
		title: {
			default: appConfig.appDefaultTitle,
			template: appConfig.appTitleTemplate,
		},
		description: appConfig.appDescription,
	},
};
export const viewport: Viewport = {
	themeColor: "#181a20",
};
export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<SWRProvider>
					<ThemeProvider attribute={"class"} defaultTheme="dark">
						<AnimatePresence>
							{children}
						</AnimatePresence>
						<Toaster richColors duration={2000} />
					</ThemeProvider>
				</SWRProvider>
				<Analytics />
			</body>
		</html>
	);
}
