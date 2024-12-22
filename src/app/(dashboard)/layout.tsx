/**
 * @path src/app/(dashboard)/layout.tsx
 */

import Dashboard from "@/components/dashboard/layout/dashboard";
import Providers from "@/components/providers/progressBarProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) 
  
{
  return (
    <Dashboard>
      <Providers>{children}</Providers>
    </Dashboard>
  )
}
