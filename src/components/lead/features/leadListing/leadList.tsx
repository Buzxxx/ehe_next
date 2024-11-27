import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  SetStateAction,
} from "react"
import { useSearchParams } from "next/navigation"
import { Spinner } from "@/components/ui/icons"
import { LeadCard } from "@/components/lead/ui/leadListing/leadCard"
import LeadRow from "@/components/lead/ui/leadListing/leadRow"
import {
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
import useDebounce from "@/hooks/useDebounce" // Custom debounce hook
import useFetchLeads from "@/components/lead/hooks/useFetchLeads" // Custom hook for fetching leads

interface LeadListProps {
  leadsResponse: LeadsResponse
  setLeadsResponse: (response: LeadsResponse) => void
  viewMode: "card" | "row"
  isLoading: boolean
  setIsLoading: React.Dispatch<SetStateAction<boolean>>
}

const LeadList: React.FC<LeadListProps> = React.memo(
  ({ leadsResponse = DefaultLeadsResponse, setLeadsResponse, viewMode, isLoading, setIsLoading }) => {
    const [selectAll, setSelectAll] = useState(false)
    const [queryParams, setQueryParams] = useState("")
    const URLParams = useSearchParams()
    const debouncedQueryParams = useDebounce(queryParams, 300) // Debounce query params
    const { toast } = useToast()

    // Custom hook to fetch leads with caching
    const { leads, fetchLeads, isFetching } = useFetchLeads()

    // Fetch leads whenever URLParams or debouncedQueryParams change
    useEffect(() => {
      const query = URLParams.toString()
      setQueryParams(query)

      const loadLeads = async () => {
        setIsLoading(true)
        try {
          const result = await fetchLeads(query)
          setLeadsResponse(result)
        } catch (error) {
          console.error("Error fetching leads:", error)
          setLeadsResponse(DefaultLeadsResponse)
          toast({ title: "Error fetching leads.", variant: "destructive" })
        } finally {
          setIsLoading(false)
        }
      }

      loadLeads()
    }, [debouncedQueryParams, URLParams, fetchLeads, setLeadsResponse, toast])

    const handleToggleLeadSelection = useCallback((index: number) => {
      console.log(index)
    }, [])

    const hasLeads = useMemo(() => leads?.length > 0, [leads])

    return (
      <div className="w-full relative">
        {isLoading || isFetching ? (
          <div className="absolute mt-2 inset-0 flex justify-center items-center bg-gray-300 bg-opacity-30 z-30 min-h-96 rounded-xl">
            <Spinner className="animate-spin h-10 w-10 text-gray-400 " />
          </div>
        ) : (
          <div className="pt-2">
            {viewMode === "card" ? (
              <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
                {hasLeads ? (
                  leads.map((lead, index) => (
                    <LeadCard
                      key={lead.id}
                      idx={index}
                      lead={lead}
                      isSelected={lead.isSelected}
                      onToggle={() => handleToggleLeadSelection(index)}
                    />
                  ))
                ) : (
                  <div className="h-full w-full flex items-center justify-center min-h-80 text-gray-500">
                    No leads available
                  </div>
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
                      leads.map((lead, index) => (
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
)
LeadList.displayName = "LeadList"

export default LeadList
