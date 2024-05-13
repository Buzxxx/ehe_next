import type { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/layout/dashboardLayout";

export const metadata: Metadata = {
  title: "EHE Industries",
  description: "A Real Estate company",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <DashboardLayout>{children}</DashboardLayout>
      </body>
    </html>
  );
}
