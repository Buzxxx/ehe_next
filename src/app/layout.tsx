import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EHE Industries",
  description: "A Real Estate company",
  icons: [
    { rel: "icon", url: "/static/favicon.ico" },
    { rel: "apple-touch-icon", url: "/static/favicon.ico" },
    {rel: "icon", url: "/public/logo.svg" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="shortcut icon" href="/static/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
