import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { SidebarDemo } from "@/components/example/sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie ticket booking app",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        {/* Use a flex container to place sidebar and content next to each other */}
        <div className="flex min-h-screen">
          {/* Sidebar on the left */}
          <SidebarDemo />

          {/* Main content */}
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
