import "@/globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
export const metadata: Metadata = {
  title: "Terry&Perry Coffee ",
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
          defaultTheme="light"   >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
