/**
 * @path src/components/lead/layout/leadLayout.tsx
 * @description LeadLayout component for the lead listing page
 */

"use client"

import { useState } from "react"
import TopBar from "../features/leadListing/topBar"
import LeadList from "../features/leadListing/leadList"

import {
  LeadsResponse,
  DefaultLeadsResponse,
} from "@/components/lead/features/leadObject"
import LeadSummarySection from "../features/leadListing/leadSummarySection"

const LeadLayout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [leadsResponse, setLeadsResponse] =
    useState<LeadsResponse>(DefaultLeadsResponse) // State to store the response from the API call that fetches the list of leads.

  const [viewMode, setViewMode] = useState<"card" | "row">("card") // State to determine how the leads are displayed in the LeadList component.

  return (
    <>
      <LeadSummarySection leadsResponse={leadsResponse} setIsLoading={setIsLoading} />

      <TopBar
        LeadsResponse={leadsResponse}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <LeadList
        leadsResponse={leadsResponse}
        setLeadsResponse={setLeadsResponse}
        viewMode={viewMode}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  )
}

export default LeadLayout
