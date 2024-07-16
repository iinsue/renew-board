import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import QueryProviders from "@/providers/query-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Renew Board",
  description: "New New Board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <QueryProviders>
        <Toaster position="top-center" duration={1000} />
        <body className={inter.className}>{children}</body>
      </QueryProviders>
    </html>
  );
}
