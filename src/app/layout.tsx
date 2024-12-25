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
          <main className="flex h-screen flex-col overflow-hidden bg-gray-600">
            <div className="flex h-24 min-h-24 justify-center bg-background sm:h-48 sm:min-h-48">
              <div className="flex items-center justify-center p-16">
                <div className="flex flex-row items-center gap-1">
                  <Rocket />
                  <span className="text-[40px] font-black text-primary">
                    Todo
                  </span>
                  <span className="text-[40px] font-black text-secondary-dark">
                    App
                  </span>
                </div>
              </div>
            </div>
            <div className="max-h-full overflow-y-auto bg-gray-600">
              {children}
            </div>
            {/*<div className="bg-gray-600 p-4"></div>*/}
          </main>
        </NextUIProvider>
      </body>
    </html>
  );
}
