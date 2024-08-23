// /app/(dashboard)/lead/leadReassignModal/page.tsx
"use client"

import React, { Suspense } from "react"
import LeadReassignForm from "@/components/lead/feature/leadReassignForm"
import { useSearchParams } from "next/navigation"

const LeadReassignModal = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientComponent />
    </Suspense>
  )
}

const ClientComponent = () => {
  const searchParams = useSearchParams()
  const leadsParam = searchParams.get("leads")

  // Parse the leadsParam into an array of numbers
  const leadIds = leadsParam
    ? leadsParam.split(",").map((id) => parseInt(id))
    : []

  return (
    <div className="shadow-md mx-auto md:max-w-[40%] md:mt-8 ">
      <LeadReassignForm leadIds={leadIds} />
    </div>
  )
}

export default LeadReassignModal
