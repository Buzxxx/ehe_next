"use client"

import React, { Suspense } from "react"
import LeadReassignForm from "@/components/lead/feature/leadReassignForm"
import Modal from "@/components/ui/modal"
import { useSearchParams } from "next/navigation"

const LeadReassignModal = () => {
  const searchParams = useSearchParams()

  const leadsParam = searchParams.get("leads")

  // Parse the leadsParam into an array of numbers
  const leadIds = leadsParam
    ? leadsParam.split(",").map((id) => parseInt(id))
    : []

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal>
        <LeadReassignForm leadIds={leadIds} />
      </Modal>
    </Suspense>
  )
}

export default LeadReassignModal
