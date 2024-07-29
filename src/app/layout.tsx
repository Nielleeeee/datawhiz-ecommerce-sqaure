import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/lib/provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DataWhiz",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="grid grid-rows-[1fr_auto] min-h-[100dvh]">
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
