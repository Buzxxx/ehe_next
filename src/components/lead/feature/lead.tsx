"use client"

import { useState } from "react"
import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb"
import DashboardTopBar from "../../dashboard/ui/dashboardTopbar"
import VisitorPanelBody from "../ui/visitorPanel"

type Lead = {
  id: number
  isSelected: boolean
}

const Lead: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([
    { id: 1, isSelected: false },
    { id: 2, isSelected: false },
    { id: 3, isSelected: false },
  ])

  const toggleLeadSelection = (index: number) => {
    const updatedLeads = leads.map((lead, idx) =>
      idx === index ? { ...lead, isSelected: !lead.isSelected } : lead
    )
    setLeads(updatedLeads)
  }

  const selectAllLeads = () => {
    setLeads(leads.map((lead) => ({ ...lead, isSelected: true })))
  }

  const unselectAllLeads = () => {
    setLeads(leads.map((lead) => ({ ...lead, isSelected: false })))
  }

  const selectedCount = leads.filter((lead) => lead.isSelected).length
  const totalLeads = leads.length // Calculate total leads

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-neutral-900 font-normal">
          Lead
          <span className="text-base ml-4 text-neutral-600">Control Panel</span>
        </h1>
        <DashboardBreadcrumb />
      </div>

      <DashboardTopBar
        onSelectAll={selectAllLeads}
        onUnselectAll={unselectAllLeads}
        selectedCount={selectedCount}
        totalLeads={totalLeads} // Pass the total leads as a prop
      />

      <div className="visitor-panel w-full">
        <VisitorPanelBody leads={leads} onToggleLead={toggleLeadSelection} />
      </div>
    </>
  )
}

export default Lead
