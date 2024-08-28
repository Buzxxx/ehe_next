// LeadLayout.tsx

"use client"

import React, { useEffect, useState } from "react"
import DashboardBreadcrumb from "../../dashboard/ui/breadcrumb"
import DashboardTopBar from "../../dashboard/ui/dashboardTopbar"
import VisitorPanelBody from "../ui/visitorPanel"
import { useSearchParams, useRouter } from "next/navigation"
import LeadUtils from "@/utils/LeadUtils"
import { Spinner } from "@/components/ui/icons"
import { Lead } from "../feature/lead"
import { Filter } from "../feature/filter"

const leadApiClient = new Lead()

const LeadLayout = () => {
  const [leads, setLeads] = useState<LeadCardProps[]>([])
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [modalLoading, setModalLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const filter = new Filter()

        // Set parameters from the current URL
        filter.setFilterParams(searchParams)

        // Generate the full URL for redirection or API call
        const fullUrl = filter.getUrlOrDefaultUrl()

        // Redirect to this URL if necessary
        router.push(fullUrl)

        // Set the API URL with only the query parameters and fetch leads
        const filterQuery = filter.buildQuery()
        leadApiClient.setUrl(filterQuery)
        const fetchedLeads = await leadApiClient.getLeads()

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
    setModalLoading(true)
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

export default LeadLayout
