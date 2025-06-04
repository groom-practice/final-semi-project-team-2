import { FC, ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Header from "@/components/Header";
import ReactQueryProvider from "@/components/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FE Deep Dive Team2 | Final Semi Project",
  description: "created by FE Deep Dive Team2 | Final Semi Project",
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children, modal }) => {
  return (
    <html>
      <body className="relative">
        <ReactQueryProvider>
          <Header />
          <main className="w-screen pt-14 pb-10">{children}</main>
          {modal}
        </ReactQueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
