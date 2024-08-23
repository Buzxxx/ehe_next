// /app/(dashboard)/lead/leadReassignModal/page.tsx
"use client"

import LeadReassignForm from "@/components/lead/feature/leadReassignForm"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const LeadReassignModal = () => {
  const searchParams = useSearchParams()
  const leadsParam = searchParams.get("leads")

  // Parse the leadsParam into an array of numbers
  const leadIds = leadsParam
    ? leadsParam.split(",").map((id) => parseInt(id))
    : []
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="shadow-md mx-auto md:max-w-[40%] md:mt-8 ">
        <LeadReassignForm leadIds={leadIds} />
      </div>
    </Suspense>
  )
}

export default LeadReassignModal
