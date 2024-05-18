import type { Metadata } from "next";
import "../globals.css"

export const metadata: Metadata = {
  title: "EHE Industries Accounts",
  description: "Backend management",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <main className="flex justify-center items-center h-screen">
          <article className="shadow-lg rounded-md bg-slate-100 w-1/4 mx-auto p-4 border-2 flex flex-col items-center justify-center">
            {children}
          </article>
        </main>
      </body>
    </html>
  )
}
