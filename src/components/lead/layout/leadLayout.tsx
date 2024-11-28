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
import Modal from "../ui/modal"
import LeadReassignForm from "../features/forms/leadReassignForm"

const LeadLayout = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [leadsResponse, setLeadsResponse] =
    useState<LeadsResponse>(DefaultLeadsResponse) // State to store the response from the API call that fetches the list of leads.
  const [viewMode, setViewMode] = useState<"card" | "row">("card") // State to determine how the leads are displayed in the LeadList component.
  const [showReassignModal, setShowReassignModal] = useState(false)
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])

  return (
    <div className="px-1 md:px-0">
      <LeadSummarySection setIsLoading={setIsLoading} />

      <TopBar
        LeadsResponse={leadsResponse}
        viewMode={viewMode}
        setViewMode={setViewMode}
        setShowReassignModal={setShowReassignModal}
        setIsLoading={setIsLoading}
      />
      <LeadList
        leadsResponse={leadsResponse}
        setLeadsResponse={setLeadsResponse}
        viewMode={viewMode}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        selectedLeads={selectedLeads}
        setSelectedLeads={setSelectedLeads}
      />
      <Modal
        isOpen={showReassignModal}
        onClose={() => setShowReassignModal(false)}
      >
        <LeadReassignForm
          leadIds={selectedLeads}
          setShowLeadReassignModal={setShowReassignModal}
        />
      </Modal>
    </div>
  )
}

export default LeadLayout
