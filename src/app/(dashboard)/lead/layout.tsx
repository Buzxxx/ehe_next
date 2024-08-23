// /app/(dashboard)/lead/leayout.tsx

import { Suspense } from "react"

export default function LeadLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <>
      <Suspense>{modal}</Suspense>
      {children}
    </>
  )
}
