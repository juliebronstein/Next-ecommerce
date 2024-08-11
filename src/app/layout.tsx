import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnlineShop",
  description: "We make your wallet cry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isServer = typeof window === 'undefined';
  const className = isServer ? 'h-full vsc-initialized' : 'mt-1';
  return (
    <html lang="en">
      <body className={className}>
        <main className="p-4 max-w-7xl m-auto min-w-[300px]">
        {children}
        </main>
        </body>
    </html>
  );
}















