/**
 * @path src/components/lead/features/leadListing/leadSummarySection.tsx
 * @description LeadSummarySection component for the lead listing page
 */

import React, { useState, useEffect } from "react"
import LeadSummaryCard from "../../ui/leadListing/leadSummaryCard"
import {
  get_default_filterBy_obj,
  filter_multiselect_change_controller,
} from "../filterObject"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const statuses = [
  { title: "New Leads", value: 20, key: 1 },
  { title: "In Progress", value: 15, key: 2 },
  { title: "Completed", value: 10, key: 3 },
  { title: "Archived", value: 5, key: 4 },
]

const LeadSummarySection = ({
  setIsLoading,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Extract the initial statuses from the URL
  const [selectedStatuses, setSelectedStatuses] = useState<number[]>(() => {
    const filterByObj = get_default_filterBy_obj(
      new URLSearchParams(searchParams.toString())
    )
    return filterByObj["status"] || []
  })

  // Sync selectedStatuses with the URL on searchParams change
  useEffect(() => {
    const filterByObj = get_default_filterBy_obj(
      new URLSearchParams(searchParams.toString())
    )
    setSelectedStatuses(filterByObj["status"] || [])
  }, [searchParams])

  // Handle card clicks with instant UI update
  const handleCardClick = (status: number) => {
    setIsLoading(true)

    // Add or remove the selected status
    const newStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status) // Remove if already selected
      : [...selectedStatuses, status] // Add if not selected

    setSelectedStatuses(newStatuses) // Update state

    // Update the URL
    const filterByObj = { status: newStatuses }
    const newParams = new URLSearchParams(searchParams.toString()) // Create a mutable copy of the params
    filter_multiselect_change_controller(newParams, filterByObj)

    // Use router to push updated URL
    router.push(`?${newParams.toString()}`)
  }

  return (
    <>
      <Accordion type="single" collapsible className="md:hidden">
        <AccordionItem value="item-1">
          <AccordionTrigger className="pt-0">Leads Summary</AccordionTrigger>
          <AccordionContent className="flex gap-1 w-full md:hidden">
            {statuses.map(({ title, value, key }) => (
              <LeadSummaryCard
                key={key}
                title={title}
                value={value}
                isSelected={selectedStatuses.includes(key)}
                onClick={() => handleCardClick(key)}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="md:flex hidden flex-wrap justify-between gap-2 w-full">
        {statuses.map(({ title, value, key }) => (
          <LeadSummaryCard
            key={key}
            title={title}
            value={value}
            isSelected={selectedStatuses.includes(key)}
            onClick={() => handleCardClick(key)}
          />
        ))}
      </div>
    </>
  )
}

export default LeadSummarySection
