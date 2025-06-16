import type { Metadata } from "next";
import "./globals.css";
import "../styles/globalStyle.css";
import Component from "@/components/Component";
// import Head from "next/head";

export const metadata: Metadata = {
  title: "PrimeParking Panel",
  description: "PrimeParking Panel Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Component>{children}</Component>
      </body>
    </html>
  );
}
