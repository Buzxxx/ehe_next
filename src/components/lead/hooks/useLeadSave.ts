import { useState, useEffect, useCallback } from "react"
import { getFromConfig, setInConfig } from "@/lib/localStorage"

export const useLeadSave = (leadId: number | string) => {
  const [isSaved, setIsSaved] = useState(false)

  // Initialize `isSaved` state based on localStorage
  useEffect(() => {
    const savedLeads: (number | string)[] = getFromConfig("savedLeads") || []
    setIsSaved(savedLeads.includes(leadId))
  }, [leadId])

  // Toggle save/unsave lead
  const toggleSave = useCallback(() => {
    const savedLeads: (number | string)[] = getFromConfig("savedLeads") || []
    if (isSaved) {
      // Remove the lead ID from saved list
      const updatedLeads = savedLeads.filter((id) => id !== leadId)
      setInConfig("savedLeads", updatedLeads)
    } else {
      // Add the lead ID to saved list
      const updatedLeads = [...savedLeads, leadId]
      setInConfig("savedLeads", updatedLeads)
    }
    setIsSaved(!isSaved)
  }, [isSaved, leadId])

  return { isSaved, toggleSave }
}
