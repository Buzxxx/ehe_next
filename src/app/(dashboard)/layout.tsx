/**
 * @path src/app/(dashboard)/layout.tsx
 */

import Dashboard from "@/components/dashboard/layout/dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) 
  
{
  return <Dashboard>{children}</Dashboard>;
}
