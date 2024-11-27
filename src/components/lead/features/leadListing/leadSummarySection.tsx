/**
 * @path src/components/lead/features/leadListing/leadSummarySection.tsx
 * @description LeadSummarySection component for the lead listing page
 */

import LeadSummaryCard from "../../ui/leadListing/leadSummaryCard"
import { get_total_leads, LeadsResponse } from "../leadObject"
import { useSearchParams, useRouter } from "next/navigation"
import React, { SetStateAction, useState, useEffect } from "react"

const statuses = [
  { title: "New Leads", value: 20, key: 1 },
  { title: "In Progress", value: 15, key: 2 },
  { title: "Completed", value: 10, key: 3 },
  { title: "Archived", value: 5, key: 4 },
]

const parseSelectedStatuses = (filterBy: string | null): string[] => {
  if (filterBy?.startsWith("status:")) {
    const statusString = filterBy.replace("status:", "").replace(/[\[\]]/g, "") // Remove 'status:' and brackets
    return statusString.split(",").filter(Boolean) // Split into array
  }
  return []
}

const LeadSummarySection = ({
  leadsResponse,
  setIsLoading,
}: {
  leadsResponse: LeadsResponse
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(() =>
    parseSelectedStatuses(searchParams.get("filter_by"))
  )

  // Sync selectedStatuses with the URL on mount and when searchParams change
  useEffect(() => {
    const filterBy = searchParams.get("filter_by")
    const statusesFromUrl = parseSelectedStatuses(filterBy)
    setSelectedStatuses(statusesFromUrl)
  }, [searchParams])

  // Handle card clicks with instant UI update
  const handleCardClick = (status: string) => {
    setIsLoading(true)
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status) // Remove if already selected
      : [...selectedStatuses, status] // Add if not selected

    setSelectedStatuses(newStatuses) // Update state

    // Construct the filter_by query value
    const filterByValue = `status:[${newStatuses.join(",")}]`

    const params = new URLSearchParams(searchParams.toString())
    params.set("filter_by", filterByValue) // Set updated filter_by value
    params.set("page", "1") // Reset to page 1 on filter change

    router.push(`?${params.toString()}`) // Update the URL
  }

  const totalLeads = get_total_leads(leadsResponse)

  return (
    <div className="flex flex-wrap justify-between gap-4 w-full">
      {statuses.map(({ title, value, key }) => (
        <LeadSummaryCard
          key={key}
          title={title}
          value={value}
          isSelected={selectedStatuses.includes(key.toString())}
          onClick={() => handleCardClick(key.toString())}
        />
      ))}
    </div>
  )
}

export default LeadSummarySection
