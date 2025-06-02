import "@/app/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { appConfig } from "@/lib/config";
export const metadata: Metadata = {
  title: appConfig.appName,
  description: "Best Coffe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className=" antialiased"
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
