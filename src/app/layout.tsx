import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { appConfig } from "@/lib/config";
import { Toaster } from '@/components/ui/sonner';
import { NextAuthSessionProvider } from "@/components/context/session";
import { getServerSession } from 'next-auth'
import { AuthOptions } from "@/services/next-auth/auth";
import { AppLoader } from "@/components/ui/loader";
export const metadata: Metadata = {
  title: appConfig.appName,
  description: "Best Coffee",
};
export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const session = await getServerSession(AuthOptions)
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" antialiased bg-muted/30">
        <ThemeProvider attribute={"class"} defaultTheme="system">
          <NextAuthSessionProvider session={session}>
            {children}
            <Toaster richColors className=" fasfasfs" />
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
