/**
 * @path src/components/lead/hooks/useFetchLeads.ts
 */

import { useState, useCallback } from "react"
import {
  lead_listing_controller,
  DefaultLeadsResponse,
} from "@/components/lead/features/leadObject"

export default function useFetchLeads() {
  const [leads, setLeads] = useState(DefaultLeadsResponse.leads)
  const [isFetching, setIsFetching] = useState(false)

  const fetchLeads = useCallback(async (query: string) => {
    setIsFetching(true)
    try {
      const result = await lead_listing_controller(new URLSearchParams(query))
      setLeads(result?.leads || DefaultLeadsResponse.leads)
      return result
    } catch (error) {
      console.error("Error fetching leads:", error)
      setLeads(DefaultLeadsResponse.leads)
      throw error
    } finally {
      setIsFetching(false)
    }
  }, [])

  return { leads, fetchLeads, isFetching }
}
