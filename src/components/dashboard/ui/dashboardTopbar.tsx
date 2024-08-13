"use client"

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenu,
} from "@/components/ui/dropdown-menu"
import ChevronDown from "@/components/ui/icons/chevronDown"
import FilterIcon from "@/components/ui/icons/filterIcon"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import FilterForm from "./filterForm"
import { handleToggle } from "@/utils/toggle"

type DashboardTopBarProps = {
  onSelectAll: () => void
  onUnselectAll: () => void
  selectedCount: number
  totalLeads: number
}

const DashboardTopBar: React.FC<DashboardTopBarProps> = ({
  onSelectAll,
  onUnselectAll,
  selectedCount,
  totalLeads,
}) => {
  const [filterVisible, setFilterVisible] = useState<boolean>(false)

  const onToggle = () => {
    handleToggle(filterVisible, setFilterVisible)
  }

  return (
    <div className="dashboard-top-bar mt-4 overflow-hidden">
      <div className="flex justify-between items-center py-1 pb-50 border-b border-slate-300">
        <form action="/lead/share" method="GET" className="dropdown">
          <DropdownMenu>
            <DropdownMenuTrigger className="border border-muted-500 flex text-sm gap-2 rounded-md items-center px-2 py-1 outline-none">
              Menu
              <ChevronDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="relative">
              <DropdownMenuItem onClick={onSelectAll}>
                Select All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onUnselectAll}>
                Unselect All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </form>
        <div className="flex gap-4 justify-between text-xs items-center">
          <Badge variant={"default"} className="bg-sky-300/90 text-gray-500">
            {selectedCount > 0
              ? `${selectedCount} Selected`
              : `${totalLeads} Leads`}
          </Badge>

          <button onClick={onToggle} className="text-dashboard-primary">
            <FilterIcon />
          </button>
        </div>
      </div>

      <FilterForm
        className={`${
          filterVisible
            ? "filter-form md:translate-x-0  "
            : "translate-x-96 2xl:translate-x-[35rem] hidden"
        }`}
      />
    </div>
  )
}

export default DashboardTopBar
