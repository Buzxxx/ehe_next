import React from "react"
import Dashboard from "@/components/dashboard/layout/dashboard"

export default function LeadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Dashboard>{children}</Dashboard>
}
