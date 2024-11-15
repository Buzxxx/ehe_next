import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/icons"
import { LeadCard } from "@/components/lead/ui/leadListing/leadCard"
import LeadRow from "@/components/lead/ui/leadListing/leadRow"
import {
  lead_listing_controller,
  LeadsResponse,
  DefaultLeadsResponse,
} from "@/components/lead/features/leadObject"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

interface LeadListProps {
  leadsResponse: LeadsResponse
  setLeadsResponse: (response: LeadsResponse) => void
  viewMode: "card" | "row"
}

const LeadList: React.FC<LeadListProps> = ({
  leadsResponse = DefaultLeadsResponse,
  setLeadsResponse,
  viewMode,
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [selectAll, setSelectAll] = useState(false)
  const URLParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const fetchLeads = async () => {
      const timeoutId = setTimeout(() => {
        setLeadsResponse(DefaultLeadsResponse)
        setIsLoading(false)
      }, 5000) // 5-second timeout for fallback

      try {
        setIsLoading(true)
        const params = new URLSearchParams(window.location.search)
        const leadsList = await lead_listing_controller(params)

        clearTimeout(timeoutId) // Clear timeout if fetch is successful

        if (leadsList) {
          setLeadsResponse(leadsList)
        } else {
          toast({
            title: "Error fetching leads.",
            variant: "destructive",
          })
        }
      } catch (error: any) {
        console.error("Error fetching leads: ", error)
        toast({
          title: "Error fetching leads.",
          variant: "destructive",
        })
        setLeadsResponse(DefaultLeadsResponse)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeads()
  }, [URLParams, setLeadsResponse])

  function handleToggleLeadSelection(index: number) {
    console.log(index)
  }

  const hasLeads = leadsResponse?.leads?.length > 0

  return (
    <div className="w-full relative">
      {isLoading ? (
        <div className="absolute mt-2 inset-0 flex justify-center items-center bg-gray-300 bg-opacity-30 z-30 min-h-96 rounded-xl">
          <Spinner className="animate-spin h-10 w-10" />
        </div>
      ) : (
        <div className="pt-2">
          {viewMode === "card" ? (
            <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
              {hasLeads ? (
                leadsResponse.leads.map((lead, index) => (
                  <LeadCard
                    key={lead.id}
                    idx={index}
                    lead={lead}
                    isSelected={lead.isSelected}
                    onToggle={() => handleToggleLeadSelection(index)}
                  />
                ))
              ) : (
                <div className="h-full w-full flex items-center justify-center min-h-80 text-gray-500">No leads available</div>
              )}
            </div>
          ) : (
            <div className="flex flex-col">
              <Table className="border bg-white rounded-md shadow-lg">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] p-2">
                      <Checkbox
                        checked={selectAll}
                        onChange={(e) =>
                          setSelectAll((e.target as HTMLInputElement).checked)
                        }
                      />
                    </TableHead>
                    <TableHead>Lead</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hasLeads ? (
                    leadsResponse.leads.map((lead, index) => (
                      <LeadRow
                        key={lead.id}
                        lead={lead}
                        isSelected={lead.isSelected}
                        onToggle={() => handleToggleLeadSelection(index)}
                      />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No leads available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LeadList
