// pages/dashboard/index.tsx

import Lead from "@/components/lead/feature/lead"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense fallback={<></>}>
      <Lead />
    </Suspense>
  )
}
