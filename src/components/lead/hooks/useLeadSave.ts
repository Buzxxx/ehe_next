import { useState, useEffect, useCallback } from "react"
import { getFromLeadPayload, setInLeadPayload } from "@/lib/localStorage"

export const useLeadSave = (leadId: number | string) => {
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const savedLeads: (number | string)[] =
      getFromLeadPayload("savedLeads") || []
    setIsSaved(savedLeads.includes(leadId))
  }, [leadId])

  const toggleSave = useCallback(() => {
    const savedLeads: (number | string)[] =
      getFromLeadPayload("savedLeads") || []
    if (isSaved) {
      const updatedLeads = savedLeads.filter((id) => id !== leadId)
      setInLeadPayload("savedLeads", updatedLeads)
    } else {
      const updatedLeads = [...savedLeads, leadId]
      setInLeadPayload("savedLeads", updatedLeads)
    }
    setIsSaved(!isSaved)
  }, [isSaved, leadId])

  return { isSaved, toggleSave }
}
