// pages/dashboard/index.tsx

import Lead from "@/components/lead/layout/leadLayout"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense fallback={<></>}>
      <Lead />
    </Suspense>
  )
}
