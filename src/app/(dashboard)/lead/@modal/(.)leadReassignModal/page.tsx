"use client"

import React, { Suspense } from "react"
import LeadReassignForm from "@/components/lead/feature/leadReassignForm"
import Modal from "@/components/ui/modal"
import { useSearchParams } from "next/navigation"

const LeadReassignModal = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Modal>
        <ClientComponent />
      </Modal>
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

  return <LeadReassignForm leadIds={leadIds} />
}

export default LeadReassignModal
