"use client"

import React, { useEffect, useState } from "react"
import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb"
import DashboardTopBar from "../../dashboard/ui/dashboardTopbar"
import VisitorPanelBody from "../ui/visitorPanel"
import { useSearchParams, useRouter } from "next/navigation"
import LeadUtils from "@/utils/LeadUtils"
import { Spinner } from "@/components/ui/icons"
import leadApiClient, { Lead } from "@/lib/leadApiClient"
import Router from "next/router" // Import from next/router

const LeadComp: React.FC = () => {
  const [leads, setLeads] = useState<LeadCardProps[]>([])
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalLoading, setModalLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const perPage = Number(searchParams.get("per_page")) || 20
  const page = Number(searchParams.get("page")) || 1

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const lead = new Lead()
        const filter_by = searchParams.get("filter_by") || ""
        const sort_by = searchParams.get("sort_by") || ""

        lead
          .setFilterBy(filter_by)
          .setSortBy(sort_by)
          .setPerPage(perPage)
          .setPage(page)

        const fetchedLeads = await leadApiClient.getLeads(lead)

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
  }, [searchParams])

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
    setModalLoading(true) // Show the modal immediately

    try {
      const selectedLeadIds = selectedLeads.join(",")
      router.push(`/lead/leadReassignModal/?leads=${selectedLeadIds}`)
      
    } catch (error) {
      console.log(error)
    }

    setModalLoading(false)
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
      {modalLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-95 z-50 min-h-screen"></div>
      )}

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
