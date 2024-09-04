import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./Navbar/Nav";
import Footer from "./Footer/page";
import  SessionProvider  from "./SessionProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OnlineShop",
  description: "We make your wallet cry",
  icons: {
    icon: {
      url:"@/assets/logo.ico",
     
    },
    shortcut: { url: "@/assets/logo.ico"},
  },
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
        <SessionProvider>
        <main className="p-4 max-w-7xl m-auto min-w-[300px]">
          <NavBar/>
        {children}
        <Footer/>
        </main>
        </SessionProvider>
        </body>
    </html>
  );
}















