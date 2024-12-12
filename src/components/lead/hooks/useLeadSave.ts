/**
 * @path src/components/lead/hooks/useLeadSave.ts
 */


import { useState, useEffect, useCallback } from "react"

export const useLeadSave = (leadId: number | string) => {
  const [isSaved, setIsSaved] = useState(false)

  // Initialize `isSaved` state based on localStorage
  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem("savedLeads") || "[]")
    setIsSaved(savedLeads.some((lead: any) => lead.id === leadId))
  }, [leadId])

  // Toggle save/unsave lead
  const toggleSave = useCallback(() => {
    const savedLeads = JSON.parse(localStorage.getItem("savedLeads") || "[]")
    if (isSaved) {
      // Remove the lead from saved list
      const updatedLeads = savedLeads.filter((lead: any) => lead.id !== leadId)
      localStorage.setItem("savedLeads", JSON.stringify(updatedLeads))
    } else {
      // Add the lead to saved list
      const updatedLeads = [...savedLeads, { id: leadId }]
      localStorage.setItem("savedLeads", JSON.stringify(updatedLeads))
    }
    setIsSaved(!isSaved)
  }, [isSaved, leadId])

  return { isSaved, toggleSave }
}
