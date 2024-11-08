/**
 * @path src/components/lead/features/leadListing/topBar.tsx
 * @description TopBar component for the lead listing page
 */

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import ChevronDown from "@/components/ui/icons/chevronDown"
import { Badge } from "@/components/ui/badge"
import PaginationComp from "@/components/ui/paginationComp"
import {
  Filter,
  List,
  BetweenHorizontalEnd,
  Search,
} from "@/components/ui/icons"
import { handleToggle } from "@/utility/toggle"
import {
  LeadsResponse,
  get_total_leads,
  get_selected_leads_count,
} from "@/components/lead/features/leadObject"
import { Button } from "@/components/ui/button"
import LoadingSpinner from "@/components/contracts/ui/loadingSpinner"
import dynamic from "next/dynamic"
import { Input } from "@/components/ui/input"
import FilterModal from "./filterModal"

const FilterForm = dynamic(() => import("./filterForm"))

interface TopBarProps {
  LeadsResponse: LeadsResponse
  viewMode: "card" | "row" // View mode prop
  setViewMode: React.Dispatch<React.SetStateAction<"card" | "row">> // Setter for view mode
}

const TopBar: React.FC<TopBarProps> = ({
  LeadsResponse,
  viewMode,
  setViewMode,
}) => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false)
  const [selectedLeads, setSelectedLeads] = useState<number[]>([])
  const [modalLoading, setModalLoading] = useState(false)
  const router = useRouter()
  const totalLeads = get_total_leads(LeadsResponse)
  const selectedCount = get_selected_leads_count(LeadsResponse)

  const handleReassign = () => {
    setModalLoading(true)
    try {
      const selectedLeadIds = selectedLeads.join(",")
      router.push(`/lead/leadReassignModal/?leads=${selectedLeadIds}`)
    } catch (error) {
      console.error(error)
    } finally {
      setModalLoading(false)
    }
  }

  return (
    <>
      <div className="mt-4 relative bg-white border-b border-slate-200 shadow-sm rounded-lg p-3 z-50 flex items-center justify-between ">
        <div className="flex items-center justify-between gap-2">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 px-3 py-1.5 bg-transparent rounded-lg shadow-sm text-gray-700 hover:bg-gray-100 transition">
                Actions <ChevronDown />
              </MenubarTrigger>
              <MenubarContent className="mt-2 rounded-lg shadow-lg border border-slate-200 bg-white">
                <MenubarItem onClick={() => alert("Select All")}>
                  Select All
                </MenubarItem>
                <MenubarItem onClick={() => alert("Unselect All")}>
                  Unselect All
                </MenubarItem>
                <MenubarItem onClick={handleReassign}>Reassign</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>

          <div className="relative">
            <Input placeholder="Search" />
            <Search
              color="gray"
              className="absolute top-1/2 right-4 -translate-y-1/2"
            />
          </div>
        </div>
        {/* Action Dropdown */}

        {/* View Toggle, Badge, Pagination, and Filter */}
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-200 rounded-full p-1 shadow-inner">
            <Button
              className={`rounded-full p-2 py-1 h-fit w-fit transition ${
                viewMode === "card"
                  ? "bg-sky-600 text-white shadow-md hover:bg-sky-600"
                  : "bg-gray-300 text-gray-500 hover:text-gray-200 hover:bg-sky-400"
              }`}
              onClick={() => setViewMode("card")}
            >
              <BetweenHorizontalEnd size={20} />
            </Button>
            <Button
              className={`rounded-full p-2 py-1 h-fit w-fit transition ${
                viewMode === "row"
                  ? "bg-sky-600 text-white shadow-md hover:bg-sky-600"
                  : "bg-gray-300 text-gray-500 hover:text-gray-200 hover:bg-sky-400"
              }`}
              onClick={() => setViewMode("row")}
            >
              <List size={20} />
            </Button>
          </div>

          {/* Leads Badge */}
          {(selectedCount > 0 || totalLeads > 0) && (
            <Badge
              variant={"default"}
              className="bg-sky-100 text-sky-700 rounded-lg px-3 py-1 text-sm"
            >
              {selectedCount > 0
                ? `${selectedCount} Selected`
                : `${totalLeads} Leads`}
            </Badge>
          )}

          {/* Pagination */}
          <PaginationComp
            perPage={20}
            totalPages={50}
            className="flex-shrink-0 fixed bottom-4 right-4"
          />

          {/* Filter Button */}
          <button
            onClick={() => setFilterVisible((prev) => !prev)}
            className={`flex items-center gap-1 mr-4 rounded-lg shadow-sm transition bg-none bg-transparent h-fit w-fit `}
          >
            <Filter
              color="grey"
              className={`${filterVisible ? "fill-gray-500" : "fill-gray-100"}`}
            />
          </button>
        </div>

        {/* Filter Form Modal */}
        {filterVisible && (
          <FilterModal open={filterVisible} onClose={setFilterVisible} />
        )}
      </div>

      {/* Loading Modal */}
      {modalLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50">
          <LoadingSpinner />
        </div>
      )}
    </>
  )
}

export default TopBar
