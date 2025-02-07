import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EchoForms",
  description: "AI-Powered Form Builder",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${inter.className} overflow-x-hidden`}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <SidebarTrigger />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </SidebarProvider>
  );
}
