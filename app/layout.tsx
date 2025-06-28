import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import { flowbiteTheme } from "./theme";
import AppProvider from "@/lib/providers";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MIC",
  description:
    "Welcome to Coach Adams Affiliate Marketing COURSE! 🚀 Are you ready to unlock your potential and transform your online income dreams into reality? Master affiliate marketing with ease and take control of your financial future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <Flowbite theme={{ theme: flowbiteTheme }}>
        <AppProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200`}
          >
            <SpeedInsights />
            <div className="h-full">
              <main className="h-full w-full">{children}</main>
              <Toaster />
            </div>
          </body>
        </AppProvider>
      </Flowbite>
    </html>
  );
}
