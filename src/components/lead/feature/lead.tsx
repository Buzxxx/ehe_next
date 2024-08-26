"use client"

import React, { useEffect, useState } from "react"
import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb"
import DashboardTopBar from "../../dashboard/ui/dashboardTopbar"
import VisitorPanelBody from "../ui/visitorPanel"
import { useSearchParams, useRouter } from "next/navigation"
import LeadUtils from "@/utils/LeadUtils"
import { Spinner } from "@/components/ui/icons"
import leadApiClient, { Lead } from "@/lib/leadApiClient"

const LeadComp: React.FC = () => {
  const [leads, setLeads] = useState<LeadCardProps[]>([])
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams() // Hook to get query params

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const lead = new Lead()
        const filter_by = searchParams.get("filter_by") || ""
        const sort_by = searchParams.get("sort_by") || ""
        const per_page = Number(searchParams.get("per_page")) || 10
        const page = Number(searchParams.get("page")) || 1

        lead
          .setFilterBy(filter_by)
          .setSortBy(sort_by)
          .setPerPage(per_page)
          .setPage(page)

        const fetchedLeads = await leadApiClient.getLeads(lead)

        // Convert Lead[] to LeadCard[] by adding isSelected property
        const leadsWithSelection: LeadCardProps[] = fetchedLeads.leads.map(
          (lead: LeadCardProps) => ({
            ...lead,
            isSelected: false,
          })
        )
        setLeads(leadsWithSelection)
      } catch (error) {
        console.error("Failed to fetch leads:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [searchParams]) // Refetch leads whenever URL query params change

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
    setIsLoading(true)
    try {
      const selectedLeadIds = selectedLeads.join(",")
      router.push(`/lead/leadReassignModal/?leads=${selectedLeadIds}`)
    } catch (error) {
      console.error("Failed to navigate to reassign modal:", error)
    } finally {
      setIsLoading(false)
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

      <div className="visitor-panel w-full">
        {isLoading ? (
          <div className="absolute inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 min-h-screen">
            <Spinner className="animate-spin h-10 w-10 " />
          </div>
        ) : (
          <VisitorPanelBody
            leads={leads}
            onToggleLead={handleToggleLeadSelection}
          />
        )}
      </div>
    </>
  )
}

export default LeadComp
