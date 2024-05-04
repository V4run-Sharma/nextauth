import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth",
  description: "Next.js authentication with NextAuth and more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen min-w-[100%]`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
