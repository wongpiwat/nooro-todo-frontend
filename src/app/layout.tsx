import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import NextUIProvider from "@/components/provider/NextUIProvider";
import Rocket from "@/components/icon/Rocket";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nooro Todo Application",
  description: "A simple todo application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextUIProvider>
          <div className="flex min-h-screen justify-center pt-16">
            <main className="flex w-1/2 flex-col gap-8">
              <div className="flex items-center justify-center">
                <Rocket />
                <div className="text-2xl font-bold">Todo App</div>
              </div>
              {children}
            </main>
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
