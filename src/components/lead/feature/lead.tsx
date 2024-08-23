"use client"

import React, { Suspense, useState } from "react"
import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb"
import DashboardTopBar from "../../dashboard/ui/dashboardTopbar"
import VisitorPanelBody from "../ui/visitorPanel"
import { useRouter } from "next/navigation"
import LeadUtils from "@/utils/LeadUtils" // Import the LeadUtils class

const Lead: React.FC = () => {
  const initialLeads = [
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
  ]

  const [leads, setLeads] = useState<Lead[]>(initialLeads)
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])

  const router = useRouter()

  const handleToggleLeadSelection = (index: number) => {
    const updatedLeads = LeadUtils.toggleLeadSelection(leads, index)
    setLeads(updatedLeads)
    setSelectedLeads(LeadUtils.getSelectedLeads(updatedLeads))
  }

  const handleSelectAllLeads = () => {
    const updatedLeads = LeadUtils.selectAllLeads(leads)
    setLeads(updatedLeads)
    setSelectedLeads(LeadUtils.getSelectedLeads(updatedLeads))
  }

  const handleUnselectAllLeads = () => {
    const updatedLeads = LeadUtils.unselectAllLeads(leads)
    setLeads(updatedLeads)
    setSelectedLeads([])
  }

  const selectedCount = LeadUtils.getSelectedCount(leads)
  const totalLeads = LeadUtils.getTotalLeads(leads)

  return (
    <Suspense>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-neutral-900 font-normal">
          Lead
          <span className="text-base ml-4 text-neutral-600">Control Panel</span>
        </h1>
        <DashboardBreadcrumb />
      </div>

      <DashboardTopBar
        onSelectAll={handleSelectAllLeads}
        onUnselectAll={handleUnselectAllLeads}
        onReassign={() => router.push(`/lead/leadReassignModal/`)}
        selectedCount={selectedCount}
        totalLeads={totalLeads}
      />

      <div className="visitor-panel w-full">
        <VisitorPanelBody
          leads={leads}
          onToggleLead={handleToggleLeadSelection}
        />
      </div>
    </Suspense>
  )
}

export default Lead
