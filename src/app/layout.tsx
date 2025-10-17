import "@/app/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { NextAuthSessionProvider } from "@/components/context/session";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { appConfig } from "@/lib/config";
import { AuthOptions } from "@/services/next-auth/auth";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: appConfig.appName,
  description: "Best Coffee",
};
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(AuthOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute={"class"} defaultTheme="dark">
          <NextAuthSessionProvider session={session}>
            {children}
            <Toaster richColors duration={2000} />
          </NextAuthSessionProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
