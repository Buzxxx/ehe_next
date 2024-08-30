"use client"

import { Suspense, lazy, useState } from "react"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import ChevronDown from "@/components/ui/icons/chevronDown"
import FilterIcon from "@/components/ui/icons/filterIcon"
import { Badge } from "@/components/ui/badge"
import { handleToggle } from "@/utils/toggle"
import PaginationComp from "@/components/ui/paginationComp"

// Dynamically import FilterForm
const FilterForm = lazy(
  () => import("@/components/dashboard/layout/filterForm")
)

type DashboardTopBarProps = {
  onSelectAll?: () => void
  onUnselectAll?: () => void
  onReassign?: () => void
  selectedCount?: number
  totalLeads?: number
  isLeadPage?: boolean // New prop to indicate if it's the lead page
}

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  onSelectAll,
  onUnselectAll,
  onReassign,
  selectedCount = 0,
  totalLeads = 0,
  isLeadPage = false, // Default value set to false
}) => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false)

  const onToggle = () => {
    handleToggle(filterVisible, setFilterVisible)
  }

  return (
    <Menubar className="dashboard-top-bar mt-4 overflow-hidden bg-transparent border-0 border-b border-slate-300 flex items-center justify-between rounded-none pb-2 z-50 ">
      <MenubarMenu>
        <MenubarTrigger className="flex items-center gap-2 border shadow-sm">
          Menu <ChevronDown />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Share</MenubarItem>
          <MenubarItem onClick={onSelectAll}>Select All</MenubarItem>
          <MenubarItem onClick={onUnselectAll}>Unselect All</MenubarItem>
          {selectedCount > 0 && (
            <MenubarItem onClick={onReassign}>Reassign</MenubarItem>
          )}
        </MenubarContent>
      </MenubarMenu>

      <div className="flex gap-4 justify-start text-xs items-center flex-nowrap">
        {(selectedCount > 0 || totalLeads > 0) && (
          <Badge
            variant={"default"}
            className="bg-sky-300/90 text-gray-500 whitespace-nowrap"
          >
            {selectedCount > 0
              ? `${selectedCount} Selected`
              : `${totalLeads} Leads`}
          </Badge>
        )}

        {isLeadPage && ( // Only show these components if on the lead page
          <>
            <PaginationComp
              perPage={20}
              totalPages={50}
              className="flex-shrink-0 justify-start w-fit invisible md:visible"
            />

            <button onClick={onToggle} className="text-dashboard-primary">
              <FilterIcon />
            </button>
          </>
        )}
      </div>

      {isLeadPage &&
        filterVisible && ( // Conditionally render FilterForm
          <Suspense fallback={<> </>}>
            <FilterForm
              className={`${
                filterVisible
                  ? "filter-form md:translate-x-0"
                  : "translate-x-96 2xl:translate-x-[35rem] hidden"
              }`}
            />
          </Suspense>
        )}
    </Menubar>
  )
}

export default DashboardTopBar
