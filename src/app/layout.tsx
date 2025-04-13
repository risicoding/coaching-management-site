import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import {Toaster} from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: "Urban Classes",
  description: "lets change the way of learning",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="dark">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster/>
      </body>
    </html>
  );
}
