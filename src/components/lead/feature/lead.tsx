"use client"

import React, { useEffect, useState } from "react"
import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb"
import DashboardTopBar from "../../dashboard/ui/dashboardTopbar"
import VisitorPanelBody from "../ui/visitorPanel"
import { useRouter } from "next/navigation"
import LeadUtils from "@/utils/LeadUtils" // Import the LeadUtils class
import { Spinner } from "@/components/ui/icons"
import leadApiClient, { Lead } from "@/lib/leadApiClient"
import { initialLeads } from "@/lib/sampleData"

const LeadComp: React.FC = () => {
  const [leads, setLeads] = useState<LeadCardProps[]>(initialLeads)
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  // Fetch leads on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const lead = new Lead().setPerPage(10).setPage(1)
        const fetchedLeads = await leadApiClient.getLeads(lead)
        console.log(fetchedLeads)
        // Convert Lead[] to LeadCard[] by adding isSelected property
        const leadsWithSelection: LeadCardProps[] = fetchedLeads.leads.map(
          (lead: LeadCardProps) => ({
            ...lead,
            isSelected: false,
          })
        )
        setLeads(leadsWithSelection)
        console.log(leads)
      } catch (error) {
        console.error("Failed to fetch leads:", error)
      }
    }

    fetchLeads()
  }, [leads])

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

  const handleReassign = () => {
    setIsLoading(true) // Set loading state to true
    try {
      const selectedLeadIds = selectedLeads.join(",") // Convert selectedLeads array to a comma-separated string
      router.push(`/lead/leadReassignModal/?leads=${selectedLeadIds}`)
    } catch (error) {
      console.error("Failed to navigate to reassign modal:", error)
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

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
        onSelectAll={handleSelectAllLeads}
        onUnselectAll={handleUnselectAllLeads}
        onReassign={handleReassign}
        selectedCount={selectedCount}
        totalLeads={totalLeads}
      />

      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
          <Spinner className="animate-spin h-10 w-10 " />
        </div>
      )}

      <div className="visitor-panel w-full">
        <VisitorPanelBody
          leads={leads}
          onToggleLead={handleToggleLeadSelection}
        />
      </div>
    </>
  )
}

export default LeadComp
